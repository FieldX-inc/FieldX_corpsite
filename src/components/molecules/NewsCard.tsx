import { BodyText, MetaText, SectionTitle, TextAnchor } from "@/components/atoms";
import type { BlogPost } from "@/types/content";

type NewsCardProps = {
  post: BlogPost;
};

export function NewsCard({ post }: NewsCardProps) {
  const tagLabel = post.tags?.[0] ?? "リリース";

  return (
    <article className="fx-news-card">
      <div className="fx-news-thumbnail" aria-hidden="true">
        <span className="fx-news-thumbnail-label">thumbnail</span>
      </div>
      <p className="fx-news-tag">{tagLabel}</p>
      <SectionTitle as="h3" className="fx-card-title">
        <TextAnchor href={`/column/${post.slug}`}>{post.title}</TextAnchor>
      </SectionTitle>
      {post.publishedAt ? (
        <MetaText>
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
        </MetaText>
      ) : null}
      <BodyText className="fx-card-body">{post.description}</BodyText>
    </article>
  );
}
