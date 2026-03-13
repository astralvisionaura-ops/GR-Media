# prd_spec-requirements.md

# docs/prd/prd_spec-requirements.md | Product Requirements

-----

## [CONTEXT]

INHERITS:   _prd-base.md
PHASE:      SPECIFICATION
AUDIENCE:   Instructor, requirements agent, architecture agent

-----

## [SECTION] document-header

```
PROJECT:        GR-Media
VERSION:        0.1.0
STATUS:         DRAFT
DATE:           2026-03-13
DERIVED FROM:   prd_spec-overview.md v0.1.0
```

-----

## [SECTION] functional-requirements

```
FR-001
TITLE:       Website Rebuild — Core Web Presence
PRIORITY:    MUST
STATEMENT:   The system must deliver a fully reworked, publicly accessible website
             with homepage, portfolio/gallery, services, about, and contact pages
             so that prospective clients can discover and evaluate GR Media's work.
RATIONALE:   This is the primary lead-generation surface; everything else depends on it.
ACCEPTANCE:  All pages render correctly on mobile and desktop, pass Lighthouse ≥ 90
             performance score, and match the approved brand design schema.
```

```
FR-002
TITLE:       Blog
PRIORITY:    MUST
STATEMENT:   The system must provide a blog section with individual post pages
             so that GR Media can publish content to attract organic search traffic
             and demonstrate expertise.
RATIONALE:   Blog is listed as a required new feature alongside the portal.
ACCEPTANCE:  Blog index and individual post pages render correctly; posts are
             indexable by search engines (sitemap, structured data).
```

```
FR-003
TITLE:       Client Portal — Secure Access
PRIORITY:    MUST
STATEMENT:   The system must provide an authenticated client portal where
             individual clients can log in and access their private deliverables
             (photo galleries, files) so that GR Media can securely deliver work.
RATIONALE:   Core differentiator vs. the existing site; direct client value.
ACCEPTANCE:  Clients can register/login, view only their own content, and
             download files. Unauthorized access to other clients' content
             is blocked at the API level.
```

```
FR-004
TITLE:       GDPR-Compliant Contact Form
PRIORITY:    MUST
STATEMENT:   The system must provide a contact/inquiry form with explicit consent
             checkbox and minimal data collection so that GR Media complies with
             GDPR requirements for processing personal data.
RATIONALE:   Contact form collects personal data; GDPR mandates consent and
             data minimization.
ACCEPTANCE:  Form requires explicit consent before submission; no data sent to
             third parties without consent; privacy policy linked inline.
```

```
FR-005
TITLE:       Cookie Consent Banner
PRIORITY:    MUST
STATEMENT:   The system must display a cookie consent banner on first visit that
             blocks all non-essential cookies/tracking until the user consents
             so that the site is GDPR-compliant from day one.
RATIONALE:   GDPR Article 7 — consent required before analytics or tracking fires.
ACCEPTANCE:  No analytics or third-party scripts load before consent is given;
             user can reject all non-essential cookies; consent is remembered.
```

-----

## [SECTION] non-functional-requirements

```
NFR-001
TITLE:       Core Web Vitals — Performance
CATEGORY:    PERFORMANCE
STATEMENT:   LCP must be < 2.5s and CLS must be < 0.1 on mobile (4G simulation)
             as measured by Lighthouse CI on every deployment.
RATIONALE:   Photography sites are image-heavy; performance directly affects
             SEO ranking and bounce rate.
```

```
NFR-002
TITLE:       Accessibility Baseline
CATEGORY:    COMPLIANCE
STATEMENT:   All public pages must meet WCAG 2.1 AA conformance,
             required by the European Accessibility Act (EAA, effective June 2025).
RATIONALE:   GR Media operates in the EU; EAA applies to public-facing websites
             of service providers.
```

```
NFR-003
TITLE:       Secure Authentication — Client Portal
CATEGORY:    SECURITY
STATEMENT:   Client portal authentication must use industry-standard secure auth
             (e.g., Supabase Auth / Auth.js) with password hashing, HTTPS-only
             sessions, and CSRF protection.
RATIONALE:   Portal stores client-specific deliverables — unauthorized access
             is a significant trust and legal risk.
```

-----

## [SECTION] user-stories

```
US-001
AS A:        Prospective wedding photography client
I WANT TO:   Browse a visually rich portfolio organized by category
SO THAT:     I can quickly assess whether GR Media's style matches my vision
LINKED TO:   FR-001
```

```
US-002
AS A:        Existing GR Media client
I WANT TO:   Log into a private portal and download my wedding photos
SO THAT:     I can access my deliverables without using WeTransfer or email links
LINKED TO:   FR-003
```

-----

## [SECTION] constraints

```
CON-001
TYPE:        REGULATORY
STATEMENT:   The site must comply with GDPR from launch — no personal data
             collected or processed without a lawful basis.
SOURCE:      Client-PRD "The Sensitivity" + EU law
```

```
CON-002
TYPE:        TECHNICAL
STATEMENT:   Build on native or near-native web technologies; no heavy framework
             lock-in without justification.
SOURCE:      Client-PRD "The Landscape" — "native languages"
```

```
CON-003
TYPE:        BUSINESS
STATEMENT:   Quality and stability over speed — no fast-ship shortcuts.
SOURCE:      Client-PRD "Anything Else"
```

-----

## [SECTION] prioritization-rationale

```
All five MUST requirements represent the minimum viable scope: without the
reworked website (FR-001), there is nothing to ship. Blog (FR-002) and client
portal (FR-003) are the two explicitly requested new features. GDPR compliance
(FR-004, FR-005) is non-negotiable given EU jurisdiction and personal data
handling. Performance (NFR-001) and accessibility (NFR-002) are gated by
client expectations and legal requirements respectively. E-commerce, booking,
and CRM integrations are deferred — they were not mentioned as immediate needs
and would significantly expand scope.
```

-----

## [SECTION] open-items

```
OI-001
QUESTION:    What content will the client portal expose? (photo galleries only,
             or also invoices, contracts, shoot briefs?)
IMPACT:      FR-003 data model, storage requirements, GDPR data inventory
OWNER:       Instructor
DEADLINE:    Before GATE-01
STATUS:      OPEN
```

```
OI-002
QUESTION:    Will a CMS be used for blog authoring, or will posts be
             code/markdown-managed (Git-based)?
IMPACT:      Architecture decision — CMS adds backend complexity vs. Git-based
             is simpler but requires technical skills to publish
OWNER:       Instructor
DEADLINE:    Before GATE-01
STATUS:      OPEN
```
