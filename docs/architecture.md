# Architecture

## Goal
Deliver a flexible corporate site that supports rapid publishing of Column content and landing pages.

## System Overview
- Next.js App Router for routing and rendering
- `microCMS` as the source of truth for Column content
- MDX files in Git for landing pages
- Schema validation for fetched CMS content and landing page frontmatter

## Runtime Flow
1. Route receives slug/campaign.
2. Repository loader fetches Column content from `microCMS` or reads LP content from `content/lp`.
3. Content shape is validated.
4. Published entries are rendered server-side.

## Extensibility
- Add new content types by introducing a new folder under `content/` or a new external content source with a corresponding schema.
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
