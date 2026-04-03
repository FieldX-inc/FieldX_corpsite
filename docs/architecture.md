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
- Content and routing are managed from the root app only.
