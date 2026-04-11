# Content Operations

## Publish a Column Post
1. Create or update the entry in `microCMS`
2. Fill `title` and `content`
3. Optionally set `eyecatch` and `category`
4. Publish the entry in `microCMS`
5. Run `pnpm typecheck && pnpm build`
6. Deploy

## Publish a Landing Page
1. Add `content/lp/{campaign}.mdx`
2. Ensure `campaign` is unique
3. Set `status: published`
4. Validate links and metadata
5. Merge and deploy

## Validation Notes
- Landing page `campaign` must match filename
- Column content is loaded from `microCMS`
- The production `MICROCMS_API_KEY` must not allow draft retrieval. Use a public read-only key for the site runtime and keep broader keys for authoring scripts only.
- Invalid landing page frontmatter fails build/time checks
