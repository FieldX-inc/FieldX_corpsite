import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { z } from "zod";

import { siteContent } from "@/components/site/content";
import { getMicrocmsClient, getMicrocmsColumnEndpoint } from "@/lib/content/microcms";
import type { ColumnPost, LandingPage, LandingPageFrontmatter } from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const isoDateSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "publishedAt must be a valid ISO date string");

const lpSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  campaign: z.string().min(1),
  status: z.enum(["draft", "published"]),
  publishedAt: isoDateSchema.optional(),
  heroCta: z.string().optional(),
  ogImage: z.string().optional()
});

function sortByPublishedDate<T extends { publishedAt?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bDate = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bDate - aDate;
  });
}

async function readMdxFiles(dirPath: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => entry.name);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

function ensureSlugMatches(filePath: string, expected: string, actual: string, label: string): void {
  if (expected !== actual) {
    throw new Error(
      `[content] ${label} mismatch in ${filePath}. Expected "${expected}" based on filename.`
    );
  }
}

const microcmsCategorySchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  title: z.string().min(1).optional()
});

const microcmsBlogSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  publishedAt: isoDateSchema.optional(),
  eyecatch: z
    .object({
      url: z.string().min(1)
    })
    .optional(),
  category: z
    .union([microcmsCategorySchema, z.array(microcmsCategorySchema)])
    .nullable()
    .optional()
});

type MicrocmsBlogResponse = z.infer<typeof microcmsBlogSchema>;

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function buildDescriptionFromContent(content: string): string {
  const plainText = stripHtml(content);
  return plainText.slice(0, 120);
}

function normalizeCategoryTags(category: MicrocmsBlogResponse["category"]): string[] | undefined {
  if (!category) {
    return undefined;
  }

  const values = Array.isArray(category) ? category : [category];
  const tags = values
    .map((item) => item.name ?? item.title)
    .filter((value): value is string => Boolean(value));

  return tags.length > 0 ? tags : undefined;
}

const loadColumnPosts = cache(async (): Promise<ColumnPost[]> => {
  const client = getMicrocmsClient();
  const endpoint = getMicrocmsColumnEndpoint();
  const posts: MicrocmsBlogResponse[] = [];
  let offset = 0;
  const limit = 100;

  try {
    while (true) {
      const response = await client.getList<MicrocmsBlogResponse>({
        endpoint,
        queries: {
          fields: "id,title,content,publishedAt,eyecatch,category",
          orders: "-publishedAt",
          limit,
          offset
        }
      });

      posts.push(...response.contents.map((item) => microcmsBlogSchema.parse(item)));

      offset += response.contents.length;

      if (offset >= response.totalCount || response.contents.length === 0) {
        break;
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[microCMS] Failed to fetch Column data from endpoint "${endpoint}". Check MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY, MICROCMS_COLUMN_ENDPOINT, and network access. Original error: ${message}`
    );
  }

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: buildDescriptionFromContent(post.content),
    slug: post.id,
    publishedAt: post.publishedAt,
    tags: normalizeCategoryTags(post.category),
    ogImage: post.eyecatch?.url,
    body: post.content
  }));
});

const loadLandingPages = cache(async (): Promise<LandingPage[]> => {
  const dirPath = path.join(CONTENT_ROOT, "lp");
  const fileNames = await readMdxFiles(dirPath);

  const pages = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(dirPath, fileName);
      const raw = await fs.readFile(filePath, "utf-8");
      const parsed = matter(raw);
      const frontmatter = lpSchema.parse(parsed.data) as LandingPageFrontmatter;

      ensureSlugMatches(filePath, fileName.replace(/\.mdx$/, ""), frontmatter.campaign, "campaign");

      return {
        ...frontmatter,
        body: parsed.content,
        filePath
      };
    })
  );

  return pages;
});

export async function getColumnPosts(): Promise<ColumnPost[]> {
  const allPosts = await loadColumnPosts();
  return sortByPublishedDate(allPosts);
}

export async function getColumnPostBySlug(slug: string): Promise<ColumnPost | null> {
  const allPosts = await loadColumnPosts();
  const post = allPosts.find((entry) => entry.slug === slug);
  return post ?? null;
}

export async function getLandingPages(includeDraft = false): Promise<LandingPage[]> {
  const allPages = await loadLandingPages();
  const filtered = includeDraft ? allPages : allPages.filter((page) => page.status === "published");
  return sortByPublishedDate(filtered);
}

export async function getLandingPageByCampaign(campaign: string): Promise<LandingPage | null> {
  const allPages = await loadLandingPages();
  const page = allPages.find((entry) => entry.campaign === campaign);

  if (!page || page.status !== "published") {
    return null;
  }

  return page;
}

export async function getAllPublishedRoutes(): Promise<string[]> {
  const routes: string[] = ["/", "/about", "/column", "/contact", "/what-we-do", "/news"];

  routes.push(
    ...siteContent.whatWeDo.services
      .map((service) => service.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => `/what-we-do/${slug}`)
  );

  const [posts, pages] = await Promise.all([getColumnPosts(), getLandingPages()]);
  routes.push(...posts.map((post) => `/column/${post.slug}`));
  routes.push(...pages.map((page) => `/lp/${page.campaign}`));

  return routes;
}
