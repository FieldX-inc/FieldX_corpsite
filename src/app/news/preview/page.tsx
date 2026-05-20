import { notFound } from "next/navigation";

import { siteContent } from "@/components/site/content";
import { NewsTemplate } from "@/components/templates";

import { newsPreviewPosts } from "./_data";

export default function NewsPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <NewsTemplate content={siteContent} posts={newsPreviewPosts} postHrefBasePath="/news" />
  );
}
