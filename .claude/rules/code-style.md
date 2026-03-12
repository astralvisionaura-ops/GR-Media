---
paths:
  - "src/**"
---
# Code Standards

- Use consistent naming: camelCase for variables/functions, PascalCase for classes/components
- No hardcoded secrets, API URLs, or environment-specific values — use environment variables
- No code duplication — extract shared logic to `src/shared/`
- Every function has a single responsibility
- All user-facing strings externalized for i18n readiness
