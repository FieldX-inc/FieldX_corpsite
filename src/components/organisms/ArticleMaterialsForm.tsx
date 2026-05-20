"use client";

import { useId, useState } from "react";

import { getAttributionContext, getCurrentPagePath, trackEvent } from "@/lib/analytics";

type ArticleMaterialsFormValues = {
  company: string;
  name: string;
  email: string;
};

const initialValues: ArticleMaterialsFormValues = {
  company: "",
  name: "",
  email: ""
};

export function ArticleMaterialsForm() {
  const formId = useId();
  const [values, setValues] = useState<ArticleMaterialsFormValues>(initialValues);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof ArticleMaterialsFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setStatusMessage("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.name.trim() || !values.email.trim()) {
      setStatusMessage("お名前とメールアドレスを入力してください。");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("送信しています。");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          company: values.company,
          name: values.name,
          email: values.email,
          inquiryType: "project",
          awarenessSources: [],
          message:
            "コラム記事横の資料請求フォームから送信されました。サービス概要資料の送付を希望します。",
          ...getAttributionContext()
        })
      });

      if (!response.ok) {
        setStatusMessage("送信に失敗しました。時間をおいて再度お試しください。");
        return;
      }

      setValues(initialValues);
      setStatusMessage("送信が完了しました。確認メールをご確認ください。");
      trackEvent("generate_lead", {
        form_id: "article_materials_form",
        page_path: getCurrentPagePath()
      });
    } catch {
      setStatusMessage("送信に失敗しました。通信環境を確認して再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="fx-article-materials-form" onSubmit={handleSubmit} noValidate>
      <div className="fx-article-materials-field">
        <label className="fx-article-materials-label" htmlFor={`${formId}-company`}>
          会社名
        </label>
        <input
          id={`${formId}-company`}
          className="fx-article-materials-input"
          data-clarity-mask="true"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(event) => handleChange("company", event.target.value)}
        />
      </div>

      <div className="fx-article-materials-field">
        <label className="fx-article-materials-label" htmlFor={`${formId}-name`}>
          お名前<span>必須</span>
        </label>
        <input
          id={`${formId}-name`}
          className="fx-article-materials-input"
          data-clarity-mask="true"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(event) => handleChange("name", event.target.value)}
          required
        />
      </div>

      <div className="fx-article-materials-field">
        <label className="fx-article-materials-label" htmlFor={`${formId}-email`}>
          メールアドレス<span>必須</span>
        </label>
        <input
          id={`${formId}-email`}
          className="fx-article-materials-input"
          data-clarity-mask="true"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
          required
        />
      </div>

      <button className="fx-article-materials-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "送信中" : "資料を請求する"}
      </button>

      <p className="fx-article-materials-note">
        送信後、サービス概要資料の確認方法をご案内します。
      </p>
      {statusMessage ? (
        <p className="fx-article-materials-status" aria-live="polite">
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
