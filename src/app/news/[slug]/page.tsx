import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsPostTemplate } from "@/components/templates";
import { defaultOgImage } from "@/lib/metadata";
import { getPublishedNewsPostBySlug } from "@/lib/news";

import { getNewsPreviewPost } from "../preview/_data";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedNewsPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/news/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/news/${post.slug}`,
      siteName: "Field X",
      locale: "ja_JP",
      type: "article",
      publishedTime: post.publishedAt,
      images: post.ogImage ? [post.ogImage] : [defaultOgImage]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.ogImage ?? defaultOgImage.url]
    }
  };
}

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post =
    getPublishedNewsPostBySlug(slug) ??
    (process.env.NODE_ENV === "production" ? null : getNewsPreviewPost(slug));

  if (!post) {
    notFound();
  }

  return <NewsPostTemplate post={post} />;
}
