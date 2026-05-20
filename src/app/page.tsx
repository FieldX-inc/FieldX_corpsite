import { siteContent } from "@/components/site/content";
import { HomeTemplate } from "@/components/templates";
import { getColumnPosts } from "@/lib/content/repository";
import { publishedNewsPosts } from "@/lib/news";

export const revalidate = 300;

export default async function HomePage() {
  const allColumnPosts = await getColumnPosts();
  const columnPosts = allColumnPosts.slice(0, 3);

  return <HomeTemplate content={siteContent} columnPosts={columnPosts} newsPosts={publishedNewsPosts} />;
}
