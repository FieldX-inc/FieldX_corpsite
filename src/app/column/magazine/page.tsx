import type { Metadata } from "next";

import { siteContent } from "@/components/site/content";
import { ColumnMagazineTemplate } from "@/components/templates";
import { getColumnPosts } from "@/lib/content/repository";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "マガジン",
  description:
    "Field Xのマガジン。AIエージェント、業務設計、運用定着に関する記事を掲載しています。",
  alternates: {
    canonical: "/column/magazine"
  },
  openGraph: {
    title: "マガジン",
    description:
      "Field Xのマガジン。AIエージェント、業務設計、運用定着に関する記事を掲載しています。",
    url: "/column/magazine"
  }
};

export default async function ColumnMagazinePage() {
  const posts = await getColumnPosts();

  return <ColumnMagazineTemplate content={siteContent} posts={posts} />;
}
