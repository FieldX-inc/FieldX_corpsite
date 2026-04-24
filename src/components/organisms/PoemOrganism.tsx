import { Surface } from "@/components/atoms";

import type { HomeSection } from "@/types/site";

type PoemOrganismProps = {
  sectionId: HomeSection;
  eyebrowEn: string;
  eyebrowJa: string;
  title: string;
  body: string;
  aboutCtaLabel: string;
  aboutHref: string;
};

export function PoemOrganism({ sectionId, eyebrowEn, eyebrowJa, title, body, aboutCtaLabel, aboutHref }: PoemOrganismProps) {
  const titleLines = title.split("\n");

  return (
    <Surface as="section" id={sectionId} tone="light" labelledBy="home-poem-title" className="fx-poem-organism">
      <div className="fx-shell fx-poem-shell">
        <div className="fx-poem-copy">
          <header className="fx-poem-header">
            <p className="fx-poem-eyebrow-en">{eyebrowEn}</p>
            <p className="fx-poem-eyebrow-ja">{eyebrowJa}</p>
          </header>
          <h2 id="home-poem-title" className="fx-poem-title">
            {titleLines.map((line, index) => (
              <span key={`poem-title-${index}`} className="fx-poem-title-line">
                <span className="fx-poem-title-line-text">{line}</span>
              </span>
            ))}
          </h2>
          <p id="home-poem-text" className="fx-poem-body">
            {body}
          </p>
          <a className="fx-poem-cta" href={aboutHref}>
            {aboutCtaLabel}
          </a>
        </div>
      </div>
    </Surface>
  );
}
