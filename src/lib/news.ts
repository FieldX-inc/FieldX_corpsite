import type { ColumnPost } from "@/types/content";

export const publishedNewsPosts: ColumnPost[] = [
  {
    id: "news-corporate-site-renewal",
    slug: "corporate-site-renewal",
    title: "コーポレートサイトをリニューアルしました。",
    description:
      "株式会社Field Xは、賃貸管理業務特化のAIエージェントの開発・提供に向け、コーポレートサイトをリニューアルしました。",
    lead:
      "「様々なFieldのXを解き、社会を次代につなげる。」をミッションに掲げるField Xの事業内容と、AIエージェント開発に関する情報をよりわかりやすく発信していきます。",
    publishedAt: "2026-05-20T00:00:00.000Z",
    tags: ["お知らせ"],
    ogImage: "/images/news/corporate-site-renewal.png",
    toc: [],
    body: `
      <p>「様々なFieldのXを解き、社会を次代につなげる。」をミッションに掲げ、賃貸管理業務特化のAIエージェントを開発・提供する株式会社Field X（本社：東京都渋谷区、代表：佐藤 善彦）は、コーポレートサイトをリニューアルしました。</p>
      <p>今回のリニューアルでは、Field Xの事業内容、AIエージェント開発の方針、対象領域をよりわかりやすくお伝えできるよう、サイト全体の情報設計とデザインを見直しました。</p>
      <h2>リニューアルの背景</h2>
      <p>Field Xは、賃貸管理会社における電話対応、書類確認、オーナー対応などの業務にAIエージェントを組み込み、現場の担当者が判断に集中できる業務環境の実現を目指しています。</p>
      <p>サイト上でも、こうした事業の方向性をより具体的に伝えるため、サービス領域、開発中のAIエージェント、資料やコラムへの導線を整理しました。</p>
      <h2>主な更新内容</h2>
      <p>サービスページでは、賃貸管理業務に特化したAIエージェントの活用領域や、業務整理から実装・運用定着までの進め方を整理しました。また、コラムや資料ページを通じて、AI導入を検討する企業が必要な情報にアクセスしやすい構成にしています。</p>
      <p>今後も、導入事例、検討資料、業務別の活用ノウハウを順次公開し、賃貸管理会社の業務変革に役立つ情報を提供してまいります。</p>
    `
  }
];

export function getPublishedNewsPostBySlug(slug: string) {
  return publishedNewsPosts.find((post) => post.slug === slug) ?? null;
}
