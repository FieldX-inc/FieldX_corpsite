import Image from "next/image";
import Link from "next/link";

import { BodyText, Surface } from "@/components/atoms";

import type { ColumnPost } from "@/types/content";
import type { HomeSection } from "@/types/site";

type HomeColumnOrganismProps = {
  sectionId: HomeSection;
  heading: string;
  eyebrowJa: string;
  ctaLabel: string;
  ctaHref: string;
  emptyLabel: string;
  listAriaLabel: string;
  posts: ColumnPost[];
  titleId?: string;
};

function formatPublishedAt(value?: string) {
  if (!value) {
    return "2026/01/01";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "2026/01/01";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export function HomeColumnOrganism({
  sectionId,
  heading,
  eyebrowJa,
  ctaLabel,
  ctaHref,
  emptyLabel,
  listAriaLabel,
  posts,
  titleId = "home-column-title"
}: HomeColumnOrganismProps) {
  const featuredPosts = posts.slice(0, 3);

  return (
    <Surface as="section" id={sectionId} tone="light" labelledBy={titleId} className="fx-home-column-organism">
      <div className="fx-shell fx-home-column-shell">
        <header className="fx-home-column-header">
          <h2 id={titleId} className="fx-home-column-eyebrow-en">
            {heading.toUpperCase()}
          </h2>
          <p className="fx-home-column-eyebrow-ja">{eyebrowJa}</p>
        </header>

        {featuredPosts.length === 0 ? (
          <BodyText>{emptyLabel}</BodyText>
        ) : (
          <ul className="fx-home-column-list" aria-label={listAriaLabel}>
            {featuredPosts.map((post) => (
              <li key={post.slug} className="fx-home-column-item">
                <Link href={`/column/${post.slug}`} className="fx-home-column-link">
                  <div className="fx-home-column-thumbnail">
                    {post.ogImage ? (
                      <Image
                        src={post.ogImage}
                        alt={post.title}
                        fill
                        sizes="248px"
                        className="fx-home-column-thumbnail-image"
                      />
                    ) : (
                      <div className="fx-home-column-thumbnail-fallback" aria-hidden="true">
                        <span className="fx-home-column-thumbnail-fallback-mark" />
                        <span className="fx-home-column-thumbnail-fallback-wordmark">Field X</span>
                      </div>
                    )}
                  </div>

                  <div className="fx-home-column-item-copy">
                    <p className="fx-home-column-date">{formatPublishedAt(post.publishedAt)}</p>
                    <p className="fx-home-column-item-title">{post.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="fx-home-column-cta-wrap">
          <Link href={ctaHref} className="fx-home-column-cta">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </Surface>
  );
}
