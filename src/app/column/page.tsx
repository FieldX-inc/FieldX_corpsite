import { siteContent } from "@/components/site/content";
import { ColumnIndexTemplate } from "@/components/templates";
import { getColumnPosts } from "@/lib/content/repository";

export const revalidate = 300;

export default async function ColumnIndexPage() {
  const posts = await getColumnPosts();

  return <ColumnIndexTemplate content={siteContent} posts={posts} />;
}
