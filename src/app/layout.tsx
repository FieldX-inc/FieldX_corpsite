import type { Metadata } from "next";
import { M_PLUS_Rounded_1c, Noto_Sans_JP } from "next/font/google";

import { SiteFooter, SiteHeader } from "@/components/organisms";
import { siteContent } from "@/components/site/content";
import { GoogleTagManager } from "@/components/site/GoogleTagManager";
import { defaultOgImage } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  display: "swap",
  preload: false,
  variable: "--fx-font-noto-sans-jp",
  weight: ["400", "500", "700", "800", "900"]
});

const mPlusRounded = M_PLUS_Rounded_1c({
  display: "swap",
  preload: false,
  variable: "--fx-font-m-plus-rounded",
  weight: ["700", "800", "900"]
});

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
    images: [defaultOgImage],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteContent.company} | コーポレートサイト`,
    description: siteContent.hero.body,
    images: [defaultOgImage.url]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="ja" className={`${notoSansJp.variable} ${mPlusRounded.variable}`}>
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
