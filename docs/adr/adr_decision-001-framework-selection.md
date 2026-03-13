# ADR-001: Framework Selection

```
STATUS:     ACCEPTED
DATE:       2026-03-13
AUTHOR:     agent-architecture
SUPERSEDES: —
CONTEXT:    GR-Media — Architecture phase (pre GATE-01)
```

-----

## Context

GR-Media requires a web framework that serves three meaningfully different surfaces: a public marketing site with image-heavy portfolio pages (demands best-in-class static rendering and Core Web Vitals), a Git/markdown-based blog (static generation preferred, SEO-critical), and an authenticated client portal (requires server-side rendering, session management, and protected API routes). The framework choice is a foundational constraint that determines build tooling, deployment strategy, image optimization, and how auth integrates across public and private zones. The constraint from CON-002 states a preference for native or near-native web technologies and explicitly cautions against framework lock-in without justification.

-----

## Decision Drivers

```
MUST:   Support static generation for public pages and blog (Core Web Vitals < 2.5s LCP)
MUST:   Support server-side rendering and protected API routes for client portal auth
MUST:   Integrate cleanly with Supabase Auth (session cookies, middleware)
MUST:   First-class image optimization (photography site — hundreds of large images)
SHOULD: Deploy seamlessly to Vercel (edge network, preview deployments per branch)
SHOULD: Single framework for the entire site — no split deployment without clear justification
COULD:  Minimal JavaScript shipped to public-facing pages (performance + EAA)
```

-----

## Options Considered

### Option A: Next.js 14 App Router

Next.js 14 with the App Router uses React Server Components as the default, enabling per-route rendering mode selection: static generation for marketing pages and blog posts, SSR with server actions and middleware for the portal. It has first-class Vercel integration, built-in `next/image` for automatic responsive images and WebP conversion, and a mature ecosystem for Supabase Auth (middleware-based session handling via `@supabase/ssr`).

Pros:

- Single framework handles all three surfaces (static, SSR, API routes) without splitting the project
- `next/image` covers the photography site's most critical performance constraint out of the box
- App Router middleware supports auth-gated route protection natively — no custom proxy layer needed
- Vercel deployment is zero-config; preview environments per branch for review
- React Server Components minimize client-side JS on public pages by default
- Large community, stable 14.x release, clear upgrade path to 15.x

Cons:

- React mental model adds complexity compared to raw HTML for purely static pages
- App Router (RSC) has a steeper learning curve than Pages Router
- Larger dependency tree than Astro for purely static portions
- Framework lock-in to React — migration to another UI layer requires rewrite

### Option B: Astro

Astro is a content-centric framework built for minimal JavaScript delivery. It renders HTML at build time by default and ships zero JS unless explicitly opted in via component islands. It supports MDX for blog content natively and integrates with any UI framework (React, Svelte, etc.) per component. It would excel on the public marketing pages and blog.

Pros:

- Best-in-class JS minimization for static pages — natural fit for WCAG/EAA and performance goals
- Content collections API is an excellent fit for Git/markdown blog
- Agnostic to UI framework — no React lock-in

Cons:

- Client portal requires full SSR mode (`output: 'server'`) which negates Astro's static-first advantage
- Supabase Auth integration in Astro SSR is less mature; middleware session management is more complex
- Protected API routes in Astro are a lower-level primitive than Next.js route handlers
- Two mental models within one project: static islands for public pages vs. SSR for portal
- Smaller ecosystem for auth-heavy, session-managed SSR applications
- Vercel deployment supported but not as deeply integrated as Next.js

### Option C: SvelteKit

SvelteKit provides a similar hybrid static/SSR model to Next.js with a lighter runtime bundle. Supabase Auth has official SvelteKit examples.

Pros:

- Lighter client runtime than React
- Clean SSR/static split with `+page.server.ts` pattern

Cons:

- Smaller ecosystem and fewer production examples for auth + file-delivery patterns
- Svelte knowledge is less common than React, increasing hiring/maintainability risk
- No equivalent to `next/image` — requires Cloudinary or custom image pipeline

-----

## Decision

**Chosen: Option A — Next.js 14 App Router**

Next.js 14 is the only option that handles all three surfaces (static marketing, static blog, SSR portal) within a single, well-integrated deployment unit without architectural compromise. The `next/image` component directly addresses the photography site's most critical performance constraint. Supabase's own `@supabase/ssr` package is explicitly built for Next.js App Router middleware-based session handling, making auth integration first-class rather than bolted on. Astro would have been the better choice if the portal did not exist — but adding auth-gated SSR to Astro introduces more complexity than using Next.js in a hybrid mode. Vercel deployment maximizes the value of the Next.js choice and aligns with zero-config preview environments.

-----

## Consequences

```
POSITIVE:
  - All three surfaces deployed as a single Next.js app on Vercel — one pipeline, one domain, no CORS complexity
  - next/image handles responsive images, WebP conversion, and lazy loading automatically
  - App Router middleware enforces auth boundaries at the edge before any DB query
  - React Server Components default reduces client JS on public pages
  - Supabase @supabase/ssr provides a first-class cookie-based session pattern

NEGATIVE:
  - React dependency means even static pages carry React runtime overhead (mitigated by RSC)
  - App Router is a newer pattern — frontend agent must understand RSC vs. client component boundary
  - Vendor alignment with Vercel; self-hosting is possible but less ergonomic

RISKS:
  - App Router is still evolving; Next.js 15 brought breaking changes in caching defaults.
    Mitigation: Pin to Next.js 14.x until 15.x is stable; track release notes.
  - next/image requires configuration for external image domains; misconfiguration could expose SSRF.
    Mitigation: Explicit domain allowlist in next.config.js; no wildcard hostnames.

REVISIT WHEN:
  - Portal user base exceeds 500 concurrent sessions — evaluate edge runtime or separate API service.
  - Astro reaches full SSR parity with mature auth ecosystem — static-heavy pages may benefit from migration.
```

-----

## Privacy by Design Assessment *(GDPR Art. 25)*

```
PERSONAL DATA INVOLVED: YES
  The framework renders pages that collect (contact form) and display (portal) personal data.

[x] Data Minimisation   — RSC renders pages server-side; no personal data in client bundles
[x] Purpose Limitation  — framework does not introduce additional data collection beyond defined endpoints
[x] Storage Limitation  — no session persistence beyond Supabase-managed cookie lifetime (see ADR-002)
[x] Privacy by Default  — non-essential cookies/analytics blocked by consent layer before framework hydrates
[x] Data Portability    — not applicable to framework layer; handled at data model level
[x] Access Control      — middleware enforces auth before any server component handling personal data renders

GAPS IDENTIFIED:
  [x] None

DPIA REQUIRED: NO
  Rationale: Framework choice does not independently trigger DPIA. Data processing
  volume for a single-photographer business is not large-scale (Art. 35 threshold).
```
