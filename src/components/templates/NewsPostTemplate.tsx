import Image from "next/image";

import { BodyText, Surface, TextAnchor } from "@/components/atoms";
import { siteContent } from "@/components/site/content";
import { formatDate } from "@/lib/format-date";
import type { ColumnPost } from "@/types/content";

type NewsPostTemplateProps = {
  post: ColumnPost;
};

export function NewsPostTemplate({ post }: NewsPostTemplateProps) {
  const lead = post.lead ?? post.description;
  const primaryTag = post.tags?.[0] ?? "お知らせ";

  return (
    <Surface
      as="article"
      tone="light"
      labelledBy="news-post-title"
      className="fx-page-section fx-news-post-shell"
    >
      <div className="fx-shell fx-news-post-inner">
        <nav aria-label="パンくず" className="fx-news-post-breadcrumb">
          <TextAnchor href="/news" className="fx-news-post-breadcrumb-link">
            NEWS
          </TextAnchor>
          <span aria-hidden="true" className="fx-news-post-breadcrumb-separator">
            /
          </span>
          <span className="fx-news-post-breadcrumb-current">{post.title}</span>
        </nav>

        <header className="fx-news-post-hero">
          <div className="fx-news-post-meta">
            <span className="fx-news-post-tag">{primaryTag}</span>
            {post.publishedAt ? (
              <time className="fx-news-post-date" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            ) : null}
          </div>
          <h1 id="news-post-title" className="fx-news-post-title">
            {post.title}
          </h1>
          <BodyText className="fx-news-post-lead">{lead}</BodyText>
        </header>

        {post.ogImage ? (
          <figure className="fx-news-post-cover">
            <Image
              src={post.ogImage}
              alt={post.title}
              fill
              sizes="(min-width: 960px) 860px, calc(100vw - 2rem)"
              className="fx-news-post-cover-image"
            />
          </figure>
        ) : null}

        <div className="fx-news-post-content" dangerouslySetInnerHTML={{ __html: post.body }} />

        <section className="fx-news-post-company" aria-labelledby="news-company-title">
          <h2 id="news-company-title" className="fx-news-post-company-title">
            会社情報
          </h2>
          <dl className="fx-news-post-company-list">
            {siteContent.companyProfile.items.map((item) => (
              <div key={item.label} className="fx-news-post-company-row">
                <dt>{item.label}</dt>
                <dd>
                  {Array.isArray(item.value) ? (
                    <ul className="fx-news-post-company-bullets">
                      {item.value.map((value) => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="fx-news-post-footer">
          <TextAnchor href="/news/preview" className="fx-news-post-back-link">
            お知らせ一覧へ戻る
          </TextAnchor>
        </div>
      </div>
    </Surface>
  );
}
