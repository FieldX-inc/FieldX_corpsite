# Architecture

## Goal
Deliver a flexible corporate site that supports rapid publishing of blogs and landing pages without introducing a CMS.

## System Overview
- Next.js App Router for routing and rendering
- MDX files in Git as the content source of truth
- Frontmatter validation with schema checks
- Publication controlled by `status: draft|published`

## Runtime Flow
1. Route receives slug/campaign.
2. Repository loader reads MDX file from `content/*`.
3. Frontmatter is validated.
4. Non-published content is excluded.
5. MDX is rendered server-side.

## Extensibility
- Add new content types by introducing a new folder under `content/` and a corresponding schema.
- Add shared UI by extending `src/components`.

## Application Structure
- The primary corporate app lives at repository root (`src/app`).
- Operates X pages are implemented inside the same root application and share the same deployment target.
- Content, routing, and release controls are managed from the root app only.

## Release Phase Control
- Runtime mode is controlled by `SITE_RELEASE_PHASE`.
- `full` keeps the regular site behavior and route availability.
- `prelaunch_operates_x` enables prelaunch mode:
  - `/` renders Operates X as a standalone page.
  - Global navigation/header/footer are hidden.
  - Non-allowed routes are closed by middleware with `404` (files remain in repository).
  - `sitemap.xml` only lists `/` and `/contact`.
- Switch back to `SITE_RELEASE_PHASE=full` to restore all routes without code rollback.
