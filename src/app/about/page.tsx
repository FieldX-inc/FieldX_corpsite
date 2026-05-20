import type { Metadata } from "next";

import { siteContent } from "@/components/site/content";
import { AboutTemplate } from "@/components/templates";

export const metadata: Metadata = {
  title: "会社概要",
  description:
    "様々なFieldのXを解き、社会を次代につなげる。Field Xは、賃貸管理業界をはじめとした人々の生活に根ざす既存産業にAIを実装しより良い形で社会を次代につなげる会社です。",
  alternates: {
    canonical: "/about"
  },
  openGraph: {
    title: "会社概要",
    description:
      "様々なFieldのXを解き、社会を次代につなげる。Field Xは、賃貸管理業界をはじめとした人々の生活に根ざす既存産業にAIを実装しより良い形で社会を次代につなげる会社です。",
    url: "/about"
  }
};

export default function AboutPage() {
  return <AboutTemplate content={siteContent} />;
}
