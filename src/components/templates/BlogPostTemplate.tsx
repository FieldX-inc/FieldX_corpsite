import { BodyText, MetaText, Surface } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import type { SiteLocaleContent } from "@/components/site/content";
import type { BlogPost } from "@/types/content";

type BlogPostTemplateProps = {
  content: SiteLocaleContent;
  post: BlogPost;
  body: React.ReactNode;
};

export function BlogPostTemplate({ content, post, body }: BlogPostTemplateProps) {
  return (
    <Surface as="article" tone="light" labelledBy="blog-post-title" className="fx-page-section fx-article-shell">
      <div className="fx-shell fx-article-inner">
        <SectionHeader title={post.title} titleId="blog-post-title" kicker="Column" level="h1" />
        <BodyText>{post.description}</BodyText>
        {post.publishedAt ? (
          <MetaText>
            {content.blog.publishedLabel}: <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          </MetaText>
        ) : null}
        <div className="fx-mdx">{body}</div>
      </div>
    </Surface>
  );
}
