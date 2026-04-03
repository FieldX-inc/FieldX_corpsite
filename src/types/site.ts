export type HomeSection =
  | "hero"
  | "poem"
  | "about"
  | "mvv"
  | "what-we-do"
  | "column"
  | "team"
  | "company-profile"
  | "news"
  | "contact";

export type ServiceCard = {
  category?: string;
  name: string;
  description: string;
  slug?: string;
  image?: {
    src: string;
    alt: string;
  };
};

export type WhatWeDoFeatureRow = {
  title: string;
  body: string;
};

export type SectionTone = "light" | "dark";

export type TemplateVariant = "home" | "column-index" | "column-post" | "lp";

export type CardDensity = "compact" | "comfortable";
