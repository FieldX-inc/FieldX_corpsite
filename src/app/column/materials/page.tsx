import type { Metadata } from "next";

import { siteContent } from "@/components/site/content";
import { ColumnMaterialsTemplate } from "@/components/templates";

export const metadata: Metadata = {
  title: "資料一覧",
  description: "Field Xの資料一覧。AI導入や業務設計の検討に使える資料を集約していきます。",
  alternates: {
    canonical: "/column/materials"
  },
  openGraph: {
    title: "資料一覧",
    description: "Field Xの資料一覧。AI導入や業務設計の検討に使える資料を集約していきます。",
    url: "/column/materials"
  }
};

export default function ColumnMaterialsPage() {
  return <ColumnMaterialsTemplate content={siteContent} />;
}
