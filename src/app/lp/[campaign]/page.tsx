import type { Metadata } from "next";
import type { AnchorHTMLAttributes } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

import { TextAnchor } from "@/components/atoms";
import { siteContent } from "@/components/site/content";
import { LandingPageTemplate } from "@/components/templates";
import { getLandingPageByCampaign } from "@/lib/content/repository";
import { defaultOgImage } from "@/lib/metadata";

function LandingPageLink({
  href,
  children,
  className
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <a className={className}>{children}</a>;
  }

  return (
    <TextAnchor
      href={href}
      className={className}
      tracking={{
        ctaId: "lp_body_link",
        ctaLabel: typeof children === "string" ? children : href,
        ctaLocation: "lp_body"
      }}
    >
      {children}
    </TextAnchor>
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ campaign: string }>;
}): Promise<Metadata> {
  const { campaign } = await params;
  const page = await getLandingPageByCampaign(campaign);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/lp/${page.campaign}`
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/lp/${page.campaign}`,
      siteName: siteContent.company,
      locale: "ja_JP",
      type: "website",
      images: page.ogImage ? [page.ogImage] : [defaultOgImage]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.ogImage ?? defaultOgImage.url]
    }
  };
}

export default async function LandingPage({ params }: { params: Promise<{ campaign: string }> }) {
  const { campaign } = await params;
  const page = await getLandingPageByCampaign(campaign);

  if (!page) {
    notFound();
  }

  const { content } = await compileMDX({
    source: page.body,
    components: {
      a: LandingPageLink
    }
  });

  return <LandingPageTemplate content={siteContent} page={page} body={content} />;
}
