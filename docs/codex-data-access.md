# Codex Data Access

## 目的
- Codex が Field X のデータを直接読めるようにするための前提条件をまとめる
- 分析・改善 skill が依存するデータソースを固定する

## 対象データソース
- GA4
- GSC
- Lead DB (`Supabase / Postgres`)

## 必要な接続
### 1. GA4
- 対象 property は Field X 専用の 1 つに固定する
- 参照対象イベント
  - `page_view`
  - `cta_clicked`
  - `contact_form_started`
  - `generate_lead`
  - `contact_form_submit_failed`

### 2. GSC
- canonical property は `https://www.fieldx.site/`
- Codex 側で使う `siteUrl` もこの URL に揃える

### 3. Lead DB
- 読み取り対象
  - `public.leads`
  - `public.lead_daily_summary`
  - `public.lead_page_summary`
  - `public.lead_campaign_summary`
- 読み取り専用で十分

## 推奨権限
### GA4 / GSC
- 可能なら service account ベース
- それが難しい場合は OAuth

### Lead DB
- Read-only database user
- CRM 側の更新ユーザーと分析ユーザーを分ける

## 接続後に確認する問い
- どの記事が lead を生んだか
- どの LP が `contact_form_started` から落ちているか
- どのクエリが表示回数に対して CTR が低いか
- どの `utm_campaign` が lead を生んでいるか
- `status` が進んでいない inquiry はどこ由来か

## 関連ファイル
- [analytics-mcp-runbook.md](/home/yshk0402/Corporates-site/docs/analytics-mcp-runbook.md)
- [lead-acquisition-analytics.md](/home/yshk0402/Corporates-site/docs/lead-acquisition-analytics.md)
- [contact-api.md](/home/yshk0402/Corporates-site/docs/contact-api.md)
- [lead-db.sql](/home/yshk0402/Corporates-site/docs/lead-db.sql)
