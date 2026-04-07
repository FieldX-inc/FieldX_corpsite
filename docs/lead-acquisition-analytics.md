# リード獲得向け計測基盤

## 目的
- 問い合わせ獲得を主目的に、流入から問い合わせ完了までを追える状態にする
- SEO コンテンツ、LP、問い合わせフォームのどこが成果に寄与したかを判断できる状態にする
- GA4 と GSC のデータを MCP から読めるようにして、改善判断を速くする

## このリポジトリで実装済みの計測
### GTM / GA4
- ページビュー
- `cta_clicked`
  - グローバルナビの `Contact`
  - ホームの問い合わせ CTA
  - LP のヒーロー CTA
  - 問い合わせフォーム内の直メールリンク
- `contact_form_started`
  - 問い合わせフォームの初回操作時
- `generate_lead`
  - 問い合わせ送信成功時
- `contact_form_submit_failed`
  - バリデーションエラー
  - API エラー
  - 通信エラー

### Lead DB
- 問い合わせ送信時に `leads` テーブルへ永続化
- 集計用 view
  - `lead_daily_summary`
  - `lead_page_summary`
  - `lead_campaign_summary`
- API 契約は [contact-api.md](/home/yshk0402/Corporates-site/docs/contact-api.md) を参照

### 問い合わせ通知メール
- フォーム送信時に以下の attribution 情報を管理者通知メールへ付与
  - `pagePath`
  - `pageTitle`
  - `referrer`
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_content`
  - `utm_term`
  - `ga_client_id`

## GTM / GA4 設定
### 必須
1. GTM container をこのサイト専用で作成する
2. GTM 上で GA4 configuration tag を作る
3. `NEXT_PUBLIC_GTM_ID` と `NEXT_PUBLIC_SITE_URL` を Vercel と `.env.local` に設定する
4. GA4 管理画面で `generate_lead` を conversion として有効化する

### 推奨
- `cta_clicked` を Key event にしない
- `contact_form_started` はファネル分析用として使う
- レポート比較用に以下のカスタムディメンションを追加する
  - `cta_id`
  - `cta_location`
  - `destination_type`
  - `inquiry_type`
  - `form_id`
  - `ga_client_id`

### GTM 実装メモ
- 初回 page view は GTM の pageview trigger に任せる
- SPA 遷移後は `page_view` を data layer から送る
- GA4 event tag は `cta_clicked`, `contact_form_started`, `generate_lead`, `contact_form_submit_failed` を購読する

## GSC 設定
1. 本番ドメインを Search Console に登録する
2. `https://fieldx.site/` を使う場合は URL prefix か Domain property のどちらかで所有権確認する
3. 本番 canonical と sitemap を送信する
4. GSC で確認する `siteUrl` は MCP クエリ時の引数と一致させる

## MCP 運用
### 役割
- GA4: CV、LP、問い合わせ導線の分析
- GSC: クエリ、CTR、掲載順位、記事流入の分析
- Lead DB: 問い合わせ実績、キャンペーン別 lead、将来の商談化分析

### 最低限見る指標
- Organic sessions
- `generate_lead` 件数
- LP 別 CVR
- 記事別の問い合わせ寄与
- クエリ別の表示回数、CTR、平均掲載順位
- `utm_campaign` 別 lead 数
- `inquiry_type` 別 lead 数

### 週次レビューで見る問い
- どの流入元が問い合わせにつながったか
- どの LP が `contact_form_started` までは進むが `generate_lead` に落ちるか
- 表示回数はあるのに CTR が低い記事はどれか
- 問い合わせが出ている記事と出ていない記事の差分は何か
- 最近の lead はどのページ / キャンペーン由来か

## 実装上の注意
- PII は GA4 イベントに送らない
- メールアドレス、氏名、会社名は計測イベントのパラメータに含めない
- 流入 attribution は GA4 と管理者通知メールの両方で見る
- Clarity は GTM 経由で配信し、入力欄には `data-clarity-mask="true"` を付ける
- lead 永続化に失敗しても、メール送信成功時はユーザーの完了体験を優先する
- CRM 連携は `public.leads` を参照し、`status` / `notes` の更新を外部管理画面側で担う

## 次にやると良いこと
1. 問い合わせ完了後の Slack 通知を追加する
2. `leads.status` と `notes` を更新する最小 UI を追加する
3. `/contact` 以外の主要 CTA を棚卸しして `cta_id` を統一命名する
4. 主要 LP ごとに専用 CTA 文言とオファーを用意する
