# Corporates-site

Next.js App Router based corporate website starter for AI-driven iteration.

## Features
- `microCMS` managed Column content
- Git-managed MDX landing pages (`lp`)
- `draft/published` publication control
- Japanese-only flat routes (no locale prefix)
- Sitemap and robots generation
- CI pipeline (lint, typecheck, build)

## Requirements
- Node.js `18.x` (see `.nvmrc`)
- pnpm `10.28.0`

## Setup
```bash
pnpm install
pnpm dev
```

Open: `http://localhost:3000`

## microCMS
`/column` is backed by `microCMS`.

Set the following in `.env.local` or Vercel environment variables:

```bash
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
MICROCMS_COLUMN_ENDPOINT=column
```

Expected content model fields for the Column API:
- `title` (text)
- `content` (rich editor HTML)
- `eyecatch` (media, optional)
- `category` (relation, optional)

Notes:
- URL slug is currently derived from the `microCMS` content ID.
- Description text is generated from the `content` body.

## GA4
Set the GA4 Measurement ID in `.env.local` or Vercel environment variables.

```bash
NEXT_PUBLIC_GA_ID=G-2EJ0V2P6MZ
```

The root app injects the Google tag only when `NEXT_PUBLIC_GA_ID` is present.
Custom lead-gen events are documented in [docs/lead-acquisition-analytics.md](./docs/lead-acquisition-analytics.md).

## Scripts
```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```

## Contact Form Mail Delivery
To enable `/contact` automatic mail delivery, configure SMTP in `.env.local`.

```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mailer@example.com
SMTP_PASS=your-password
CONTACT_FROM_EMAIL=hello@fieldx.site
CONTACT_FROM_NAME=Field X
```

The form sends:
- notification mail to `hello@fieldx.site`
- auto-reply mail to the visitor's email address

## Directory Layout
```text
src/
  app/
    column/[slug]/page.tsx
    lp/[campaign]/page.tsx
  lib/
    content/
content/
  lp/
docs/
```

## Content Authoring
### Column
Manage Column posts in `microCMS`.

### Landing Page (`content/lp/{campaign}.mdx`)
```mdx
---
title: "..."
description: "..."
campaign: "..."
status: "published"
---

本文
```
