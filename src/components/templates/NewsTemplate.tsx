import Link from "next/link";

import { HomeContactCtaOrganism } from "@/components/organisms";
import { NewsCard } from "@/components/molecules";
import type { SiteLocaleContent } from "@/components/site/content";
import type { ColumnPost } from "@/types/content";

type NewsTemplateProps = {
  content: SiteLocaleContent;
  posts: ColumnPost[];
};

export function NewsTemplate({ content, posts }: NewsTemplateProps) {
  return (
    <>
      <section className="fx-news-page-hero" aria-labelledby="news-page-title">
        <div className="fx-news-page-hero-inner">
          <h1 id="news-page-title" className="fx-news-page-title">
            NEWS
          </h1>
          <p className="fx-news-page-lead">
            Field Xからのお知らせ、プロダクトや取り組みに関する更新情報を掲載します。
            <br />
            AIを業務に実装する現場から、継続的な進捗をお届けします。
          </p>
          <div className="fx-news-page-hero-actions">
            <Link href="/contact" className="fx-news-page-primary-link">
              まずは相談する
            </Link>
            <Link href="/column/magazine" className="fx-news-page-secondary-link">
              コラムを読む
            </Link>
          </div>
        </div>
      </section>

      <section className="fx-news-page-section" aria-labelledby="news-list-title">
        <div className="fx-news-page-shell">
          <h2 id="news-list-title" className="fx-news-page-section-title">
            お知らせ一覧
          </h2>
          <p className="fx-news-page-description">公開中のお知らせのみ表示しています。</p>

          {posts.length === 0 ? (
            <p className="fx-news-page-empty">{content.news.empty}</p>
          ) : (
            <ul className="fx-news-page-grid" aria-label={content.nav.news}>
              {posts.map((post) => (
                <li key={post.slug}>
                  <NewsCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <HomeContactCtaOrganism
        sectionId="contact"
        titleId="news-contact-title"
        cards={content.contact.cards}
      />
    </>
  );
}
