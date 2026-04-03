import { BodyText, Surface } from "@/components/atoms";
import { NewsCard, SectionHeader } from "@/components/molecules";

import type { ColumnPost } from "@/types/content";
import type { HomeSection } from "@/types/site";

type NewsOrganismProps = {
  sectionId: HomeSection;
  heading: string;
  emptyLabel: string;
  posts: ColumnPost[];
  titleId?: string;
  headingLevel?: "h1" | "h2" | "h3";
};

export function NewsOrganism({
  sectionId,
  heading,
  emptyLabel,
  posts,
  titleId = "home-news-title",
  headingLevel = "h2"
}: NewsOrganismProps) {
  return (
    <Surface as="section" id={sectionId} tone="light" labelledBy={titleId} className="fx-section-organism">
      <div className="fx-shell">
        <SectionHeader title={heading} titleId={titleId} level={headingLevel} />

        {posts.length === 0 ? (
          <BodyText>{emptyLabel}</BodyText>
        ) : (
          <ul className="fx-news-grid fx-news-grid--latest" aria-label={heading}>
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
