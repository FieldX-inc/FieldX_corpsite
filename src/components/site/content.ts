import type { ServiceCard, WhatWeDoFeatureRow } from "@/types/site";

export type SiteLocaleContent = {
  company: string;
  nav: {
    about: string;
    whatWeDo: string;
    column: string;
    news: string;
    contact: string;
  };
  hero: {
    title: string;
    body: string;
  };
  poem: {
    eyebrowEn: string;
    eyebrowJa: string;
    title: string;
    body: string;
    aboutCtaLabel: string;
  };
  about: {
    heading: string;
    body: string;
  };
  mvv: {
    heading: string;
    items: {
      label: string;
      body?: string;
      points?: string[];
      entries?: {
        title: string;
        subtitle?: string;
        body: string;
      }[];
    }[];
  };
  whatWeDo: {
    heading: string;
    intro?: string;
    featuredRows: WhatWeDoFeatureRow[];
    services: ServiceCard[];
  };
  serviceView: {
    eyebrowEn: string;
    eyebrowJa: string;
    title: string;
    body: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    agents: {
      title: string;
      body: string;
      icon: string;
    }[];
  };
  team: {
    heading: string;
    body: string;
    members: {
      name: string;
      role: string;
      bio: string;
      imageSrc: string;
      imageAlt: string;
    }[];
  };
  companyProfile: {
    heading: string;
    items: {
      label: string;
      value: string | string[];
    }[];
  };
  news: {
    heading: string;
    eyebrowJa: string;
    empty: string;
    publishedLabel: string;
  };
  column: {
    heading: string;
    eyebrowJa: string;
    ctaLabel: string;
    ctaHref: string;
    empty: string;
    listAriaLabel: string;
  };
  contact: {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    cards: {
      eyebrow: string;
      title: string;
      body: string;
      image?: {
        src: string;
        alt: string;
      };
      cover?: {
        kicker: string;
        title: string;
        subtitle: string;
        ctaLabel: string;
      };
      points: string[];
      ctaLabel: string;
      ctaHref: string;
    }[];
  };
  columnPage: {
    heading: string;
    description: string;
    empty: string;
    listAriaLabel: string;
    publishedLabel: string;
  };
  lp: {
    eyebrow: string;
    ctaLabel: string;
  };
};

export const siteContent: SiteLocaleContent = {
  company: "Field X",
  nav: {
    about: "About",
    whatWeDo: "Service",
    column: "Column",
    news: "News",
    contact: "Contact"
  },
  hero: {
    title: "様々なFieldのXを解き、\n社会を次代につなげる。",
    body: "現場に残る反復業務を、AIエージェントと業務設計で実装可能な形に落とし込みます。電話対応、書類処理、レポート作成などの定常業務を見直し、導入から運用定着まで伴走します。"
  },
  poem: {
    eyebrowEn: "ABOUT",
    eyebrowJa: "私たちについて",
    title:
      "すべての事業領域・業界で\nAIが意思決定を支え、\nヒトがヒトにしかできない\n業務に集中できる世界の実現",
    body: "Field Xは、AIを単なるツールではなく新しいインフラとして捉えています。現場の業務を観察し、構造的なボトルネックを特定し、実務で継続運用できるワークフローまで落とし込むことを重視しています。PoCや勉強会で止まらず、電話対応、書類処理、マーケティング運用などの実業務にAIを組み込み、意思決定と生産性を同時に前進させます。",
    aboutCtaLabel: "会社概要をみる"
  },
  about: {
    heading: "",
    body: "Field Xは高専出身の二人によって立ち上げられたスタートアップです。合理化が進むこの時代に、様々な分野で事業創造を続け、集団で有り続けることの価値を証明します。"
  },
  mvv: {
    heading: "MVV",
    items: [
      {
        label: "Mission",
        body: "様々なFieldのXを解き、社会を次代につなげる。"
      },
      {
        label: "Vision",
        body: "すべての事業領域・業界でAIが意思決定を支え、\nヒトがヒトにしかできない業務に集中できる世界の実現"
      },
      {
        label: "Value",
        entries: [
          {
            title: "Solve the X",
            subtitle: "見えない課題を見つけ、構造から解く。",
            body: "私たちは表面的な問題ではなく、\n業務や産業の構造そのものにある「X」を見つけ出し、解決する。"
          },
          {
            title: "Build Fast",
            subtitle: "速く作り、速く学び、速く進む。",
            body: "AI時代において最大の競争力はスピードである。\nField X は、仮説・実装・改善を高速で回す。"
          },
          {
            title: "AI First",
            subtitle: "AIを前提に世界を設計する。",
            body: "AIはツールではなく、\n新しいインフラである。\n私たちはすべての業務をAI前提で再設計する。"
          },
          {
            title: "Think from the Field",
            subtitle: "現場から考える。",
            body: "机上の理論ではなく、\n現場の業務・顧客・産業構造から答えを導く。"
          },
          {
            title: "Create the Next Standard",
            subtitle: "次の当たり前をつくる。",
            body: "AIエージェントが企業の業務を支える世界。\nField X はその標準をつくる。"
          }
        ]
      }
    ]
  },
  whatWeDo: {
    heading: "What We Do",
    intro:
      "Xとは、まだ名前のついていない挑戦や未解決の社会課題。様々な領域のXを解く、創造的な事業開発を実行します。",
    featuredRows: [
      {
        title: "AI Agent Platform",
        body: "企業の業務を分解し、\nAIエージェントとして再構築します。\nコール対応、書類業務、マーケティング運用など、\n企業活動を支えるオペレーションをAI化し、\n企業の生産性を大きく引き上げます。"
      },
      {
        title: "Vertical AI Products",
        body: "AIエージェントを基盤に、\n業界ごとの課題を解決するプロダクトを開発します。\n不動産、マーケティング、ECなど、\n各産業の業務構造に最適化されたAIプロダクトを展開し、\n産業全体の進化を支えていきます。"
      }
    ],
    services: [
      {
        category: "AI DX 事業",
        name: "Launch X",
        description: "企画から公開までを最短で。あなたのアイデア実装をAIでエンパワーメントします。",
        image: {
          src: "/images/services/launch-x.svg",
          alt: "Launch X のサービスイメージ"
        }
      },
      {
        category: "教育 事業",
        name: "高専ジョブ",
        description: "高専生のための、高専生によるキャリアサービス",
        image: {
          src: "/images/services/kosen-job.svg",
          alt: "高専ジョブのサービスイメージ"
        }
      }
    ]
  },
  serviceView: {
    eyebrowEn: "SERVICE",
    eyebrowJa: "事業内容",
    title: "賃貸管理業務を支える\nAIエージェント群",
    body: "電話対応、書類作成、更新案内、退去手続き、オーナー対応まで。\nField Xは、現場に残る反復業務をAIが準備し、人が判断できる状態に整えます。",
    primaryCtaLabel: "サービスを見る",
    primaryCtaHref: "/service",
    agents: [
      {
        title: "AIコール",
        body: "電話応対",
        icon: "/images/services/agents/call-agent.svg"
      },
      {
        title: "AIチャット",
        body: "メール・チャット返信",
        icon: "/images/services/agents/chat-agent.svg"
      },
      {
        title: "オーナー支援",
        body: "訪問前の情報整理",
        icon: "/images/services/agents/owner-agent.svg"
      },
      {
        title: "AI Docs",
        body: "契約・書類作成",
        icon: "/images/services/agents/docs-agent.svg"
      },
      {
        title: "退去手続き",
        body: "退去完了までの支援",
        icon: "/images/services/agents/move-out-agent.svg"
      },
      {
        title: "更新案内",
        body: "連絡・リマインド",
        icon: "/images/services/agents/renewal-agent.svg"
      },
      {
        title: "修繕提案",
        body: "修繕・リノベ提案",
        icon: "/images/services/agents/repair-agent.svg"
      }
    ]
  },
  team: {
    heading: "Team",
    body: "異なる専門性を持つ少数精鋭で、最後まで実装する。",
    members: [
      {
        name: "佐藤善彦",
        role: "代表取締役",
        bio: "2002年広島県呉市生まれ。呉工業高等専門学校卒業後University of the Peopleへ編入し中退。在学中に広告代理店系ベンチャーで長期インターンシップを開始しその後新卒入社。ChatGPTなどの生成AI技術の指数関数的な発展をビジネスの現場で目の当たりにし、2026年AIによる業務改革を基軸事業に展開する株式会社Field Xを創業。",
        imageSrc: "/images/team/sato-yoshihiko.jpg",
        imageAlt: "佐藤善彦の顔写真"
      },
      {
        name: "吉村佑介",
        role: "共同創業者 専務取締役",
        bio: "2002年広島県福山市生まれ。呉工業高等専門学校プロジェクトデザイン工学専攻卒業。新卒から、大手電力会社、大手不動産ディベロッパーで営業職として渡り歩く。2026年AIによる業務改革を基軸事業に展開する株式会社Field Xを共同創業。現在は事業最高責任者として不動産賃貸管理会社のコールセンターAIや書類管理をDXするAIサービスを展開している。",
        imageSrc: "/images/team/yoshimura-yusuke.jpg",
        imageAlt: "吉村佑介の顔写真"
      }
    ]
  },
  companyProfile: {
    heading: "会社概要",
    items: [
      { label: "会社名", value: "Field X" },
      { label: "代表者", value: "佐藤 善彦" },
      { label: "所在地", value: "東京都渋谷区神泉町10-15" },
      { label: "設立", value: "2026年" },
      {
        label: "主な事業領域",
        value: [
          "AIコールエージェントの開発・導入",
          "書類業務のAI自動化",
          "業務オペレーションのAIエージェント化",
          "ナレッジベース / RAGシステムの構築",
          "AI活用プロダクトの開発"
        ]
      }
    ]
  },
  news: {
    heading: "NEWS",
    eyebrowJa: "お知らせ",
    empty: "公開中のニュースはまだありません。",
    publishedLabel: "Published"
  },
  column: {
    heading: "Column",
    eyebrowJa: "お役立ち情報",
    ctaLabel: "お役立ち情報をみる",
    ctaHref: "/column/magazine",
    empty: "公開中のコラムはまだありません。",
    listAriaLabel: "コラム一覧"
  },
  contact: {
    heading: "Contact",
    body: "ご相談・協業に関するお問い合わせはこちら。",
    ctaLabel: "お問い合わせはこちら",
    ctaHref: "/contact",
    cards: [
      {
        eyebrow: "最新ナレッジをギュッと凝縮！！",
        title: "AI活用最新事例集を無料ダウンロード",
        body: "Field Xが不動産賃貸管理会社様にこれまでに提供してきたAI活用の最新事例や、ご支援までのフローをわかりやすくまとめました。",
        image: {
          src: "/images/contact/ai-case-study-minimal-bg.png",
          alt: "AI活用最新事例集のスライド表紙イメージ"
        },
        cover: {
          kicker: "FIELD X WHITE PAPER",
          title: "AI活用\n最新事例集",
          subtitle: "不動産賃貸管理会社向け",
          ctaLabel: "無料ダウンロード"
        },
        points: [
          "業界／業種特化の最新AI活用の成功事例",
          "サービスの概要や費用感",
          "AI活用のメリットやよくある落とし穴"
        ],
        ctaLabel: "無料でダウンロードする",
        ctaHref: "/contact?intent=materials"
      },
      {
        eyebrow: "AI活用に関することなら何でも！！",
        title: "30分からの無料オンライン相談実施中",
        body: "30分〜のお打ち合わせで、貴社の課題や状況についてヒアリング。今すぐ活用できるアドバイスや、サービスの具体イメージもお伝えします。",
        image: {
          src: "/images/contact/ai-consultation-minimal-bg.png",
          alt: "無料オンライン相談のスライド表紙イメージ"
        },
        cover: {
          kicker: "ONLINE CONSULTATION",
          title: "AI導入・業務設計\n30分相談",
          subtitle: "実装の入口を30分で整理",
          ctaLabel: "無料で相談"
        },
        points: [
          "AI活用のイメージがなくてもOK",
          "とりあえず話を聞くだけでもOK",
          "ご支援実績からプランを共有します"
        ],
        ctaLabel: "無料で相談する",
        ctaHref: "/contact"
      }
    ]
  },
  columnPage: {
    heading: "Column",
    description: "公開中の記事のみ表示しています。",
    empty: "公開中の記事はありません。",
    listAriaLabel: "コラム記事一覧",
    publishedLabel: "Published"
  },
  lp: {
    eyebrow: "ランディングページ",
    ctaLabel: "資料をダウンロード"
  }
};
