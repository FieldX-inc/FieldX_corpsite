import { BodyText, Surface } from "@/components/atoms";
import { NewsCard, SectionHeader } from "@/components/molecules";
import type { SiteLocaleContent } from "@/components/site/content";
import type { ColumnPost } from "@/types/content";

type NewsTemplateProps = {
  content: SiteLocaleContent;
  posts: ColumnPost[];
};

export function NewsTemplate({ content, posts }: NewsTemplateProps) {
  return (
    <Surface as="section" tone="light" labelledBy="news-page-title" className="fx-section-organism">
      <div className="fx-shell">
        <SectionHeader title={content.nav.news} titleId="news-page-title" level="h1" />
        <BodyText className="fx-column-page-description">{content.columnPage.description}</BodyText>

        {posts.length === 0 ? (
          <BodyText className="fx-column-page-empty">{content.news.empty}</BodyText>
        ) : (
          <ul className="fx-news-grid" aria-label={content.nav.news}>
            {posts.map((post) => (
              <li key={post.slug}>
                <NewsCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Surface>
  );
}
