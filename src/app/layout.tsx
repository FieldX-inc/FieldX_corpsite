import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "@/components/organisms";
import { siteContent } from "@/components/site/content";
import { GoogleTagManager } from "@/components/site/GoogleTagManager";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteContent.company} | コーポレートサイト`,
    template: `%s | ${siteContent.company}`
  },
  description: siteContent.hero.body,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteContent.company} | コーポレートサイト`,
    description: siteContent.hero.body,
    url: "/",
    siteName: siteContent.company,
    locale: "ja_JP",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="ja">
      <body>
        <SiteHeader
          company={siteContent.company}
          nav={siteContent.nav}
          aboutSectionNav={{
            mvv: siteContent.mvv.heading,
            team: siteContent.team.heading,
            companyProfile: siteContent.companyProfile.heading
          }}
        />
        <main className="fx-main-area">{children}</main>
        <SiteFooter company={siteContent.company} />
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      </body>
    </html>
  );
}
