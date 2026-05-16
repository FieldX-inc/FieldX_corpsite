import Image from "next/image";
import Link from "next/link";

import { HomeContactCtaOrganism } from "@/components/organisms";
import type { SiteLocaleContent } from "@/components/site/content";

type WhatWeDoTemplateProps = {
  content: SiteLocaleContent;
};

const agentProducts = [
  {
    title: "AIコールエージェント",
    body: "見込み客や入居者からの電話に応対する。",
    href: "/contact?intent=materials",
    icon: "/images/services/agents/call-agent.svg"
  },
  {
    title: "AIチャットエージェント",
    body: "見込み客や入居者からのメールやチャットの返信をAIが応対する。",
    href: "/contact?intent=materials",
    icon: "/images/services/agents/chat-agent.svg"
  },
  {
    title: "オーナーエージェント",
    body: "オーナー様訪問前に確認するべき社内情報をまとめる。",
    href: "/contact?intent=materials",
    icon: "/images/services/agents/owner-agent.svg"
  },
  {
    title: "AI Docs エージェント",
    body: "各種契約書などの煩雑な書類作成をAIが完了する。",
    href: "/contact?intent=materials",
    icon: "/images/services/agents/docs-agent.svg"
  },
  {
    title: "退去手続きエージェント",
    body: "退去連絡から退去完了までの一連の業務をAIが支援する。",
    href: "/contact?intent=materials",
    icon: "/images/services/agents/move-out-agent.svg"
  },
  {
    title: "更新案内エージェント",
    body: "契約更新対象者への連絡・リマインドを定期的に実行する。",
    href: "/contact?intent=materials",
    icon: "/images/services/agents/renewal-agent.svg"
  },
  {
    title: "大規模修繕エージェント",
    body: "水回りからリノベーションまで、修繕提案をAIが支援する。",
    href: "/contact?intent=materials",
    icon: "/images/services/agents/repair-agent.svg"
  }
] as const;

const platformNodes = [
  { className: "is-top-left" },
  { className: "is-top" },
  { className: "is-top-right" },
  { className: "is-left" },
  { className: "is-right" },
  { className: "is-bottom" }
] as const;

function CtaLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: string;
  variant?: "primary" | "ghost";
}) {
  return (
    <Link href={href} className={`fx-service-page-cta fx-service-page-cta-${variant}`}>
      {children}
    </Link>
  );
}

export function WhatWeDoTemplate({ content }: WhatWeDoTemplateProps) {
  return (
    <>
      <section className="fx-service-page-hero" aria-labelledby="service-page-title">
        <div className="fx-service-page-hero-inner">
          <h1 id="service-page-title" className="fx-service-page-title">
            SERVICE
          </h1>
          <p className="fx-service-page-lead">
            AIを業務の外側に置かず、現場で使い続けられる仕組みとして実装する。
            <br />
            課題整理から開発、導入、運用定着までを一気通貫で支援します。
          </p>
          <div className="fx-service-page-hero-actions">
            <CtaLink href="/contact">まずは相談する</CtaLink>
            <CtaLink href="/contact?intent=materials" variant="ghost">
              資料を請求する
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="fx-service-page-products" aria-labelledby="service-products-title">
        <div className="fx-service-page-shell">
          <h2 id="service-products-title" className="fx-service-page-section-title">
            主要なプロダクト
          </h2>

          <section
            className="fx-service-page-agent-suite"
            aria-labelledby="service-agent-suite-title"
          >
            <h3 id="service-agent-suite-title" className="fx-service-page-red-heading">
              <span>賃貸管理業務のあらゆる業務を支える</span>
              <span>エージェント型AI</span>
            </h3>
            <p className="fx-service-page-agent-lead">
              エージェント型AIを構築し活用することで、賃貸管理に関わるあらゆる業務を効率的に支え、
              <br />
              ヒトがヒトにしかできない業務に集中できる時間を創出し、クライアントの利益拡大に貢献します。
            </p>

            <div className="fx-service-page-agent-grid">
              {agentProducts.map((product) => (
                <article key={product.title} className="fx-service-page-agent-card">
                  <Image
                    src={product.icon}
                    alt=""
                    width={160}
                    height={160}
                    className="fx-service-page-agent-thumb"
                  />
                  <div className="fx-service-page-agent-copy">
                    <h4 className="fx-service-page-agent-title">{product.title}</h4>
                    <p className="fx-service-page-agent-body">{product.body}</p>
                    <Link href={product.href} className="fx-service-page-agent-link">
                      もっと詳しく知る
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="fx-service-page-platform" aria-labelledby="service-platform-title">
            <h3 id="service-platform-title" className="fx-service-page-red-heading">
              <span>強力なエージェント群を支える</span>
              <span>AIエージェントのためのプラットフォーム</span>
            </h3>
            <p className="fx-service-page-platform-lead">
              オーナー・入居者・物件・部屋ごとに独立する既存の基幹システムやCRMをシームレスに連携し、
              <br />
              AIエージェントが扱える構造化されたデータに変換。
              <br />
              セキュアなクラウド上に構築されたエージェントプラットフォームがAIエージェントを支えます。
            </p>

            <div className="fx-service-page-platform-visual" aria-hidden="true">
              <div className="fx-service-page-platform-diagram">
                {platformNodes.map((node) => (
                  <span
                    key={node.className}
                    className={`fx-service-page-platform-node ${node.className}`}
                  />
                ))}
                <span className="fx-service-page-platform-line is-line-top-left" />
                <span className="fx-service-page-platform-line is-line-top" />
                <span className="fx-service-page-platform-line is-line-top-right" />
                <span className="fx-service-page-platform-line is-line-left" />
                <span className="fx-service-page-platform-line is-line-right" />
                <span className="fx-service-page-platform-line is-line-bottom" />
                <span className="fx-service-page-platform-core">
                  <svg viewBox="0 0 64 64" role="img" aria-label="">
                    <path d="M18 19c0-5 8-9 17-9s17 4 17 9-8 9-17 9-17-4-17-9Z" />
                    <path d="M18 19v25c0 5 8 9 17 9s17-4 17-9V19" />
                    <path d="M18 31c0 5 8 9 17 9s17-4 17-9" />
                    <path d="M18 42c0 5 8 9 17 9s17-4 17-9" />
                    <path d="m43 43 12 12M55 43 43 55" />
                  </svg>
                </span>
              </div>
              <div className="fx-service-page-platform-sketch">←下書きの絵</div>
            </div>
          </section>

          <section className="fx-service-page-crm" aria-labelledby="service-crm-title">
            <h3 id="service-crm-title" className="fx-service-page-crm-title">
              <span>全てが揃ったAIネイティブな</span>
              <span>CRM</span>
            </h3>
            <p className="fx-service-page-crm-body">
              FieldCRMは賃貸管理業務に必要な機能とそれらを支援するAIエージェントを標準搭載した、
              <br />
              賃貸管理業者向けのAIネイティブなCRMです。
              <br />
              Field XのAIエージェントは既存のCRMと連携して利用することも可能ですが、
              <br />
              Field CRMへの移行でより強力な効果を発揮します。
            </p>
            <CtaLink href="/contact?intent=materials">詳細をみる</CtaLink>
            <div className="fx-service-page-crm-media" aria-hidden="true" />
          </section>
        </div>
      </section>

      <HomeContactCtaOrganism
        sectionId="contact"
        titleId="service-contact-title"
        cards={content.contact.cards}
      />
    </>
  );
}
