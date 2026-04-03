import { BodyText, MetaText, Surface, TextAnchor } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import type { SiteLocaleContent } from "@/components/site/content";
import type { BlogPost } from "@/types/content";

type BlogPostTemplateProps = {
  content: SiteLocaleContent;
  post: BlogPost;
};

export function BlogPostTemplate({ content, post }: BlogPostTemplateProps) {
  return (
    <Surface
      as="article"
      tone="light"
      labelledBy="blog-post-title"
      className="fx-page-section fx-article-shell fx-column-article"
    >
      <div className="fx-shell fx-article-layout">
        <div className="fx-article-inner">
          <nav aria-label="パンくず" className="fx-article-breadcrumb">
            <TextAnchor href="/column" className="fx-article-breadcrumb-link">
              Column
            </TextAnchor>
            <span aria-hidden="true" className="fx-article-breadcrumb-separator">
              /
            </span>
            <span className="fx-article-breadcrumb-current">{post.title}</span>
          </nav>

          <header className="fx-article-hero">
            <div className="fx-article-hero-copy">
              <SectionHeader title={post.title} titleId="blog-post-title" kicker="Column" level="h1" />
              <BodyText className="fx-article-lead">{post.description}</BodyText>
            </div>
            <div className="fx-article-meta-panel">
              {post.tags?.length ? (
                <ul className="fx-article-tags" aria-label="カテゴリ">
                  {post.tags.map((tag) => (
                    <li key={tag} className="fx-article-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
              {post.publishedAt ? (
                <MetaText className="fx-article-meta-line">
                  {content.blog.publishedLabel}: <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                </MetaText>
              ) : null}
            </div>
          </header>

          {post.ogImage ? (
            <figure className="fx-article-cover">
              <img src={post.ogImage} alt={post.title} className="fx-article-cover-image" />
            </figure>
          ) : null}

          <div className="fx-article-content">
            <div className="fx-mdx" dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
        </div>
      </div>
    </Surface>
  );
}
