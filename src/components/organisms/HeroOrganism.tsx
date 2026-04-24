"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Surface, TextAnchor } from "@/components/atoms";
import { HeroFieldXBackground } from "./HeroRadialBurstBackground";

import type { HomeSection } from "@/types/site";

type HeroOrganismProps = {
  sectionId: HomeSection;
  title: string;
  body: string;
};

export function HeroOrganism({ sectionId, title, body }: HeroOrganismProps) {
  const [isReady, setIsReady] = useState(false);
  const titleLines = title.split("\n");
  const getHeroLineStyle = (index: number) => ({ ["--fx-hero-line-index"]: index }) as CSSProperties;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setIsReady(true);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Surface
      as="section"
      id={sectionId}
      tone="light"
      labelledBy="home-hero-title"
      className={`fx-hero-organism${isReady ? " is-ready" : ""}`}
    >
      <HeroFieldXBackground />
      <div className="fx-shell fx-hero-grid fx-hero-grid--home">
        <div className="fx-hero-copy">
          <h1 id="home-hero-title" className="fx-hero-title fx-hero-title-home">
            {titleLines.map((line, index) => (
              <span key={`hero-line-${index}`} className="fx-hero-title-line" style={getHeroLineStyle(index)}>
                <span className="fx-hero-title-line-text">{line}</span>
              </span>
            ))}
          </h1>

          {body ? <p className="fx-hero-body fx-hero-body-home">{body}</p> : null}

          <div className="fx-hero-cta-row">
            <Link href="/contact" className="fx-hero-cta fx-hero-cta-primary">
              まずは相談する
            </Link>
            <TextAnchor href="/contact?intent=materials" className="fx-hero-cta fx-hero-cta-secondary">
              資料を請求する
            </TextAnchor>
            <TextAnchor href="/what-we-do" className="fx-hero-cta fx-hero-cta-tertiary">
              過去事例をみる
            </TextAnchor>
          </div>
        </div>
      </div>
    </Surface>
  );
}
