# CHANGELOG.md

# docs/changelog/CHANGELOG.md | Product Changelog

-----

## Format

This changelog follows [Keep a Changelog](https://keepachangelog.com) conventions.
Versions follow Semantic Versioning: MAJOR.MINOR.PATCH

```
MAJOR:  Breaking change — incompatible API or data change
MINOR:  New feature — backward compatible
PATCH:  Bug fix or minor improvement — backward compatible
```

-----

## [Unreleased]

Changes staged for next release:

### Added

- [feature or capability added]

### Changed

- [change to existing functionality]

### Deprecated

- [feature marked for removal in future release]

### Removed

- [feature removed]

### Fixed

- [bug fixed]

### Security

- [security vulnerability patched]

-----

## Template Version History

```
v2.0.0   [YYYY-MM-DD]   Initial release of Master Template Version 2
                         Complete redesign with 69 files, progressive context loading,
                         team-first workflow, compliance intelligence layer,
                         domain slots, section loading, and four project classes.
```

-----

## Product Version History

```
## [0.2.0-alpha] — 2026-03-13

### Added
- Next.js 14.2.35 project scaffold (src/ App Router, TypeScript, Tailwind CSS)
- Tailwind design tokens from brand konfigurator (colors, fonts, radius)
- Supabase integration: client.ts, server.ts, middleware with /portal/** protection
- Contact form API route (POST /api/contact) with Zod validation + rate limiting
- Supabase schema migration: 7 tables (admins, client_profiles, galleries,
  gallery_images, documents, blog_post_meta, contact_submissions) — full RLS
- Local dev setup: supabase/config.toml, migrations, seed.sql
- .env.local.example with all required env vars
- GATE-01 PASS (Architecture Review), GATE-02 PASS (Scope Confirmation)
- Phase: IMPLEMENTATION

## [0.1.0-alpha] — 2026-03-13

### Added
- Project initialized: GR-Media
- Class 2 assigned, Domain: web-saas, Phase: SPECIFICATION
- prd_spec-overview.md FINAL
- Compliance findings: GDPR (HIGH), EAA 2025 (HIGH)
```

[Example:]

```
## [1.0.0] — YYYY-MM-DD

### Added
- Initial release
- [key features]

### Security
- [security measures in place at launch]
```