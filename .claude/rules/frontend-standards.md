---
paths:
  - "src/client/**"
---
# Frontend Standards

- No direct data fetching in UI components — all API calls through `src/client/services/`
- State management is explicit — no hidden side effects
- Component responsibilities are singular — no logic-and-UI hybrids
- Performance budget: LCP < 2.5s, CLS < 0.1, FID < 100ms, bundle < 200KB gzipped
- WCAG 2.1 AA minimum: keyboard nav, screen reader HTML, contrast ≥ 4.5:1, focus indicators, labeled inputs
- For web-saas: SSR/SSG for public routes, WebP images with lazy loading, httpOnly cookies for auth tokens
