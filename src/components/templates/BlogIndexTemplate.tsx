import { BodyText, Surface } from "@/components/atoms";
import { NewsCard, SectionHeader } from "@/components/molecules";
import type { SiteLocaleContent } from "@/components/site/content";
import type { BlogPost } from "@/types/content";

type BlogIndexTemplateProps = {
  content: SiteLocaleContent;
  posts: BlogPost[];
};

export function BlogIndexTemplate({ content, posts }: BlogIndexTemplateProps) {
  return (
    <Surface as="section" tone="light" labelledBy="column-page-title" className="fx-section-organism">
      <div className="fx-shell">
        <SectionHeader title={content.nav.column} titleId="column-page-title" level="h1" />
        <BodyText className="fx-column-page-description">{content.blog.description}</BodyText>

        {posts.length === 0 ? (
          <BodyText className="fx-column-page-empty">{content.column.empty}</BodyText>
        ) : (
          <ul className="fx-news-grid" aria-label={content.column.listAriaLabel}>
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
