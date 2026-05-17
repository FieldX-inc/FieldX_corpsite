import Link from "next/link";

import { Surface } from "@/components/atoms";

import type { HomeSection } from "@/types/site";

type HomeContactCtaOrganismProps = {
  sectionId: HomeSection;
  titleId?: string;
  cards: {
    eyebrow: string;
    title: string;
    body: string;
    image?: {
      src: string;
      alt: string;
    };
    cover?: {
      kicker: string;
      title: string;
      subtitle: string;
      ctaLabel: string;
    };
    points: string[];
    ctaLabel: string;
    ctaHref: string;
  }[];
};

export function HomeContactCtaOrganism({
  sectionId,
  titleId = "home-contact-title",
  cards
}: HomeContactCtaOrganismProps) {
  return (
    <Surface as="section" id={sectionId} tone="light" labelledBy={titleId} className="fx-home-contact-cta-organism">
      <h2 id={titleId} className="fx-site-header-sr-only">
        Contact
      </h2>

      <div className="fx-shell fx-home-contact-cta-shell">
        <div className="fx-home-contact-cta-grid">
          {cards.map((card) => {
            const thumbnailStyle = card.image
              ? {
                  backgroundImage: `url("${card.image.src}")`
                }
              : undefined;

            return (
              <article key={card.title} className="fx-home-contact-cta-card">
                <div className="fx-home-contact-cta-card-inner">
                  <header className="fx-home-contact-cta-card-header">
                    <p className="fx-home-contact-cta-card-eyebrow">{card.eyebrow}</p>
                    <h3 className="fx-home-contact-cta-card-title">{card.title}</h3>
                  </header>

                  <div
                    className="fx-home-contact-cta-card-thumbnail"
                    style={thumbnailStyle}
                    role={card.image ? "img" : undefined}
                    aria-label={card.image?.alt}
                    aria-hidden={card.image ? undefined : true}
                  >
                    {card.cover ? (
                      <div className="fx-home-contact-cta-card-cover" aria-hidden="true">
                        <span className="fx-home-contact-cta-card-cover-kicker">{card.cover.kicker}</span>
                        <span className="fx-home-contact-cta-card-cover-title">{card.cover.title}</span>
                        <span className="fx-home-contact-cta-card-cover-subtitle">{card.cover.subtitle}</span>
                        <span className="fx-home-contact-cta-card-cover-cta">{card.cover.ctaLabel}</span>
                      </div>
                    ) : null}
                  </div>

                  <p className="fx-home-contact-cta-card-body">{card.body}</p>

                  <ul className="fx-home-contact-cta-card-points" aria-label={card.title}>
                    {card.points.map((point) => (
                      <li key={point} className="fx-home-contact-cta-card-point">
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link href={card.ctaHref} className="fx-home-contact-cta-card-link">
                    {card.ctaLabel}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Surface>
  );
}
