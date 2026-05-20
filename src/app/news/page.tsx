import { siteContent } from "@/components/site/content";
import { NewsTemplate } from "@/components/templates";
import { publishedNewsPosts } from "@/lib/news";

export default async function NewsPage() {
  return <NewsTemplate content={siteContent} posts={publishedNewsPosts} />;
}
