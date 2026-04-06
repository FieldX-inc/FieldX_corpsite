import { BodyText, Surface, TextAnchor } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";

import type { HomeSection } from "@/types/site";

type ContactOrganismProps = {
  sectionId: HomeSection;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  titleId?: string;
  titleLevel?: "h1" | "h2" | "h3";
};

export function ContactOrganism({
  sectionId,
  heading,
  body,
  ctaLabel,
  ctaHref,
  titleId = "home-contact-title",
  titleLevel = "h2"
}: ContactOrganismProps) {
  return (
    <Surface
      as="section"
      id={sectionId}
      tone="light"
      labelledBy={titleId}
      className="fx-section-organism fx-contact-organism"
    >
      <div className="fx-shell">
        <SectionHeader title={heading} titleId={titleId} level={titleLevel} />
        <BodyText>{body}</BodyText>
        <div className="fx-contact-links" aria-label={heading}>
          <TextAnchor
            href={ctaHref}
            className="fx-about-cta"
            tracking={{
              ctaId: "home_contact_section",
              ctaLabel,
              ctaLocation: "home_contact_section"
            }}
          >
            {ctaLabel}
          </TextAnchor>
        </div>
      </div>
    </Surface>
  );
}
