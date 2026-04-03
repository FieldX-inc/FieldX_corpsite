# SEO Content Pipeline

## Recommendation
Yes: define all three layers explicitly.

- `AGENTS.md` should hold stable repository rules and publish guardrails.
- agent skills should hold reusable article-production workflows.
- sub-agent usage should be explicit only where parallel work materially improves quality or speed.

If these concerns are not separated, prompts grow unstable and article quality becomes dependent on whoever runs the workflow.

## Why `AGENTS.md` Alone Is Not Enough
`AGENTS.md` is the right place for rules that should always apply:

- repository structure
- Japanese-only policy
- content source of truth
- frontmatter / metadata requirements
- publication gates
- prohibited shortcuts

It is the wrong place for long procedural prompts such as:

- how to analyze SERP intent
- how to build an outline
- how to write a first draft
- how to verify citations
- how to score SEO/AIO/GEO quality

Those belong in skills, because they are workflows, not repository policy.

## Recommended Separation Of Responsibilities
### 1. `AGENTS.md`
Define non-negotiable constraints.

- content source of truth for `/column`
- required metadata and slug policy
- Japanese style rules
- brand / claim safety constraints
- review and publication gates
- output locations for drafts, briefs, and assets

### 2. Main article skill
Create one orchestrator skill for end-to-end column production.

Suggested name:
- `seo-column-pipeline`

Its responsibility:
- accept a target topic or keyword cluster
- load company context
- decide which specialist steps are needed
- call sub-agents when beneficial
- assemble the final draft package

Output contract:
- article brief
- outline
- article draft
- title / description candidates
- internal link suggestions
- verification notes
- publish checklist

### 3. Specialist skills
Split repeatable high-value tasks into smaller skills.

Suggested skills:
- `seo-serp-research`: search intent, competitor patterns, question mining
- `content-strategy`: keyword cluster design and topic prioritization
- `copywriting`: article prose and headline refinement
- `copy-editing`: clarity, tone, redundancy, and structure cleanup
- `schema-markup`: FAQ / Article / Breadcrumb structured-data suggestions
- `seo-audit`: final on-page QA and link / metadata checks

You do not need a separate skill for every tiny step. The split should follow durable task boundaries.

## Where Sub-Agents Help
Sub-agents are useful when the task can be parallelized with a clear output contract.

Recommended sub-agent tasks:
- SERP and competitor page collection
- source fact-checking and freshness verification
- related questions / entity extraction
- internal linking candidate discovery across the repo
- title / hook variant generation

Avoid sub-agents for:
- final synthesis
- brand-sensitive positioning
- claim approval
- the final publish decision

Those should stay with the main agent or a human reviewer.

## Suggested Pipeline
1. Topic intake
- input keyword, audience, funnel stage, conversion goal, and business priority

2. Context injection
- load company context, target product/service, forbidden claims, ICP, and tone rules

3. Research
- analyze intent, competitors, source quality, freshness requirements, and internal-link opportunities

4. Brief generation
- define article angle, core thesis, outline, required evidence, and conversion path

5. Draft generation
- produce title, description, headings, summary blocks, body copy, and CTA

6. Optimization
- add answer-first summaries, entity clarity, source-backed claims, metadata, and schema ideas

7. QA
- check factual support, duplication, tone drift, weak sections, and publication readiness

8. Publish handoff
- package the article for `microCMS`, including metadata and reviewer notes

## Minimal Explicit Contract For Each Stage
For stable automation, define inputs and outputs for each stage.

Example:

- Research input:
  - target keyword
  - company context
  - target persona
- Research output:
  - intent summary
  - competitor observations
  - must-cover questions
  - risky claims to verify

- Draft input:
  - approved brief
  - company context
  - source notes
- Draft output:
  - article markdown or rich-text draft
  - title candidates
  - description candidates
  - FAQ candidates

Without these contracts, sub-agent orchestration becomes brittle.

## Company Context Injection Strategy
Do not put all company context in one giant `AGENTS.md`.

Use three layers:

- `AGENTS.md`:
  - universal rules that always apply in this repo
- product marketing context doc:
  - company, ICP, differentiators, proof, tone, forbidden claims
- per-article brief:
  - keyword, search intent, funnel stage, CTA, required references

This keeps stable context separate from volatile campaign/article context.

## Practical Recommendation For This Repo
Given the current implementation, the cleanest approach is:

- keep `/column` as `microCMS` publish target
- add workflow docs for AI-assisted column creation
- create one orchestrator skill for article production
- keep specialist skills small and reusable
- make sub-agent calls explicit only in the orchestrator skill instructions

That is enough structure without overengineering the system.

## Proposed Next Assets
- Extend `AGENTS.md` with SEO content guardrails
- Add a company context file such as `.claude/product-marketing-context.md`
- Add a workflow doc for article production and review
- Create a `seo-column-pipeline` skill
- Optionally add a publish checklist template for `microCMS`
