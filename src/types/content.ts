export type PublishStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  slug: string;
  publishedAt?: string;
  tags?: string[];
  ogImage?: string;
  body: string;
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
