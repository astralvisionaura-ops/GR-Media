---
paths:
  - "src/server/**"
  - "src/api/**"
  - "src/auth/**"
  - "deploy/**"
---
# Security Rules

- All data in transit encrypted via TLS 1.2+ (prefer 1.3)
- Authentication tokens validated centrally — not duplicated per endpoint
- Resource ownership verified per request — never per session only
- All input validated against schema before use
- No secrets in code, config files, or version history — environment variables or secrets manager only
- PII fields encrypted at rest. No PII written to logs
- OWASP Top 10 mitigated before release
