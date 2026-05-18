# Google Cloud App Hosting Migration

Updated: 2026-05-18

## Decision

Use Firebase App Hosting for the Field X corporate site.

Why:

- The site is a Next.js App Router app with API routes.
- `/api/contact` sends mail through SMTP and stores leads.
- Column content is loaded from microCMS.
- Static Firebase Hosting would require removing or reworking server behavior first.

## Target

| Item | Value |
| --- | --- |
| Google Cloud organization | `fieldx.site` |
| Dev project | `fieldx-dev` exists, but billing link hit the project billing quota |
| Immediate migration project | `corprate-site-492521` |
| Production domain | `https://www.fieldx.site` |
| Hosting service | Firebase App Hosting |
| Runtime platform | Cloud Run, managed by App Hosting |
| Secrets | Secret Manager, referenced from `apphosting.yaml` |

## Current Vercel/Supabase Inputs

The repository currently needs these runtime inputs:

| Variable | Kind | Notes |
| --- | --- | --- |
| `SITE_RELEASE_PHASE` | plain env | Safe to commit as `full` |
| `NEXT_PUBLIC_SITE_URL` | plain env | `https://www.fieldx.site` |
| `NEXT_PUBLIC_GTM_ID` | secret-like public config | Public in client bundle, but keep managed in Secret Manager for rollout control |
| `NEXT_PUBLIC_CLARITY_ID` | secret-like public config | Public in client bundle, but keep managed in Secret Manager for rollout control |
| `MICROCMS_SERVICE_DOMAIN` | secret | Needed during build/runtime for column pages |
| `MICROCMS_API_KEY` | secret | Use read-only runtime key |
| `MICROCMS_COLUMN_ENDPOINT` | plain env | Defaults to `column` |
| `SMTP_HOST` | secret | Runtime only |
| `SMTP_PORT` | plain env | Usually `587` |
| `SMTP_SECURE` | plain env | Usually `false` |
| `SMTP_USER` | secret | Runtime only |
| `SMTP_PASS` | secret | Runtime only |
| `CONTACT_FROM_EMAIL` | plain env | `hello@fieldx.site` |
| `CONTACT_FROM_NAME` | plain env | `Field X` |
| `SUPABASE_URL` | secret | Temporary until lead storage moves to Google Cloud |
| `SUPABASE_SERVICE_ROLE_KEY` | secret | Runtime only |
| `SUPABASE_ANON_KEY` | secret-like public config | Present in current env example; not currently required by runtime search, but carried for parity |
| `CRM_API_TOKEN` | secret | Runtime auth token for lead-read API access |

## Secret Manager Names

Create these secrets before the first App Hosting rollout:

```txt
fieldx-corporate-next-public-gtm-id
fieldx-corporate-next-public-clarity-id
fieldx-corporate-microcms-service-domain
fieldx-corporate-microcms-api-key
fieldx-corporate-smtp-host
fieldx-corporate-smtp-user
fieldx-corporate-smtp-pass
fieldx-corporate-supabase-url
fieldx-corporate-supabase-service-role-key
fieldx-corporate-supabase-anon-key
fieldx-corporate-crm-api-token
```

## Pre-Migration Checklist

- [x] Add `apphosting.yaml`.
- [x] Create or confirm Google Cloud dev project.
- [ ] Link billing to the dev project. Current blocker: Google Cloud says the billing-enabled project quota is reached.
- [x] Confirm existing corporate-site project has billing.
- [x] Accept Firebase Terms of Service in Firebase Console.
- [x] Confirm `corprate-site-492521` is already a Firebase project.
- [x] Open App Hosting setup for `corprate-site-492521`.
- [x] Select App Hosting primary region.
- [ ] Create all Secret Manager secrets.
- [ ] Grant App Hosting backend access to the secrets.
- [x] Connect the GitHub repository to Firebase App Hosting.
- [x] Select the deployment branch.
- [ ] Run first rollout to the Firebase-provided preview domain.
- [ ] Verify homepage, `/service`, `/column/magazine`, and `/api/contact`.
- [ ] Only after verification, plan DNS cutover from Vercel to Google.

## Console State

Current state as of 2026-05-18:

- `fieldx-dev` was created.
  - Project ID: `fieldx-dev`
  - Project number: `620946448206`
- Billing link for `fieldx-dev` failed because the account has reached the number of projects that can have billing enabled.
- `corprate-site-492521` has billing enabled and is the practical first migration target.
- Firebase Console is available for `corprate-site-492521`.
- App Hosting setup was opened for `corprate-site-492521`.
- App Hosting primary region selected: `asia-east1 (Taiwan)`.
  - `asia-northeast1` / Tokyo was not available in the App Hosting region dropdown.
- The setup UI stalled at step 2, `GitHub リポジトリをインポートする`, while loading GitHub repository import.
- The CLI path succeeded after GitHub authorization:
  - Firebase web app: `fieldx-corporate-site`
  - Backend: `projects/corprate-site-492521/locations/asia-east1/backends/fieldx-corporate-site`
  - GitHub repo: `FieldX-inc/FieldX_corpsite`
  - Deployment branch: `main`
  - Deploy now: `No`
  - Future backend URL: `https://fieldx-corporate-site--corprate-site-492521.asia-east1.hosted.app`

## App Hosting Setup Click Path

Current click path:

1. Use existing Firebase project `corprate-site-492521`.
2. Open Firebase App Hosting.
3. Create a backend for the GitHub repository.
4. Select primary region: `asia-east1 (Taiwan)`.
5. Import the Field X corporate site GitHub repository: `FieldX-inc/FieldX_corpsite`.
6. Select branch: `main`.
7. Keep rollout paused until all secrets are present.
8. Let Firebase App Hosting read `apphosting.yaml`.
9. Run the first rollout to the Firebase-provided domain.

## Cutover Rule

Do not move `www.fieldx.site` DNS until the Firebase-provided domain passes:

- page render check
- column content check
- contact form mail check
- lead storage check
- sitemap and robots check

## Post-Migration Direction

Keep Supabase only as a temporary lead capture dependency for the corporate site. The long-term Google Cloud version should move lead storage to one of:

- Cloud SQL for relational lead/CRM data
- Firestore for lightweight lead intake
- direct CRM API ingestion once the internal CRM backend is stable
