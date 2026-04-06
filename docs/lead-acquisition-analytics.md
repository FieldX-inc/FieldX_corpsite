# リード獲得向け計測基盤

## 目的
- 問い合わせ獲得を主目的に、流入から問い合わせ完了までを追える状態にする
- SEO コンテンツ、LP、問い合わせフォームのどこが成果に寄与したかを判断できる状態にする
- GA4 と GSC のデータを MCP から読めるようにして、改善判断を速くする

## このリポジトリで実装済みの計測
### GA4
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

## GA4 設定
### 必須
1. GA4 の Web data stream をこのサイトの本番ドメインに紐付ける
2. `NEXT_PUBLIC_GA_ID` を Vercel と `.env.local` に設定する
3. GA4 管理画面で `generate_lead` を conversion として有効化する

### 推奨
- `cta_clicked` を Key event にしない
- `contact_form_started` はファネル分析用として使う
- レポート比較用に以下のカスタムディメンションを追加する
  - `cta_id`
  - `cta_location`
  - `destination_type`
  - `inquiry_type`
  - `form_id`

## GSC 設定
1. 本番ドメインを Search Console に登録する
2. `https://fieldx.site/` を使う場合は URL prefix か Domain property のどちらかで所有権確認する
3. 本番 canonical と sitemap を送信する
4. GSC で確認する `siteUrl` は MCP クエリ時の引数と一致させる

## MCP 運用
### 役割
- GA4: CV、LP、問い合わせ導線の分析
- GSC: クエリ、CTR、掲載順位、記事流入の分析

### 最低限見る指標
- Organic sessions
- `generate_lead` 件数
- LP 別 CVR
- 記事別の問い合わせ寄与
- クエリ別の表示回数、CTR、平均掲載順位

### 週次レビューで見る問い
- どの流入元が問い合わせにつながったか
- どの LP が `contact_form_started` までは進むが `generate_lead` に落ちるか
- 表示回数はあるのに CTR が低い記事はどれか
- 問い合わせが出ている記事と出ていない記事の差分は何か

## 実装上の注意
- PII は GA4 イベントに送らない
- メールアドレス、氏名、会社名は計測イベントのパラメータに含めない
- 流入 attribution は GA4 と管理者通知メールの両方で見る

## 次にやると良いこと
1. 問い合わせ完了後の Slack 通知を追加する
2. 問い合わせ内容を HubSpot かスプレッドシートへ保存する
3. `/contact` 以外の主要 CTA を棚卸しして `cta_id` を統一命名する
4. 主要 LP ごとに専用 CTA 文言とオファーを用意する
