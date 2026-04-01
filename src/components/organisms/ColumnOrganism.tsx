import { BodyText, Surface } from "@/components/atoms";
import { NewsCard, SectionHeader } from "@/components/molecules";

import type { BlogPost } from "@/types/content";
import type { HomeSection } from "@/types/site";

type ColumnOrganismProps = {
  sectionId: HomeSection;
  heading: string;
  emptyLabel: string;
  listAriaLabel: string;
  posts: BlogPost[];
  titleId?: string;
};

export function ColumnOrganism({
  sectionId,
  heading,
  emptyLabel,
  listAriaLabel,
  posts,
  titleId = "home-column-title"
}: ColumnOrganismProps) {
  return (
    <Surface as="section" id={sectionId} tone="light" labelledBy={titleId} className="fx-section-organism">
      <div className="fx-shell">
        <SectionHeader title={heading} titleId={titleId} />

        {posts.length === 0 ? (
          <BodyText>{emptyLabel}</BodyText>
        ) : (
          <ul className="fx-news-grid" aria-label={listAriaLabel}>
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
