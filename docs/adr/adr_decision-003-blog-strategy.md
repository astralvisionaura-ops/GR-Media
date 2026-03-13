# ADR-003: Blog Strategy — Git/Markdown, No CMS

```
STATUS:     ACCEPTED
DATE:       2026-03-13
AUTHOR:     agent-architecture
SUPERSEDES: —
CONTEXT:    GR-Media — Architecture phase (pre GATE-01)
```

-----

## Context

GR-Media requires a blog for content marketing and organic SEO (FR-002). The blog must produce indexable pages with structured data and a sitemap. The question is whether blog content should be managed through a headless CMS (Contentful, Sanity, Prismic) or authored directly as Markdown files committed to the Git repository. The client has confirmed they are comfortable with a Git-based workflow and do not require a CMS UI. This ADR records that decision and its architectural consequences.

-----

## Decision Drivers

```
MUST:   Blog posts must be statically generated (SSG) — not server-rendered per request
MUST:   Posts must be indexable (sitemap, structured data, Open Graph metadata)
MUST:   No additional backend service introduced solely for blog content
SHOULD: Zero additional monthly cost for blog infrastructure
SHOULD: Authoring workflow understood and accepted by the photographer
COULD:  Support MDX for rich content (image components, galleries inline)
```

-----

## Options Considered

### Option A: Git/Markdown — files in repository

Blog posts are `.md` or `.mdx` files stored in `/content/blog/` within the repository. Next.js reads these files at build time using the filesystem API (or a library like `gray-matter` for frontmatter parsing). The site is rebuilt on every Git push via Vercel's CI/CD pipeline. No external service is involved.

Pros:

- Zero additional cost — no CMS subscription
- Posts are version-controlled in Git — full history, branching for draft posts, rollback
- Statically generated at build time — fastest possible page loads, no dynamic rendering overhead
- No external service dependency for the blog — zero SPOF added
- MDX support available through `@next/mdx` — allows embedding React components in posts
- SEO metadata (frontmatter → `<head>`) is fully under engineering control
- Aligns with CON-002 (no unnecessary complexity) and CON-003 (quality/stability first)

Cons:

- Publishing requires Git access — the photographer cannot publish via a browser UI
- No scheduled publishing without CI/CD cron workaround
- Image management for blog posts requires manual upload to `/public/blog/` or Supabase Storage
- No content preview before commit without local development environment

### Option B: Headless CMS (Contentful / Sanity)

A headless CMS provides a browser-based authoring UI, scheduled publishing, media management, and content previews. Content is fetched at build time via the CMS's API.

Pros:

- Non-technical authoring via browser UI — no Git knowledge required
- Built-in media management, scheduled posts, content preview
- Collaborative editing if multiple authors are added

Cons:

- Monthly cost ($0–$300+/month depending on tier and usage)
- External API dependency — build fails if CMS is unreachable
- Additional authentication and API key management
- Content stored in a proprietary system — migration requires content export
- For a single-author photography blog with infrequent posts, the operational overhead is disproportionate

### Option C: Database-backed Blog (posts in PostgreSQL)

Blog posts stored in the Supabase PostgreSQL database; a simple admin UI allows editing. Content rendered server-side or fetched at build time via Supabase queries.

Pros:

- Leverages existing Supabase infrastructure

Cons:

- Requires building an admin UI (significant scope increase)
- Posts lose Git history and version control
- SSG becomes complex — incremental static regeneration or full rebuild required per post change
- No benefit over Option B without the CMS UI, and no benefit over Option A without the admin savings

-----

## Decision

**Chosen: Option A — Git/Markdown**

The client has confirmed they are comfortable with a Git-based authoring workflow. A headless CMS introduces subscription cost, an external API dependency, and additional complexity for a single-author blog with low publishing frequency. Option A produces the fastest possible blog pages (fully static), eliminates a service dependency, and keeps all content version-controlled in the same repository. The lack of a browser UI is an accepted tradeoff, explicitly confirmed by the client. If authoring requirements change (non-technical co-author, high publishing volume), migration to a headless CMS is a self-contained architectural change that does not require rebuilding the frontend.

-----

## Consequences

```
POSITIVE:
  - Blog pages are fully static — zero database queries, maximum performance
  - Content is in Git — history, diffing, draft branches, rollback are all standard Git operations
  - Zero ongoing cost for blog infrastructure
  - No CMS vendor lock-in — content is portable plain Markdown
  - Build-time metadata generation (sitemap.xml, Open Graph) is straightforward

NEGATIVE:
  - Publishing requires a Git commit and push — no browser-based CMS UI
  - Blog image management is manual; images committed to repo or manually uploaded to storage
  - Site rebuild required for every post publish — Vercel build time ~30–90s (acceptable for infrequent posts)
  - No scheduled posts without a GitHub Actions cron job

RISKS:
  - Photographer requires Git knowledge for content updates.
    Mitigation: Provide a simple publishing guide. If Git becomes a blocker, headless CMS migration
    is isolated to the content layer and does not require framework changes.
  - Large image commits to Git repository can bloat repo size over time.
    Mitigation: Blog post images stored in Supabase Storage or Cloudinary, not committed to repo.
    Frontmatter references image URL rather than local path.

REVISIT WHEN:
  - A second author is added who is not comfortable with Git
  - Publishing frequency exceeds 4 posts/month — scheduled publishing becomes valuable
  - Blog grows to 200+ posts — build time and incremental rebuilds may favor ISR or CMS
```

-----

## Privacy by Design Assessment *(GDPR Art. 25)*

```
PERSONAL DATA INVOLVED: NO
  Blog posts are public content authored by GR Media. No reader personal data is collected
  by the blog itself. Comment systems (which would collect personal data) are out of scope.

DPIA REQUIRED: NO
```
