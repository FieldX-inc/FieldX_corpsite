import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsPostTemplate } from "@/components/templates";
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
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.ogImage ? [post.ogImage] : undefined
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
