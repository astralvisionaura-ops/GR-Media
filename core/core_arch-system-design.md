# core_arch-system-design.md

# core/core_arch-system-design.md | System Architecture

-----

## [CONTEXT]

INHERITS:   —
PHASE:      SPECIFICATION — written by architecture agent
AUDIENCE:   all agents
OWNED BY:   agent_spec-architecture.md

-----

## [SECTION] overview

```
PROJECT:        GR-Media
VERSION:        1.1.0
STATUS:         FINAL
LAST UPDATED:   2026-03-13
AUTHOR:         agent-architecture
```

This document is the architectural source of truth for GR-Media.
API contracts in #api-contracts are binding for all implementation agents.
Infrastructure topology in #infrastructure is binding for the infra agent.
Any deviation from this document after GATE-01 requires a new ADR and Instructor approval.

-----

## [SECTION] architectural-decisions

Summary of key decisions. Full rationale in docs/adr/.

```
DECISION:   Next.js 14 App Router as the single framework for public site, blog, and portal
ADR:        adr_decision-001-framework-selection.md
STATUS:     ACCEPTED

DECISION:   Supabase for authentication, PostgreSQL database, and object storage
ADR:        adr_decision-002-auth-and-database.md
STATUS:     ACCEPTED

DECISION:   Git/Markdown blog — no CMS, posts are .md files committed to the repository
ADR:        adr_decision-003-blog-strategy.md
STATUS:     ACCEPTED

DECISION:   Client file delivery via Supabase Storage private buckets with signed URLs
ADR:        adr_decision-004-file-delivery.md
STATUS:     ACCEPTED
```

-----

## [SECTION] system-overview

```
COMPONENTS:
  public-site         Static Next.js pages: homepage, portfolio, services, about, contact
  blog-engine         Statically generated from /content/blog/*.md files at build time
  client-portal       SSR Next.js pages behind auth middleware: gallery view, file download
  auth-layer          Supabase Auth — email/password, session cookies managed by @supabase/ssr
  api-routes          Next.js Route Handlers — signed URL generation, contact form, portal data
  database            Supabase PostgreSQL — users, galleries, documents; RLS enforced
  object-storage      Supabase Storage — private bucket (client files) + public bucket (portfolio)
  consent-layer       Cookie consent banner — blocks all non-essential scripts until consent given

INTERACTIONS:
  browser           → public-site:      Static HTML/CSS/JS served from Vercel CDN edge
  browser           → blog-engine:      Static HTML served from Vercel CDN edge
  browser           → auth-layer:       Login/logout via Supabase Auth JS + cookie session
  browser           → client-portal:    SSR requests authenticated by Next.js middleware
  client-portal     → api-routes:       Fetch signed URLs for files, fetch gallery metadata
  api-routes        → database:         Read gallery/document metadata (RLS-enforced)
  api-routes        → object-storage:   Generate signed URLs for private bucket objects
  contact-form      → api-routes:       POST /api/contact — validated, rate-limited, email dispatch
  build-pipeline    → blog-engine:      Next.js reads /content/blog/*.md at build time (fs API)
  vercel-ci         → vercel-edge:      Deploy on every Git push to main

EXTERNAL DEPENDENCIES:
  Supabase Cloud     Auth, PostgreSQL, and Storage (EU Frankfurt region — eu-central-1)
  Vercel             Hosting, CDN, preview environments, Lighthouse CI
  Email provider     Transactional email for contact form delivery (Resend recommended — EU-friendly)
```

-----

## [SECTION] component-detail

### Public Site

Next.js static pages (`generateStaticParams` or default static export). No authentication required. Rendered at build time; revalidation triggered by Vercel deploy webhook. Image-heavy pages use `next/image` for automatic WebP conversion, responsive srcsets, and lazy loading.

Page map:
```
/                     Homepage — hero, featured portfolio, CTA
/portfolio            Gallery index — category grid
/portfolio/[category] Category gallery — image grid with lightbox
/services             Services + pricing overview
/about                Photographer bio + approach
/contact              GDPR-compliant contact form
/privacy              Privacy policy (static)
/imprint              Imprint/legal notice (static — required by German TMG)
```

### Blog Engine

Static generation from `/content/blog/[slug].md` files using `gray-matter` for frontmatter parsing. Posts rendered with `next-mdx-remote` or `@next/mdx`. Sitemap generated at build time. No database queries — zero runtime dependency.

```
/blog                 Blog index — list of posts ordered by date
/blog/[slug]          Individual post — markdown rendered to HTML
```

Frontmatter schema (per post):
```
title:        string    — required
slug:         string    — required (URL path segment)
date:         ISO date  — required
excerpt:      string    — required (used in meta description + index card)
coverImage:   string    — Supabase Storage URL or relative /public path
tags:         string[]  — optional
draft:        boolean   — if true, excluded from build output
```

### Client Portal

SSR pages protected by Next.js App Router middleware. Middleware runs at the edge before any server component renders; unauthenticated requests are redirected to `/portal/login`.

```
/portal/login         Login page (Supabase Auth UI or custom form)
/portal               Dashboard — list of galleries + recent documents
/portal/galleries/[id] Gallery view — thumbnail grid, signed URLs, download button
/portal/documents     Document list — invoices + contracts
/portal/documents/[id] Document view — signed URL for PDF, download
```

### Auth Layer

Supabase Auth with `@supabase/ssr`. Session stored in an httpOnly cookie (set by the Next.js middleware). No JWT in `localStorage`. Token refresh handled automatically by the SSR package.

```
Auth flow:
  1. Client submits email + password to /portal/login
  2. Next.js API route calls supabase.auth.signInWithPassword()
  3. Supabase returns session → SSR package sets httpOnly session cookie
  4. Middleware reads cookie on every /portal/** request
  5. Invalid/expired session → redirect to /portal/login
  6. Logout: supabase.auth.signOut() → cookie cleared
```

### API Routes (Route Handlers)

All authenticated API routes verify the session via the Supabase SSR client before any database or storage operation. RLS provides a second enforcement layer.

```
POST /api/contact                  Contact form submission (public, rate-limited)
GET  /api/portal/galleries         List galleries for authenticated client
GET  /api/portal/galleries/[id]    Gallery metadata + signed thumbnail URLs
GET  /api/portal/galleries/[id]/download/[imageId]  Signed URL for full-res download
GET  /api/portal/documents         List documents for authenticated client
GET  /api/portal/documents/[id]/download  Signed URL for document PDF download
```

### Image Delivery Strategy

```
PUBLIC PORTFOLIO IMAGES:
  Storage: Supabase Storage — public bucket (portfolio-assets)
  Delivery: Served via Supabase CDN (Cloudflare) with public URLs
  Optimization: next/image wraps all portfolio image URLs for:
    - Automatic WebP conversion
    - Responsive srcsets (sizes prop per breakpoint)
    - Lazy loading (below-fold images)
    - Priority loading (hero + above-fold LCP candidates)
  Target: LCP < 2.5s on 4G (NFR-001)

CLIENT GALLERY IMAGES:
  Storage: Supabase Storage — private bucket (client-files)
  Browse view: Pre-computed thumbnails (600px wide) — signed URL, 1h expiry
  Download: Full-resolution originals — signed URL, 5min expiry
  Thumbnail generation: Server-side at upload time via API route (sharp library)

BLOG IMAGES:
  Storage: Supabase Storage — public bucket (portfolio-assets/blog/) or /public/blog/
  Delivery: next/image with static import or remote URL pattern
```

-----

## [SECTION] api-contracts

Binding for frontend and backend agents. Any deviation requires Schema Change Protocol and Instructor sign-off.

---

```
ENDPOINT: POST /api/contact
AUTH:     none (public)
REQUEST:
  Body: {
    "name":    string — required — sender display name (max 100 chars)
    "email":   string — required — sender email address (valid RFC 5321)
    "message": string — required — inquiry text (max 2000 chars)
    "consent": boolean — required — must be true; explicit GDPR consent
    "honeypot": string — optional — spam filter field; must be empty string
  }
RESPONSE (200):
  {
    "success": true
  }
RESPONSE (400):
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "One or more fields are invalid.",
      "fields": { "[field]": "[reason]" }
    }
  }
RESPONSE (429):
  {
    "error": {
      "code": "RATE_LIMITED",
      "message": "Too many requests. Please try again later."
    }
  }
STATUS CODES: 200, 400, 422, 429, 500
RATE LIMIT:   5 requests per IP per hour
NOTES:        consent must equal true — reject if false. Do not store contact form data
              in the database. Email dispatch only. honeypot field must be empty (bot detection).
```

---

```
ENDPOINT: GET /api/portal/galleries
AUTH:     required — Supabase session cookie (httpOnly)
REQUEST:
  No body. Session cookie provides client identity.
RESPONSE (200):
  {
    "galleries": [
      {
        "id":           string (UUID),
        "name":         string,
        "description":  string | null,
        "coverThumb":   string (signed URL, 1h expiry),
        "imageCount":   number,
        "createdAt":    string (ISO 8601)
      }
    ]
  }
RESPONSE (401):
  { "error": { "code": "UNAUTHORIZED", "message": "Authentication required." } }
STATUS CODES: 200, 401, 500
RATE LIMIT:   60 requests per session per hour
```

---

```
ENDPOINT: GET /api/portal/galleries/[id]
AUTH:     required — Supabase session cookie
REQUEST:
  Path param: id (UUID)
RESPONSE (200):
  {
    "gallery": {
      "id":          string (UUID),
      "name":        string,
      "description": string | null,
      "createdAt":   string (ISO 8601)
    },
    "images": [
      {
        "id":        string (UUID),
        "filename":  string,
        "thumbUrl":  string (signed URL, 1h expiry),
        "width":     number,
        "height":    number,
        "sortOrder": number
      }
    ]
  }
RESPONSE (401):
  { "error": { "code": "UNAUTHORIZED", "message": "Authentication required." } }
RESPONSE (403):
  { "error": { "code": "FORBIDDEN", "message": "Gallery does not belong to this client." } }
RESPONSE (404):
  { "error": { "code": "NOT_FOUND", "message": "Gallery not found." } }
STATUS CODES: 200, 401, 403, 404, 500
RATE LIMIT:   60 requests per session per hour
```

---

```
ENDPOINT: GET /api/portal/galleries/[id]/download/[imageId]
AUTH:     required — Supabase session cookie
REQUEST:
  Path params: id (gallery UUID), imageId (image UUID)
RESPONSE (200):
  {
    "url":       string (signed URL, 5min expiry),
    "filename":  string,
    "expiresAt": string (ISO 8601)
  }
RESPONSE (401):
  { "error": { "code": "UNAUTHORIZED", "message": "Authentication required." } }
RESPONSE (403):
  { "error": { "code": "FORBIDDEN", "message": "Image does not belong to this client." } }
RESPONSE (404):
  { "error": { "code": "NOT_FOUND", "message": "Image not found." } }
STATUS CODES: 200, 401, 403, 404, 500
RATE LIMIT:   200 signed URL requests per session per hour
NOTES:        URL expires in 5 minutes. Client must use URL immediately. Do not cache response.
```

---

```
ENDPOINT: GET /api/portal/documents
AUTH:     required — Supabase session cookie
REQUEST:
  No body. Optional query: ?type=invoice|contract|other
RESPONSE (200):
  {
    "documents": [
      {
        "id":          string (UUID),
        "name":        string,
        "type":        "invoice" | "contract" | "other",
        "filesize":    number (bytes),
        "createdAt":   string (ISO 8601)
      }
    ]
  }
RESPONSE (401):
  { "error": { "code": "UNAUTHORIZED", "message": "Authentication required." } }
STATUS CODES: 200, 401, 500
RATE LIMIT:   60 requests per session per hour
```

---

```
ENDPOINT: GET /api/portal/documents/[id]/download
AUTH:     required — Supabase session cookie
REQUEST:
  Path param: id (document UUID)
RESPONSE (200):
  {
    "url":       string (signed URL, 5min expiry),
    "filename":  string,
    "expiresAt": string (ISO 8601)
  }
RESPONSE (401):
  { "error": { "code": "UNAUTHORIZED", "message": "Authentication required." } }
RESPONSE (403):
  { "error": { "code": "FORBIDDEN", "message": "Document does not belong to this client." } }
RESPONSE (404):
  { "error": { "code": "NOT_FOUND", "message": "Document not found." } }
STATUS CODES: 200, 401, 403, 404, 500
RATE LIMIT:   60 requests per session per hour
NOTES:        URL expires in 5 minutes. Same expiry policy as image downloads.
```

-----

## [SECTION] infrastructure

```
ARCHITECTURE PATTERN:
  Jamstack with SSR island: static generation for public surfaces (CDN-served),
  server-side rendering for portal (Vercel serverless functions at edge).
  Single Next.js deployment unit on Vercel.

COMPONENTS:
  Vercel Edge Network    CDN + serverless runtime       Hobby/Pro plan    Auto-scales
  Supabase Cloud         Auth + PostgreSQL + Storage    Pro plan (EU)     Managed
  Email (Resend)         Transactional email dispatch   Starter plan      Managed

DATA FLOWS:
  Public pages:
    Browser → Vercel CDN → Cached static HTML (build artifact)
    Images  → next/image proxy → Supabase CDN (public bucket) or local /public/

  Blog:
    Browser → Vercel CDN → Cached static HTML (built from /content/blog/*.md)

  Client portal:
    Browser → Vercel Edge → Next.js middleware (auth check via Supabase session cookie)
            → Server Component render → Supabase PostgreSQL (RLS query)
            → API route → Supabase Storage (signed URL generation)
            → Signed URL → Browser → Supabase CDN (time-limited, private object)

  Contact form:
    Browser → POST /api/contact → Validation → Resend API → Email to photographer

NETWORKING:
  All traffic: HTTPS only (TLS 1.2 minimum, TLS 1.3 preferred)
  Domain: managed via Vercel DNS or external registrar with Vercel nameservers
  Supabase: accessed from Vercel serverless functions over HTTPS (not exposed to browser directly for writes)
  Supabase service role key: server-side only — never in client bundles

SECRETS MANAGEMENT:
  NEXT_PUBLIC_SUPABASE_URL        — public (embedded in client bundle, safe)
  NEXT_PUBLIC_SUPABASE_ANON_KEY   — public (embedded in client bundle, safe — RLS is the guard)
  SUPABASE_SERVICE_ROLE_KEY       — server-side only (Vercel env var, never exposed to browser)
  RESEND_API_KEY                  — server-side only (Vercel env var)
  Vercel environment variables UI used for all secrets.
  No secrets in .env files committed to Git.
```

-----

## [SECTION] security-architecture

```
AUTHENTICATION:
  Protocol:     Supabase Auth — email + password with bcrypt hashing
  Session:      httpOnly cookie set by @supabase/ssr middleware
  Token type:   Supabase JWT (RS256) — verified server-side on every /portal/** request
  Token expiry: 1 hour (access token); 7 days (refresh token, rotated on use)
  Storage:      httpOnly, Secure, SameSite=Lax cookie — no localStorage, no sessionStorage
  MFA:          TOTP available via Supabase Auth (recommended for admin account)

AUTHORIZATION:
  Model:        Owner-based (ABAC) — every resource row has a client_user_id FK
  Enforcement:  Two layers:
    Layer 1 — Next.js middleware: redirects unauthenticated requests before server render
    Layer 2 — Supabase RLS: WHERE auth.uid() = client_user_id on all portal queries
  Admin access: Supabase service role key (server-only) used for admin operations in API routes
  Cross-client isolation: enforced at DB layer; API routes also validate ownership explicitly

TRANSPORT:
  Minimum TLS:  1.2 (Vercel default); TLS 1.3 served where browser supports it
  Certificate:  Managed by Vercel (Let's Encrypt, auto-renewal)
  HSTS:         Enabled via Vercel headers config (max-age=31536000; includeSubDomains)

ENCRYPTION AT REST:
  Scope:        All Supabase PostgreSQL data + Supabase Storage objects
  Algorithm:    AES-256 (managed by Supabase/AWS; not application-layer)
  Note:         No application-layer encryption of individual fields — not required
                for this data classification. Revisit if health/sensitive personal data added.

INPUT VALIDATION:
  Strategy:     Zod schema validation on all API route inputs (server-side)
  Contact form: Validated server-side before email dispatch; honeypot field for bot detection
  File uploads: Type + size validation on API route before Supabase Storage write
  Portal queries: All user-supplied IDs validated as UUIDs before DB query

CONTENT SECURITY:
  CSP headers:  Configured in next.config.js — restrict script-src, frame-src
  Cookie consent: All analytics/third-party scripts blocked until explicit consent (FR-005)
  CSRF:         SameSite=Lax cookie provides CSRF protection for same-origin requests

PUBLIC ZONE vs. AUTHENTICATED ZONE:
  Public  (/*, /blog/*, /portfolio/*, /services, /about, /contact, /privacy, /imprint)
    — No auth required
    — No personal data in response
    — Static HTML from CDN where possible
  Authenticated (/portal/**)
    — Auth required — middleware enforces before any render
    — All DB queries RLS-scoped to auth.uid()
    — Signed URLs for all file access; no public storage URLs in portal responses
```

-----

## [SECTION] scalability-design

```
BOTTLENECKS IDENTIFIED:
  Image delivery         Portfolio pages load many large images
                         Mitigation: next/image lazy loading + WebP + responsive srcsets;
                         above-fold images marked priority; Supabase CDN for public assets
  Signed URL generation  Gallery pages with 100+ images each require N signed URL calls
                         Mitigation: Batch signed URL generation per gallery load (single
                         API call returns all thumb URLs); cache thumb URLs client-side
                         for 1h session duration
  Supabase connection    Serverless functions create new DB connections per invocation
                         Mitigation: Supabase connection pooling (PgBouncer) enabled
                         on Pro plan; not a concern at current scale

HORIZONTAL SCALING:
  Public pages:   Auto-scale via Vercel CDN — no server-side work
  Blog:           Auto-scale via Vercel CDN — fully static
  Portal SSR:     Vercel serverless functions scale automatically per invocation
  Database:       Supabase managed PostgreSQL — vertical scaling via plan upgrade
  Storage:        Supabase Storage scales automatically

CACHING STRATEGY:
  Public pages:   Vercel CDN — immutable cache on build artifacts; revalidated on deploy
  Blog posts:     Vercel CDN — same immutable cache; rebuild on Git push
  Portfolio images: Supabase CDN (Cloudflare) — public bucket objects cached at CDN edge
  Portal pages:   No CDN caching — SSR with auth; per-user content
  Signed URLs:    Not cached server-side — generated fresh per request
  Thumb URLs:     Client-side: 1h cookie/state cache within portal session

ASYNC PATTERNS:
  Thumbnail generation:  Server-side via API route triggered at file upload
                         (synchronous for now; move to Supabase Edge Function if latency increases)
  Email dispatch:        Synchronous via Resend API (< 200ms expected); acceptable for contact form
  No message queue required at current scale.
```

-----

## [SECTION] responsive-design

Full-responsive is a first-class design constraint for all surfaces (public site, blog, client portal).

```
STRATEGY:       Mobile-first — default styles target mobile, progressive enhancement for larger viewports
FRAMEWORK:      Tailwind CSS breakpoint system (matches Next.js 14 convention)

BREAKPOINTS:
  sm    640px    Large smartphones (landscape)
  md    768px    Tablets (portrait)
  lg    1024px   Tablets (landscape) / small laptops
  xl    1280px   Desktop
  2xl   1536px   Large desktop / wide screens

LAYOUT RULES:
  Navigation:     Hamburger menu on < md; horizontal nav on ≥ md
  Portfolio grid: 1 column on xs–sm; 2 columns on md; 3–4 columns on lg+
  Blog index:     Single column on xs–sm; 2 columns on md+
  Client portal:  Single column on xs–sm; sidebar layout on lg+
  Typography:     Fluid type scale — clamp() for headings, minimum 16px body text
  Touch targets:  Minimum 44×44px for all interactive elements (WCAG 2.5.5 / EAA 2025)

IMAGE RESPONSIVE CONTRACT:
  All <Image> components must declare sizes prop matching the layout breakpoints above.
  Example for portfolio grid:
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  next/image generates responsive srcsets automatically from sizes prop.
  Hero images: priority={true} + full-width sizes prop.

TESTING:
  Viewport breakpoints tested: 375px (iPhone SE), 390px (iPhone 14), 768px (iPad),
                                1024px (iPad landscape), 1280px (desktop), 1920px (wide)
  Tools: Chrome DevTools device emulation; Vercel preview environments
```

-----

## [SECTION] local-development

Local development environment for full-stack testing before Vercel deployment.

```
STACK:
  Next.js dev server    npm run dev → http://localhost:3000
  Supabase local        Supabase CLI → local PostgreSQL + Auth + Storage emulator

REQUIREMENTS:
  Node.js       ≥ 20 LTS
  npm           ≥ 10
  Supabase CLI  ≥ 1.x  (npm install -g supabase or brew install supabase/tap/supabase)
  Docker        required by Supabase CLI for local PostgreSQL container

SETUP STEPS:
  1. Clone repo and install dependencies:
       git clone <repo> gr-media && cd gr-media
       npm install

  2. Initialize Supabase local environment:
       supabase init          # creates supabase/ config directory (first time only)
       supabase start         # starts local PostgreSQL + Auth + Storage on Docker
       # outputs: DB URL, anon key, service role key — copy to .env.local

  3. Create .env.local (gitignored — never commit):
       NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
       NEXT_PUBLIC_SUPABASE_ANON_KEY=<from supabase start output>
       SUPABASE_SERVICE_ROLE_KEY=<from supabase start output>
       RESEND_API_KEY=re_test_xxx   # use Resend test key or stub

  4. Apply schema migrations:
       supabase db reset              # applies all migrations in supabase/migrations/
       # OR on first setup:
       supabase migration new initial_schema
       # paste schema from core_arch-data-model.md into the migration file

  5. Start Next.js dev server:
       npm run dev
       # → http://localhost:3000

LOCAL SERVICES:
  Next.js app         http://localhost:3000
  Supabase Studio     http://localhost:54323   (local DB admin UI)
  Supabase Auth       http://localhost:54321   (GoTrue emulator)
  Supabase Storage    http://localhost:54321   (Supabase Storage emulator)
  Inbucket (email)    http://localhost:54324   (catches all test emails locally)

EMAIL TESTING:
  Supabase local routes all auth emails (magic links, password reset) to Inbucket.
  Contact form (Resend): use RESEND_API_KEY=re_test_xxx — Resend test mode returns
  success without actually sending. Or mock the Resend call in development.

SEED DATA:
  supabase/seed.sql — create a seed file with:
    - 1 admin user row in public.admins
    - 1–2 test client_profiles
    - Sample galleries + gallery_images (using placeholder storage paths)
    - Sample documents
  Run: supabase db reset   (resets + reapplies migrations + seed)

STOPPING LOCAL SERVICES:
  supabase stop             # stops Docker containers, preserves data
  supabase stop --no-backup # stops + wipes local DB (clean slate)

ENVIRONMENT PARITY:
  .env.local    → local development (Supabase local)
  .env.preview  → Vercel preview environments (Supabase cloud, separate project)
  Production    → Vercel environment variables UI (never in .env files in Git)
```

-----

## [SECTION] open-questions

No open architectural questions. Architecture is FINAL pending GATE-01 review.

All questions from prd_spec-overview.md and prd_spec-requirements.md have been resolved:
- Blog strategy: Git/Markdown (ADR-003)
- Client portal content: galleries + invoices + contracts (ADR-004)
- Framework: Next.js 14 App Router (ADR-001)
- Auth + DB: Supabase (ADR-002)
- Hosting: Vercel (documented above)
