import Image from "next/image";
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
  agents: {
    title: string;
    body: string;
    icon: string;
  }[];
};

export function ServiceViewOrganism({
  sectionId,
  eyebrowEn,
  eyebrowJa,
  title,
  body,
  primaryCtaLabel,
  primaryCtaHref,
  agents
}: ServiceViewOrganismProps) {
  return (
    <Surface
      as="section"
      id={sectionId}
      tone="light"
      labelledBy="home-service-title"
      className="fx-service-view-organism"
    >
      <div className="fx-shell fx-service-view-shell">
        <div className="fx-service-view-copy">
          <header className="fx-service-view-header">
            <p className="fx-service-view-eyebrow-en">{eyebrowEn}</p>
            <p className="fx-service-view-eyebrow-ja">{eyebrowJa}</p>
          </header>

          <h2 id="home-service-title" className="fx-service-view-title">
            {title.split("\n").map((line) => (
              <span key={line} className="fx-service-view-title-line">
                {line}
              </span>
            ))}
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
          <div
            className="fx-service-view-agent-grid"
            aria-label="賃貸管理業務を支えるAIエージェント一覧"
          >
            {agents.map((agent) => (
              <article key={agent.title} className="fx-service-view-agent-card">
                <Image
                  src={agent.icon}
                  alt=""
                  width={160}
                  height={160}
                  className="fx-service-view-agent-icon"
                />
                <h3 className="fx-service-view-agent-title">{agent.title}</h3>
                <p className="fx-service-view-agent-body">{agent.body}</p>
              </article>
            ))}
          </div>

        </div>
      </div>
    </Surface>
  );
}
