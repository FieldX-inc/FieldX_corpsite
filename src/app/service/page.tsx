import type { Metadata } from "next";

import { siteContent } from "@/components/site/content";
import { WhatWeDoTemplate } from "@/components/templates";

export const metadata: Metadata = {
  title: "事業内容",
  description:
    "Field Xは賃貸管理業務に特化したAIエージェントカンパニーです。Field XのAIエージェントがどのように、賃貸管理業務を支援し成果をもたらすのかご覧ください。",
  alternates: {
    canonical: "/service"
  },
  openGraph: {
    title: "事業内容",
    description:
      "Field Xは賃貸管理業務に特化したAIエージェントカンパニーです。Field XのAIエージェントがどのように、賃貸管理業務を支援し成果をもたらすのかご覧ください。",
    url: "/service"
  }
};

export default function ServicePage() {
  return <WhatWeDoTemplate content={siteContent} />;
}
