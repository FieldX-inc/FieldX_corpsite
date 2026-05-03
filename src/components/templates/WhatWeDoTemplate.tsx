import Link from "next/link";

import { HomeContactCtaOrganism } from "@/components/organisms";
import type { SiteLocaleContent } from "@/components/site/content";

type WhatWeDoTemplateProps = {
  content: SiteLocaleContent;
};

const services = [
  {
    title: "Call Agent",
    body: "すでに導入されている、CRMや基幹システムを基盤とし、その上に展開可能なAI電話応対システムです。\nAIエージェントを構築し、クライアント様のデータ基盤の上に展開することで、従来のIVRや一般的なAI受電SaaSでは実現できない応答精度や自然な会話体験を実現しております。"
  },
  {
    title: "PM Agent",
    body: "不動産賃貸管理業界のPM（プロパティマネジメント）業務に特化した、AIエージェントシステムです。\n物件のアセットマネジメント、入居者管理、オーナー管理など基幹システムやCRMが混在する賃貸管理業務において、申請書を転記し、高精度な社内情報の検索を実現しております。\nこれにより、社内での情報確認に追われたい時間を削減し、オーナー様への訪問回数を向上させることで賃貸管理会社様の売上拡大に寄与します。"
  },
  {
    title: "Field CRM",
    body: "当社の社内ニーズより具現化した、AIネイティブなCRMシステムです。\n従来のCRMが備えている、リードやリストの管理、アウトバウンドの行動管理に加えて独自のAIエージェントがフォーム営業やリスト作成を実行することで、より効率的な営業活動の実現を目指しております。"
  },
  {
    title: "ちょこっとインハウス",
    body: "Web広告運用の内製化支援に特化した、AI Agent SaaSです。\nキャンペーン作成時のクリエイティブや検索キーワードのセットアップから日々の改善までを一気通貫して担うことができます。\nGoogle広告、Meta広告、Yahoo!広告のアカウント情報を紐づけることでAIエージェントがデータを自動取得し、最適な改善策の提案をいたします。"
  }
];

const flowSteps = [
  {
    number: "01",
    icon: "hearing",
    title: "ヒアリング",
    body: "業務内容、利用中のシステム、現場で詰まっている作業を整理します。"
  },
  {
    number: "02",
    icon: "design",
    title: "業務設計",
    body: "AIを入れる範囲、既存ツールとの接続、運用ルールを設計します。"
  },
  {
    number: "03",
    icon: "build",
    title: "実装・検証",
    body: "小さく動く形から構築し、実データと現場の反応をもとに改善します。"
  },
  {
    number: "04",
    icon: "operate",
    title: "運用定着",
    body: "チームで継続利用できるように、手順化と改善サイクルを整えます。"
  }
] as const;

function FlowIcon({ type }: { type: (typeof flowSteps)[number]["icon"] }) {
  const commonProps = {
    width: 34,
    height: 34,
    viewBox: "0 0 34 34",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true
  };

  if (type === "hearing") {
    return (
      <svg {...commonProps}>
        <path
          d="M8.5 10.5h17v10.2h-8.1l-5.2 4.2v-4.2H8.5V10.5Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M13 15.4h8M13 18.6h5.2"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "design") {
    return (
      <svg {...commonProps}>
        <path
          d="M7.8 9.2h18.4v15.6H7.8V9.2Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M12 14h10M12 18h6.5M12 22h4"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M23 20.8l3 3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "build") {
    return (
      <svg {...commonProps}>
        <path
          d="M19.8 8.8a6.1 6.1 0 0 0 5.4 7.5l-8.4 8.4a4 4 0 0 1-5.7-5.7l8.7-8.7Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="m12.8 21.2 2.1 2.1"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path
        d="M25.7 14.2a9 9 0 0 0-16.2-2.8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M8.3 19.8a9 9 0 0 0 16.2 2.8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M9.6 7.8v3.7h3.7M24.4 26.2v-3.7h-3.7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

      <section className="fx-service-page-business" aria-labelledby="service-business-title">
        <div className="fx-service-page-shell">
          <h2 id="service-business-title" className="fx-service-page-section-title">
            事業内容
          </h2>

          <section className="fx-service-page-ax" aria-labelledby="service-ax-title">
            <h3 id="service-ax-title" className="fx-service-page-red-heading">
              AX Solution事業
            </h3>
            <p className="fx-service-page-ax-body">
              経営視点と現場ヒアリングを組み合わせ、
              <br />
              AI導入の優先度、既存システムとの接続、運用ルールを整理します。
              <br />
              PoCや勉強会で終わらせず、実務の中で継続利用できるAIワークフローを設計・実装し、
              <br />
              チームに定着するまで伴走します。
            </p>
          </section>

          <section className="fx-service-page-agent" aria-labelledby="service-agent-title">
            <h3 id="service-agent-title" className="fx-service-page-red-heading">
              AI Agent事業
            </h3>
            <div className="fx-service-page-service-list">
              {services.map((service) => (
                <article key={service.title} className="fx-service-page-service-row">
                  <div className="fx-service-page-service-copy">
                    <h4 className="fx-service-page-service-title">{service.title}</h4>
                    <p className="fx-service-page-service-body">
                      {service.body.split("\n").map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                  <div className="fx-service-page-service-media" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="fx-service-page-flow-section" aria-labelledby="service-flow-title">
        <div className="fx-service-page-flow-shell">
          <h2 id="service-flow-title" className="fx-service-page-flow-title">
            導入の流れ
          </h2>
          <p className="fx-service-page-flow-lead">
            PoCで止めず、現場の業務に組み込んで継続運用できる状態まで伴走します。
          </p>
          <ol className="fx-service-page-flow-list" aria-label="導入の流れ">
            {flowSteps.map((step) => (
              <li key={step.number} className="fx-service-page-flow-item">
                <article className="fx-service-page-flow-card">
                  <div className="fx-service-page-flow-card-head">
                    <span className="fx-service-page-flow-icon">
                      <FlowIcon type={step.icon} />
                    </span>
                    <span className="fx-service-page-flow-number">{step.number}</span>
                  </div>
                  <h3 className="fx-service-page-flow-card-title">{step.title}</h3>
                  <p className="fx-service-page-flow-card-body">{step.body}</p>
                </article>
              </li>
            ))}
          </ol>
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
