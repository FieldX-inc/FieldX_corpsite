# Analytics MCP Runbook

## Goal
- Read `GA4`, `GSC`, and lead data from Codex for weekly analysis
- Keep the production canonical fixed at `https://www.fieldx.site/`

## Data Sources
- GA4: Field X production property only
- GSC: `https://www.fieldx.site/`
- Lead DB: `public.leads`, `public.lead_daily_summary`, `public.lead_page_summary`, `public.lead_campaign_summary`

## Recommended Query Set
### Weekly growth review
- Organic queries that gained impressions week over week
- Pages with high impressions but low CTR
- Pages with `contact_form_started` but no `generate_lead`
- `utm_campaign` rows with the highest lead volume
- `inquiry_type` mix by week

### Lead attribution review
- Lead count by `page_path`
- Lead count by `utm_campaign`
- Qualified lead count by `status`
- Recent leads with `referrer`, `utm_*`, and `ga_client_id`

## MCP Auth Guidance
### GA4 / GSC
- Prefer service-account authentication if the organization allows key creation
- If key creation is blocked again, document an OAuth fallback outside the repo

### Lead DB
- Read-only Postgres access is enough for Codex analysis
- Expose at least these relations:
  - `public.leads`
  - `public.lead_daily_summary`
  - `public.lead_page_summary`
  - `public.lead_campaign_summary`

## Weekly Questions for Codex
- Which articles generated leads this week?
- Which LPs show the largest gap between `contact_form_started` and `generate_lead`?
- Which GSC queries deserve title/description rewrites?
- Which campaigns produced inquiries but no qualified leads?
