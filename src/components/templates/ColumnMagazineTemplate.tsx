import Link from "next/link";

import { HomeContactCtaOrganism } from "@/components/organisms";
import { NewsCard } from "@/components/molecules";
import type { SiteLocaleContent } from "@/components/site/content";
import type { ColumnPost } from "@/types/content";

type ColumnMagazineTemplateProps = {
  content: SiteLocaleContent;
  posts: ColumnPost[];
};

export function ColumnMagazineTemplate({ content, posts }: ColumnMagazineTemplateProps) {
  return (
    <>
      <section className="fx-column-page-hero" aria-labelledby="column-magazine-title">
        <div className="fx-column-page-hero-inner">
          <h1 id="column-magazine-title" className="fx-column-page-title">
            MAGAZINE
          </h1>
          <p className="fx-column-page-lead">
            AI活用をPoCで止めず、現場の業務に組み込むための視点を発信します。
            <br />
            不動産賃貸管理を中心に、業務設計・運用定着・AIエージェントの実装知を整理します。
          </p>
          <div className="fx-column-page-hero-actions">
            <Link href="/column/materials" className="fx-column-page-primary-link">
              資料を見る
            </Link>
            <Link href="/contact" className="fx-column-page-secondary-link">
              まずは相談する
            </Link>
          </div>
        </div>
      </section>

      <section className="fx-column-page-section" aria-labelledby="column-list-title">
        <div className="fx-column-page-shell">
          <h2 id="column-list-title" className="fx-column-page-section-title">
            マガジン一覧
          </h2>
          <p className="fx-column-page-description">{content.columnPage.description}</p>

          {posts.length === 0 ? (
            <p className="fx-column-page-empty">{content.column.empty}</p>
          ) : (
            <ul className="fx-column-page-grid" aria-label={content.column.listAriaLabel}>
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
        titleId="column-magazine-contact-title"
        cards={content.contact.cards}
      />
    </>
  );
}
