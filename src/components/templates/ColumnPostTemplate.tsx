import { BodyText, Surface, TextAnchor } from "@/components/atoms";
import { EditorialHeading } from "@/components/molecules";
import type { ColumnPost } from "@/types/content";

type ColumnPostTemplateProps = {
  post: ColumnPost;
};

export function ColumnPostTemplate({ post }: ColumnPostTemplateProps) {
  const lead = post.lead ?? post.description;

  return (
    <Surface
      as="article"
      tone="light"
      labelledBy="column-post-title"
      className="fx-page-section fx-article-shell fx-column-article"
    >
      <div className="fx-shell fx-article-layout">
        <div className="fx-article-inner">
          <nav aria-label="パンくず" className="fx-article-breadcrumb">
            <TextAnchor href="/column/magazine" className="fx-article-breadcrumb-link">
              マガジン
            </TextAnchor>
            <span aria-hidden="true" className="fx-article-breadcrumb-separator">
              /
            </span>
            <span className="fx-article-breadcrumb-current">{post.title}</span>
          </nav>

          <header className="fx-article-hero">
            <div className="fx-article-hero-copy">
              <EditorialHeading
                title={post.title}
                titleId="column-post-title"
                kicker="Column"
                level="h1"
              />
              <BodyText className="fx-article-lead">{lead}</BodyText>
            </div>
          </header>

          {post.ogImage ? (
            <figure className="fx-article-cover">
              <img src={post.ogImage} alt={post.title} className="fx-article-cover-image" />
            </figure>
          ) : null}

          {post.toc.length > 0 ? (
            <nav aria-label="記事目次" className="fx-article-toc">
              <p className="fx-article-toc-label">目次</p>
              <ol className="fx-article-toc-list">
                {post.toc.map((item) => (
                  <li
                    key={item.id}
                    className={`fx-article-toc-item fx-article-toc-item-level-${item.level}`}
                  >
                    <TextAnchor href={`#${item.id}`} className="fx-article-toc-link">
                      {item.text}
                    </TextAnchor>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="fx-article-content">
            <div className="fx-mdx" dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
        </div>
      </div>
    </Surface>
  );
}
