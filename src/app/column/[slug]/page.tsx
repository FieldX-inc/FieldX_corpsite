import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ColumnPostTemplate } from "@/components/templates";
import { getColumnPostBySlug, getColumnPosts } from "@/lib/content/repository";

export const revalidate = 300;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getColumnPostBySlug(slug);

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

export async function generateStaticParams() {
  const posts = await getColumnPosts();

  return posts.map((post) => ({
    slug: post.slug
  }));
}

export default async function ColumnDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getColumnPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <ColumnPostTemplate post={post} />;
}
