"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import logoMark from "../../../Group 2.png";
import { TextAnchor } from "@/components/atoms";

type SiteHeaderProps = {
  company: string;
  nav: {
    about: string;
    whatWeDo: string;
    column: string;
    news: string;
    contact: string;
  };
  aboutSectionNav: {
    mvv: string;
    team: string;
    companyProfile: string;
  };
};

export function SiteHeader({ company, nav, aboutSectionNav }: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = useId();
  const desktopLinks = [
    {
      href: "/about",
      label: "ABOUT",
      withCaret: true,
      children: [
        { href: "/about#company-profile", label: aboutSectionNav.companyProfile || "会社概要" },
        { href: "/about#team", label: "役員紹介" },
        { href: "/about#mvv", label: "私たちについて" },
        { href: "/about#history", label: "採用情報" }
      ]
    },
    { href: "/service", label: "SERVICE", withCaret: false },
    {
      href: "/column/magazine",
      label: "COLUMN",
      withCaret: true,
      children: [
        { href: "/column/magazine", label: "マガジン" },
        { href: "/column/materials", label: "資料一覧" }
      ]
    },
    { href: "/news", label: "NEWS", withCaret: false }
  ];

  const mobileLinks = [
    { href: "/about", label: "ABOUT" },
    { href: "/about#mvv", label: aboutSectionNav.mvv || "MVV" },
    { href: "/about#team", label: "TEAM" },
    { href: "/about#company-profile", label: "COMPANY" },
    { href: "/service", label: "SERVICE" },
    { href: "/column/magazine", label: "COLUMN" },
    { href: "/column/magazine", label: "MAGAZINE" },
    { href: "/column/materials", label: "MATERIALS" },
    { href: "/news", label: "NEWS" }
  ] as const;

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.removeProperty("overflow");
      document.removeEventListener("keydown", onEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fx-site-header">
      <div className="fx-site-header-inner">
        <Link href="/" className="fx-site-header-brand" aria-label={`${company} トップページ`}>
          <Image src={logoMark} alt="" className="fx-site-header-mark" priority />
          <span className="fx-site-header-sr-only">{company}</span>
        </Link>

        <div className="fx-site-header-desktop">
          <nav aria-label="グローバルナビゲーション" className="fx-site-header-nav">
            <ul className="fx-site-header-nav-list">
              {desktopLinks.map((item) => (
                <li key={item.href} className="fx-site-header-nav-item">
                  <TextAnchor
                    href={item.href}
                    className={`fx-site-header-nav-link${item.withCaret ? " is-caret" : ""}`}
                  >
                    {item.label}
                  </TextAnchor>
                  {item.children?.length ? (
                    <ul
                      className="fx-site-header-dropdown"
                      aria-label={`${item.label}ページ内ナビゲーション`}
                    >
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <TextAnchor
                            href={child.href}
                            className="fx-site-header-dropdown-link"
                            tracking={undefined}
                          >
                            {child.label}
                          </TextAnchor>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="fx-site-header-actions">
            <TextAnchor
              href="/contact?intent=materials"
              className="fx-site-header-link"
              tracking={{
                ctaId: "global_nav_materials",
                ctaLabel: "資料請求",
                ctaLocation: "global_nav"
              }}
            >
              資料請求
            </TextAnchor>
            <TextAnchor
              href="/contact"
              className="fx-site-header-contact"
              tracking={{
                ctaId: "global_nav_contact",
                ctaLabel: nav.contact,
                ctaLocation: "global_nav"
              }}
            >
              お問い合わせ
            </TextAnchor>
          </div>
        </div>

        <div className="fx-site-header-mobile">
          <button
            type="button"
            className="fx-site-header-mobile-trigger"
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileMenuId}
            aria-label={isMobileMenuOpen ? "ナビゲーションを閉じる" : "ナビゲーションを開く"}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <>
          <button
            type="button"
            className="fx-site-header-mobile-backdrop"
            aria-label="メニューを閉じる"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div id={mobileMenuId} className="fx-site-header-mobile-panel">
            <nav
              aria-label="モバイルグローバルナビゲーション"
              className="fx-site-header-mobile-nav"
            >
              <ul className="fx-site-header-mobile-list">
                {mobileLinks.map((item) => (
                  <li key={item.href}>
                    <TextAnchor
                      href={item.href}
                      className="fx-site-header-mobile-link"
                      tracking={undefined}
                    >
                      {item.label}
                    </TextAnchor>
                  </li>
                ))}
              </ul>

              <div className="fx-site-header-mobile-cta">
                <TextAnchor
                  href="/contact?intent=materials"
                  className="fx-site-header-mobile-secondary"
                  tracking={{
                    ctaId: "global_nav_materials_mobile",
                    ctaLabel: "資料請求",
                    ctaLocation: "global_nav_mobile"
                  }}
                >
                  資料請求
                </TextAnchor>
                <TextAnchor
                  href="/contact"
                  className="fx-site-header-mobile-primary"
                  tracking={{
                    ctaId: "global_nav_contact_mobile",
                    ctaLabel: nav.contact,
                    ctaLocation: "global_nav_mobile"
                  }}
                >
                  お問い合わせ
                </TextAnchor>
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
