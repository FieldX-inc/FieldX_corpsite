# Contact API

## 目的
- `/api/contact` の request / response 契約を固定する
- CRM から lead データを安全に参照する read-only API を定義する
- 自作 CRM や運用バッチが参照すべき lead データ項目を明確にする
- メール送信と Lead DB 保存の責務分離を明文化する

## Endpoint
- `POST /api/contact`
- `GET /api/leads`
- `GET /api/leads/:id`
- `GET /api/leads/daily`
- `GET /api/leads/pages`
- `GET /api/leads/campaigns`

## CRM Read API 認証
- CRM 向け read API は固定トークン認証を使う
- リクエストヘッダーに `Authorization: Bearer <CRM_API_TOKEN>` を付与する
- トークン不一致または欠落時は `401`
- 想定利用者はサーバーサイドの CRM SaaS のみ

## 概要
- 問い合わせフォームの送信を受け付ける
- 管理者通知メールを `hello@fieldx.site` に送る
- 送信者へ自動返信メールを送る
- `public.leads` に lead を保存する

## Request Body
```json
{
  "company": "株式会社Example",
  "name": "山田 太郎",
  "email": "taro@example.com",
  "inquiryType": "project",
  "message": "AI導入について相談したいです。",
  "pagePath": "/contact",
  "pageTitle": "お問い合わせ | Field X",
  "referrer": "https://www.google.com/",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "spring_lp",
  "utmContent": "cta_a",
  "utmTerm": "ai 導入",
  "gaClientId": "1234567890.1234567890"
}
```

## Request Fields
- `company`: string, optional
- `name`: string, required
- `email`: string, required
- `inquiryType`: required
  - `project`
  - `partnership`
  - `media`
  - `other`
- `message`: string, required
- `pagePath`: string, optional
- `pageTitle`: string, optional
- `referrer`: string, optional
- `utmSource`: string, optional
- `utmMedium`: string, optional
- `utmCampaign`: string, optional
- `utmContent`: string, optional
- `utmTerm`: string, optional
- `gaClientId`: string, optional

## Success Response
- Status: `200`

```json
{
  "message": "お問い合わせを送信しました。"
}
```

## Error Responses
### Validation Error
- Status: `400`

```json
{
  "message": "入力内容を確認してください。"
}
```

### SMTP Config Missing
- Status: `503`

```json
{
  "message": "メール送信設定が未完了です。環境変数を確認してください。"
}
```

### Mail Send Failure
- Status: `500`

```json
{
  "message": "送信に失敗しました。時間をおいて再度お試しください。"
}
```

## CRM Read API
### `GET /api/leads`
- 最新の lead 一覧を返す
- 既定ソート: `createdAt desc`

#### Query
- `status`: `new | contacted | qualified | lost`
- `inquiryType`: `project | partnership | media | other`
- `utmCampaign`: string
- `pagePath`: string
- `limit`: `1..100`

#### Response
- Status: `200`

```json
{
  "leads": [
    {
      "id": "uuid",
      "createdAt": "2026-04-07T12:34:56.000Z",
      "company": "株式会社Example",
      "name": "山田 太郎",
      "email": "taro@example.com",
      "inquiryType": "project",
      "message": "AI導入について相談したいです。",
      "pagePath": "/contact",
      "pageTitle": "お問い合わせ | Field X",
      "referrer": "https://www.google.com/",
      "utmSource": "google",
      "utmMedium": "cpc",
      "utmCampaign": "spring_lp",
      "utmContent": "cta_a",
      "utmTerm": "ai 導入",
      "gaClientId": "1234567890.1234567890",
      "status": "new",
      "notes": null
    }
  ]
}
```

### `GET /api/leads/:id`
- 単一 lead の詳細を返す
- 存在しない `id` は `404`

#### Response
- Status: `200`

```json
{
  "lead": {
    "id": "uuid",
    "createdAt": "2026-04-07T12:34:56.000Z",
    "company": "株式会社Example",
    "name": "山田 太郎",
    "email": "taro@example.com",
    "inquiryType": "project",
    "message": "AI導入について相談したいです。",
    "pagePath": "/contact",
    "pageTitle": "お問い合わせ | Field X",
    "referrer": "https://www.google.com/",
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "spring_lp",
    "utmContent": "cta_a",
    "utmTerm": "ai 導入",
    "gaClientId": "1234567890.1234567890",
    "status": "new",
    "notes": null
  }
}
```

### `GET /api/leads/daily`
- 日別集計を返す

#### Query
- `from`: `YYYY-MM-DD`
- `to`: `YYYY-MM-DD`
- `limit`: `1..365`

#### Response
```json
{
  "summary": [
    {
      "day": "2026-04-07T00:00:00+00:00",
      "leadCount": 12,
      "qualifiedCount": 3
    }
  ]
}
```

### `GET /api/leads/pages`
- ページ別集計を返す

#### Query
- `limit`: `1..100`

#### Response
```json
{
  "summary": [
    {
      "pagePath": "/contact",
      "inquiryType": "project",
      "leadCount": 8,
      "firstLeadAt": "2026-04-01T01:23:45.000Z",
      "lastLeadAt": "2026-04-07T12:34:56.000Z"
    }
  ]
}
```

### `GET /api/leads/campaigns`
- `utm_campaign` 別集計を返す

#### Query
- `limit`: `1..100`

#### Response
```json
{
  "summary": [
    {
      "utmCampaign": "spring_lp",
      "leadCount": 5,
      "qualifiedCount": 2
    }
  ]
}
```

### CRM Read API Errors
#### Unauthorized
- Status: `401`

```json
{
  "message": "Unauthorized"
}
```

#### Invalid Query Parameters
- Status: `400`

```json
{
  "message": "Invalid query parameters."
}
```

#### Not Found
- Status: `404`

```json
{
  "message": "Lead not found."
}
```

#### Internal Server Error
- Status: `500`

```json
{
  "message": "Internal server error."
}
```

## 保存先
lead は Supabase の `public.leads` に保存する。

主な保存カラム:
- `id`
- `created_at`
- `company`
- `name`
- `email`
- `inquiry_type`
- `message`
- `page_path`
- `page_title`
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `ga_client_id`
- `status`
- `notes`

SQL は [lead-db.sql](/home/yshk0402/Corporates-site/docs/lead-db.sql) を参照。

## 実行順序と失敗時の扱い
- 管理者通知メール送信
- 自動返信メール送信
- Lead DB 保存

この 3 つは並列で実行する。

### 失敗条件
- 管理者通知メール失敗: API は `500`
- 自動返信メール失敗: API は `500`
- Lead DB 保存失敗: API は `200` を維持し、サーバーログに記録

つまり、CRM 側は「API 成功 = メール送信成功」を前提にしてよく、`Lead DB` は非同期障害を監視で拾う設計にする。

## CRM 連携方針
- 本リポジトリ側では管理画面を持たない
- CRM 側は read API または `public.leads` を参照して表示する
- 更新対象として想定している主カラム
  - `status`
  - `notes`

## 推奨運用
- CRM 側では `id` を主キーとして扱う
- `email` や `company` を join key にしない
- 分析用途では `page_path`, `utm_campaign`, `inquiry_type`, `ga_client_id` を優先して参照する
- PII を GA4 や Clarity に再送しない
