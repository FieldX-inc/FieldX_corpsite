import Image from "next/image";

import { BodyText, Surface, TextAnchor } from "@/components/atoms";
import { EditorialHeading } from "@/components/molecules";
import { ArticleMaterialsForm } from "@/components/organisms/ArticleMaterialsForm";
import { formatDate } from "@/lib/format-date";
import type { ColumnPost } from "@/types/content";

type ColumnPostTemplateProps = {
  post: ColumnPost;
};

export function ColumnPostTemplate({ post }: ColumnPostTemplateProps) {
  const lead = post.lead ?? post.description;
  const plainText = post.body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const readingMinutes = Math.max(1, Math.ceil(plainText.length / 600));
  const metaItems = [
    post.publishedAt ? formatDate(post.publishedAt) : undefined,
    ...(post.tags ?? []),
    `${readingMinutes}分で読めます`
  ].filter((item): item is string => Boolean(item));

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
              <div className="fx-article-meta" aria-label="記事情報">
                {metaItems.map((item) => (
                  <span key={item} className="fx-article-meta-item">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {post.ogImage ? (
            <figure className="fx-article-cover">
              <Image
                src={post.ogImage}
                alt={post.title}
                fill
                sizes="(min-width: 1180px) 720px, calc(100vw - 2rem)"
                className="fx-article-cover-image"
              />
            </figure>
          ) : null}

          <BodyText className="fx-article-lead">{lead}</BodyText>

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

        <aside className="fx-article-sidebar" aria-labelledby="article-materials-title">
          <div className="fx-article-sidebar-card">
            <p className="fx-article-sidebar-kicker">Materials</p>
            <h2 id="article-materials-title" className="fx-article-sidebar-title">
              AI導入の検討資料を受け取る
            </h2>
            <p className="fx-article-sidebar-body">
              Field Xのサービス概要と、業務整理からAI実装までの進め方をまとめた資料です。
            </p>
            <ArticleMaterialsForm />
          </div>
        </aside>
      </div>
    </Surface>
  );
}
