import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "@/components/organisms";
import { siteContent } from "@/components/site/content";
import { GoogleAnalytics } from "@/components/site/GoogleAnalytics";
import { isPrelaunchOperatesX } from "@/lib/releasePhase";

import "./globals.css";

export const metadata: Metadata = {
  title: `${siteContent.company} | Corporate Site`,
  description: siteContent.hero.body || "Field X corporate site"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const prelaunchOperatesX = isPrelaunchOperatesX();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ja">
      <body>
        {prelaunchOperatesX ? null : (
          <SiteHeader
            company={siteContent.company}
            nav={siteContent.nav}
            aboutSectionNav={{
              mvv: siteContent.mvv.heading,
              team: siteContent.team.heading,
              companyProfile: siteContent.companyProfile.heading
            }}
          />
        )}
        <main className="fx-main-area">{children}</main>
        {prelaunchOperatesX ? null : <SiteFooter company={siteContent.company} />}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
