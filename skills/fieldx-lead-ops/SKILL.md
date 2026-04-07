---
name: fieldx-lead-ops
description: Field X の旗艦サイトで、GA4、GSC、Lead DB を横断してリード獲得の分析と改善案作成を行う skill。問い合わせ数、LP別CVR、記事別寄与、検索CTR、キャンペーン別成果、フォーム離脱の診断が必要なときに使う。
---

# Field X Lead Ops

Field X のコーポレートサイトを、継続的に改善する前提で分析する skill。

## 使うとき
- 問い合わせ数の増減要因を見たいとき
- どの記事や LP が lead に寄与したかを知りたいとき
- `contact_form_started` から `generate_lead` への落ち込みを見たいとき
- GSC の表示回数に対して CTR が低いページを直したいとき
- `utm_campaign` や `inquiry_type` 別の成果を見たいとき

## 前提データ
- GA4: Field X production property のみ
- GSC: `https://www.fieldx.site/`
- Lead DB:
  - `public.leads`
  - `public.lead_daily_summary`
  - `public.lead_page_summary`
  - `public.lead_campaign_summary`

必要に応じて以下を参照する。
- 分析運用: [../../docs/analytics-mcp-runbook.md](../../docs/analytics-mcp-runbook.md)
- 計測仕様: [../../docs/lead-acquisition-analytics.md](../../docs/lead-acquisition-analytics.md)
- Contact API: [../../docs/contact-api.md](../../docs/contact-api.md)
- Lead DB schema: [../../docs/lead-db.sql](../../docs/lead-db.sql)

## 基本手順
1. 対象期間を明示する
2. `GA4` で `page_view`, `cta_clicked`, `contact_form_started`, `generate_lead`, `contact_form_submit_failed` を確認する
3. `GSC` で表示回数、CTR、平均掲載順位を確認する
4. `Lead DB` で `page_path`, `utm_campaign`, `inquiry_type`, `status` を確認する
5. 数字を並べるだけで終わらせず、原因仮説と次アクションまで出す

## 週次レビューの型
### 1. リード概況
- 今週の `generate_lead`
- 先週比
- `inquiry_type` 別構成
- `utm_campaign` 別 lead 数

### 2. ページ寄与
- `lead_page_summary` で上位ページを確認
- 記事か LP かを分けて見る
- `contact_form_started` があるのに `generate_lead` が弱いページを洗う

### 3. 検索改善
- GSC で表示回数が高いのに CTR が低いページを確認
- title / description / 見出し / CTA 導線の改善候補を出す

### 4. フォーム改善
- `contact_form_submit_failed` の有無
- `/contact` 到達に対する `contact_form_started`
- `contact_form_started` に対する `generate_lead`

## 出力の型
以下の順で出す。

1. 重要な所見
2. 根拠データ
3. 原因仮説
4. 次の改善アクション

改善アクションは、なるべく次のどれかに落とす。
- GTM / GA4 計測修正
- LP copy / CTA 修正
- 記事 title / description 修正
- 記事末尾 CTA 修正
- フォーム UI / 文言修正
- CRM 側の status 運用見直し

## 注意
- PII を GA4 や Clarity に送らない
- `public.leads` の氏名、会社名、メールアドレスは分析要約に不要なら出さない
- 評価対象の canonical は常に `https://www.fieldx.site/`
- 数値が取れない場合は「接続未完了」か「期間が短い」のどちらかを先に疑う
