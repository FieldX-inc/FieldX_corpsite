import Link from "next/link";

import { Surface } from "@/components/atoms";

type ServiceViewOrganismProps = {
  sectionId: string;
  eyebrowEn: string;
  eyebrowJa: string;
  title: string;
  body: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  sections: {
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  }[];
  tiles: string[];
};

export function ServiceViewOrganism({
  sectionId,
  eyebrowEn,
  eyebrowJa,
  title,
  body,
  primaryCtaLabel,
  primaryCtaHref,
  sections,
  tiles
}: ServiceViewOrganismProps) {
  const [firstSection, secondSection] = sections;
  const topTiles = tiles.slice(0, 2);
  const bottomTiles = tiles.slice(2);

  return (
    <Surface as="section" id={sectionId} tone="light" labelledBy="home-service-title" className="fx-service-view-organism">
      <div className="fx-shell fx-service-view-shell">
        <div className="fx-service-view-copy">
          <header className="fx-service-view-header">
            <p className="fx-service-view-eyebrow-en">{eyebrowEn}</p>
            <p className="fx-service-view-eyebrow-ja">{eyebrowJa}</p>
          </header>

          <h2 id="home-service-title" className="fx-service-view-title">
            {title}
          </h2>

          <p className="fx-service-view-body">
            {body.split("\n").map((line, index) => (
              <span key={`service-view-body-${index}`} className="fx-service-view-body-line">
                {line}
              </span>
            ))}
          </p>

          <Link href={primaryCtaHref} className="fx-service-view-cta fx-service-view-cta-primary">
            {primaryCtaLabel}
          </Link>
        </div>

        <div className="fx-service-view-content">
          {firstSection ? (
            <article className="fx-service-view-section fx-service-view-section-primary">
              <h3 className="fx-service-view-section-title">{firstSection.title}</h3>
              <p className="fx-service-view-section-body">{firstSection.body}</p>
              <Link href={firstSection.ctaHref} className="fx-service-view-cta fx-service-view-cta-secondary">
                {firstSection.ctaLabel}
              </Link>
            </article>
          ) : null}

          <div className="fx-service-view-row">
            {secondSection ? (
              <article className="fx-service-view-section fx-service-view-section-secondary">
                <h3 className="fx-service-view-section-title">{secondSection.title}</h3>
                <p className="fx-service-view-section-body">{secondSection.body}</p>
                <Link href={secondSection.ctaHref} className="fx-service-view-cta fx-service-view-cta-secondary">
                  {secondSection.ctaLabel}
                </Link>
              </article>
            ) : null}

            <div className="fx-service-view-tiles-top" aria-label="上段サービスカード">
              {topTiles.map((tile) => (
                <article key={tile} className="fx-service-view-tile fx-service-view-tile-top" aria-label={tile.replace("\n", " ")}>
                  <div className="fx-service-view-tile-content">
                    {tile.split("\n").map((line, index) => (
                      <span key={`${tile}-${index}`} className="fx-service-view-tile-line">
                        {line}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="fx-service-view-tiles-bottom" aria-label="下段サービスカード">
            {bottomTiles.map((tile) => (
              <article key={tile} className="fx-service-view-tile fx-service-view-tile-bottom" aria-label={tile.replace("\n", " ")}>
                <div className="fx-service-view-tile-content">
                  {tile.split("\n").map((line, index) => (
                    <span key={`${tile}-${index}`} className="fx-service-view-tile-line">
                      {line}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Surface>
  );
}
