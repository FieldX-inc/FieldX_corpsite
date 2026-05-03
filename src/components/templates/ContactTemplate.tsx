import Link from "next/link";

import { ContactForm } from "@/components/organisms/ContactForm";
import type { SiteLocaleContent } from "@/components/site/content";

type ContactTemplateProps = {
  content: SiteLocaleContent;
};

export function ContactTemplate({ content }: ContactTemplateProps) {
  return (
    <>
      <section className="fx-contact-page-hero" aria-labelledby="contact-page-title">
        <div className="fx-contact-page-hero-inner">
          <h1 id="contact-page-title" className="fx-contact-page-title">
            CONTACT
          </h1>
          <p className="fx-contact-page-lead">
            AI導入、業務設計、プロダクトに関するご相談を受け付けています。
            <br />
            現場の課題や検討状況が整理されていない段階でも、お気軽にお問い合わせください。
          </p>
          <div className="fx-contact-page-hero-actions">
            <Link href="#contact-form" className="fx-contact-page-primary-link">
              フォームへ進む
            </Link>
            <Link href="mailto:hello@fieldx.site" className="fx-contact-page-secondary-link">
              メールで相談する
            </Link>
          </div>
        </div>
      </section>

      <section id="contact-form" className="fx-contact-page-section" aria-labelledby="contact-form-title">
        <div className="fx-contact-page-shell">
          <div className="fx-contact-page-grid">
            <div className="fx-contact-page-copy">
              <h2 id="contact-form-title" className="fx-contact-page-section-title">
                お問い合わせ
              </h2>
              <p className="fx-contact-page-description">{content.contact.body}</p>
              <dl className="fx-contact-page-notes" aria-label="お問い合わせ前の確認事項">
                <div>
                  <dt>相談できる内容</dt>
                  <dd>AIエージェント導入、業務フロー整理、既存ツールを活かした自動化設計</dd>
                </div>
                <div>
                  <dt>返信について</dt>
                  <dd>内容を確認のうえ、担当者よりメールでご連絡します。</dd>
                </div>
              </dl>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
