---
paths:
  - "src/**"
---
# Domain: Web-SaaS Standards

Active when project domain is web-saas.

## Client Standards
- SSR or SSG preferred for public routes
- Images: WebP with fallback, lazy loading mandatory
- Fonts: Self-hosted or system fonts — no layout shift
- CSS: Utility-first or CSS Modules — no global leakage
- Auth UI: Token storage in httpOnly cookies — never localStorage

## Server Standards
- API versioning: `/api/v[N]/` prefix mandatory
- HTTP methods semantically correct (GET read-only, POST create, etc.)
- RFC 7231 status codes, consistent error envelope `{ error: { code, message } }`
- CORS: Explicit allowlist — no wildcard in production

## Deployment Standards
- Blue/green or canary deployment for Class 3+
- CDN for static assets
- Health check endpoint required
