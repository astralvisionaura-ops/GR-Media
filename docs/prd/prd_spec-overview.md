# prd_spec-overview.md

# docs/prd/prd_spec-overview.md | Product Requirements Document (PRD) Overview

-----

## [CONTEXT]

INHERITS:   _prd-base.md
PHASE:      SPECIFICATION — required before GATE-02
AUDIENCE:   Instructor, stakeholders, all agents

-----

## [SECTION] document-header

```
PROJECT:        GR-Media
VERSION:        1.0.0
STATUS:         FINAL
DATE:           2026-03-13
AUTHOR:         Instructor
CLASS:          2
```

-----

## [SECTION] executive-summary

**Project:** GR-Media — Photography Business Website Rebuild
**Vision:** A modern, visually stunning web presence for GR Media that converts visiting prospects into photography clients through an immersive portfolio experience and a secure client portal.
**Problem statement:** The existing website no longer reflects the quality and range of GR Media's work. Potential clients arrive but do not stay — the site lacks the visual impact and functionality (blog, client portal) needed to generate leads and build client relationships.
**Success definition:** The new site launches with measurable improvements in visitor engagement (time on site, inquiry conversions), includes a working client portal for existing clients, and scores green on Core Web Vitals.

-----

## [SECTION] target-audience

**Primary users:** Prospective photography clients — individuals and couples seeking photographers for weddings, portrait sessions, and commercial work. They are comparing options online and make decisions based on visual impression and ease of contact.
**Secondary stakeholders:** Social media managers and referral partners who embed or share GR Media content to generate leads. GR Media owner/photographer (portal admin).
**User context:** Users arrive via social media, referrals, or organic search. They browse on mobile and desktop. Their key question on arrival: "Is this photographer's style right for me?" They want to see work fast, understand pricing/services, and contact easily.

-----

## [SECTION] scope-definition

**In Scope (Class 2):**
- Full website rebuild: homepage, portfolio/gallery, services, about, contact
- Blog (content marketing, SEO)
- Client portal (login, secure photo delivery / file access)
- GDPR-compliant contact form and cookie consent
- Mobile-first responsive design based on GR Media brand schema
- Privacy policy and legal pages

**Out of Scope (explicitly excluded):**
- E-commerce / online booking / payment processing (deferred)
- CRM integration (deferred)
- Advanced analytics dashboard (deferred)
- Multi-language support (deferred)

**Assumptions:**
- Brand assets (logo, color schema, design konfigurator) will be provided by client before implementation begins
- Content (copy, photography) will be provided by client or derived from existing site screenshots
- Hosting infrastructure is greenfield — no legacy system migration required

-----

## [SECTION] success-metrics

| Metric | Target | Measurement method |
|--------|--------|--------------------|
| Core Web Vitals — LCP | < 2.5s | Lighthouse CI / PageSpeed Insights |
| Core Web Vitals — CLS | < 0.1 | Lighthouse CI |
| Mobile performance score | ≥ 90 | Lighthouse CI |
| Contact form conversion | Baseline established at launch | Analytics event |
| GDPR compliance | Zero cookie/tracking violations | Manual audit + browser inspector |

-----

## [SECTION] constraints

**Technical constraints:** Native web languages preferred (HTML/CSS/JS); framework selection guided by T1 best practices (Astro or Next.js 14). No legacy system dependencies.
**Business constraints:** No hard deadline or budget limit stated. Quality over speed — professional, stable, best-practices-first.
**Non-negotiable requirements:** GDPR compliance (cookie consent, privacy policy, data minimization on forms); EAA accessibility baseline (effective June 2025); Core Web Vitals green on launch.

-----

## [SECTION] brand-notes

- Design schema: `brand/gr-media-konfigurator.html` (to be created/provided)
- Logo: `brand/assets/image-384x257.png` (to be created/provided)
- Existing site content reference: `brand/screenshots/` (to be created/provided)
- Visual tone: immersive, high-quality imagery; visitor should feel compelled to stay and explore

-----

## [SECTION] open-questions

All questions resolved. No open items.

| Question | Resolution | ADR |
|----------|-----------|-----|
| Brand assets (konfigurator, logo, screenshots) | Provided in `brand/` directory before implementation | — |
| CMS for blog? | No CMS — Git/Markdown, code-managed | ADR-003 |
| Client portal content? | Galleries (photos) + Documents (invoices, contracts) | ADR-004 |
| Hosting provider? | Vercel (CDN + SSR) + Supabase Cloud (Auth, DB, Storage) EU region | ADR-001/002 |

-----

## [SECTION] approval

```
Reviewed by:   Instructor
Approved by:   Instructor
Approval date: 2026-03-13
Next review:   GATE-04 (before production deployment)
```
