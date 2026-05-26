import type { Metadata } from "next";

import { siteContent } from "@/components/site/content";
import { ContactTemplate } from "@/components/templates";
import { defaultOgImage } from "@/lib/metadata";

const description =
  "Field Xへのご相談・資料請求はこちら。賃貸管理業務に特化したAIエージェントの導入範囲や業務設計についてお問い合わせください。";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description,
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "お問い合わせ",
    description,
    url: "/contact",
    siteName: siteContent.company,
    locale: "ja_JP",
    type: "website",
    images: [defaultOgImage]
  },
  twitter: {
    card: "summary_large_image",
    title: "お問い合わせ",
    description,
    images: [defaultOgImage.url]
  }
};

export default function ContactPage() {
  return <ContactTemplate content={siteContent} />;
}
