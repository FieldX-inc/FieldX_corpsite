import { BodyText, MetaText, SectionTitle, TextAnchor } from "@/components/atoms";
import { formatDate } from "@/lib/format-date";
import type { ColumnPost } from "@/types/content";

type NewsCardProps = {
  post: ColumnPost;
};

export function NewsCard({ post }: NewsCardProps) {
  const tagLabel = post.tags?.[0] ?? "リリース";
  const thumbnailStyle = post.ogImage
    ? {
        backgroundImage: `url("${post.ogImage}")`
      }
    : undefined;

  return (
    <article className="fx-news-card">
      <div className="fx-news-thumbnail" aria-hidden="true" style={thumbnailStyle}>
        <span className="fx-news-thumbnail-label">{post.ogImage ? tagLabel : "Column"}</span>
      </div>
      <div className="fx-news-card-body">
        <div className="fx-news-card-header">
          <p className="fx-news-tag">{tagLabel}</p>
          {post.publishedAt ? (
            <MetaText className="fx-news-card-date">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </MetaText>
          ) : null}
        </div>
        <SectionTitle as="h3" className="fx-card-title">
          <TextAnchor href={`/column/${post.slug}`}>{post.title}</TextAnchor>
        </SectionTitle>
        <BodyText className="fx-card-body">{post.description}</BodyText>
      </div>
    </article>
  );
}
