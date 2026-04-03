import { siteContent } from "@/components/site/content";
import { NewsTemplate } from "@/components/templates";

export default async function NewsPage() {
  return <NewsTemplate content={siteContent} posts={[]} />;
}
