import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

import { siteContent } from "@/components/site/content";
import type { BlogFrontmatter, BlogPost, LandingPage, LandingPageFrontmatter } from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const isoDateSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), "publishedAt must be a valid ISO date string");

const blogSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
  status: z.enum(["draft", "published"]),
  publishedAt: isoDateSchema.optional(),
  tags: z.array(z.string()).optional(),
  ogImage: z.string().optional()
});

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

async function loadBlogPosts(): Promise<BlogPost[]> {
  const dirPath = path.join(CONTENT_ROOT, "blog");
  const fileNames = await readMdxFiles(dirPath);

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(dirPath, fileName);
      const raw = await fs.readFile(filePath, "utf-8");
      const parsed = matter(raw);
      const frontmatter = blogSchema.parse(parsed.data) as BlogFrontmatter;

      ensureSlugMatches(filePath, fileName.replace(/\.mdx$/, ""), frontmatter.slug, "slug");

      return {
        ...frontmatter,
        body: parsed.content,
        filePath
      };
    })
  );

  return posts;
}

async function loadLandingPages(): Promise<LandingPage[]> {
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
}

export async function getBlogPosts(includeDraft = false): Promise<BlogPost[]> {
  const allPosts = await loadBlogPosts();
  const filtered = includeDraft ? allPosts : allPosts.filter((post) => post.status === "published");
  return sortByPublishedDate(filtered);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await loadBlogPosts();
  const post = allPosts.find((entry) => entry.slug === slug);

  if (!post || post.status !== "published") {
    return null;
  }

  return post;
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

  const [posts, pages] = await Promise.all([getBlogPosts(), getLandingPages()]);
  routes.push(...posts.map((post) => `/column/${post.slug}`));
  routes.push(...pages.map((page) => `/lp/${page.campaign}`));

  return routes;
}
