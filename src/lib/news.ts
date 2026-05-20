import type { ColumnPost } from "@/types/content";

export const publishedNewsPosts: ColumnPost[] = [
  {
    id: "news-corporate-site-renewal",
    slug: "corporate-site-renewal",
    title: "コーポレートサイトをリニューアルしました。",
    description:
      "Field Xは、事業内容やAI導入支援の考え方をよりわかりやすくお伝えするため、コーポレートサイトをリニューアルしました。",
    lead:
      "今回のリニューアルでは、AIを業務にどう組み込み、現場で継続運用できる状態へつなげるかというField Xの支援方針を整理しました。",
    publishedAt: "2026-05-20T00:00:00.000Z",
    tags: ["お知らせ"],
    ogImage: "/images/news/corporate-site-renewal.svg",
    toc: [],
    body: `
      <p>株式会社Field Xは、コーポレートサイトをリニューアルしました。</p>
      <p>今回のリニューアルでは、Field Xの事業内容、AI導入支援の考え方、対象領域をよりわかりやすくお伝えできるよう、サイト全体の情報設計とデザインを見直しました。</p>
      <h2>リニューアルの背景</h2>
      <p>Field Xは、AIを単なるツールとして導入するのではなく、業務フローの中に組み込み、人が判断・承認しながら継続運用できる状態を作ることを重視しています。</p>
      <p>サイト上でも、こうした考え方をより具体的に伝えるため、サービス領域、導入支援の進め方、資料やコラムへの導線を整理しました。</p>
      <h2>主な更新内容</h2>
      <p>サービスページでは、業務整理からAIワークフローの設計、実装後の運用定着までの流れを整理しました。また、コラムや資料ページを通じて、AI導入を検討する企業が必要な情報にアクセスしやすい構成にしています。</p>
      <p>今後も、導入事例、検討資料、業務別の活用ノウハウを順次公開し、AI導入を検討する企業にとって実務に近い情報を提供してまいります。</p>
    `
  }
];

export function getPublishedNewsPostBySlug(slug: string) {
  return publishedNewsPosts.find((post) => post.slug === slug) ?? null;
}
