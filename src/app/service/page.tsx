import type { Metadata } from "next";

import { siteContent } from "@/components/site/content";
import { WhatWeDoTemplate } from "@/components/templates";

export const metadata: Metadata = {
  title: "事業内容",
  description:
    "Field Xの事業内容。AIエージェントと業務設計により、課題整理から開発、導入、運用定着まで一気通貫で支援します。",
  alternates: {
    canonical: "/service"
  },
  openGraph: {
    title: "事業内容",
    description:
      "Field Xの事業内容。AIエージェントと業務設計により、課題整理から開発、導入、運用定着まで一気通貫で支援します。",
    url: "/service"
  }
};

export default function ServicePage() {
  return <WhatWeDoTemplate content={siteContent} />;
}
