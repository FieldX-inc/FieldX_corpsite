export type PublishStatus = "draft" | "published";

export type ColumnPostTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type ColumnPost = {
  id: string;
  title: string;
  description: string;
  lead?: string;
  slug: string;
  publishedAt?: string;
  tags?: string[];
  ogImage?: string;
  body: string;
  toc: ColumnPostTocItem[];
};

export type LandingPageFrontmatter = {
  title: string;
  description: string;
  campaign: string;
  status: PublishStatus;
  publishedAt?: string;
  heroCta?: string;
  ogImage?: string;
};

export type LandingPage = LandingPageFrontmatter & {
  body: string;
  filePath: string;
};
