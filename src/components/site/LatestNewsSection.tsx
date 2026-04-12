import Link from "next/link";

import { formatDate } from "@/lib/format-date";
import type { ColumnPost } from "@/types/content";
import type { HomeSection } from "@/types/site";

type LatestNewsSectionProps = {
  sectionId: HomeSection;
  heading: string;
  emptyLabel: string;
  publishedLabel: string;
  posts: ColumnPost[];
};

export function LatestNewsSection({ sectionId, heading, emptyLabel, publishedLabel, posts }: LatestNewsSectionProps) {
  return (
    <section id={sectionId} className="fx-section" aria-labelledby="fx-news-title">
      <h2 id="fx-news-title">{heading}</h2>

      {posts.length === 0 ? (
        <p className="fx-empty">{emptyLabel}</p>
      ) : (
        <ul className="fx-news-grid" aria-label={heading}>
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="fx-news-card">
                <h3>
                  <Link href={`/column/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.description}</p>
                {post.publishedAt ? (
                  <p className="fx-date">
                    {publishedLabel}: <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
