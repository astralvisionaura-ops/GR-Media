---
paths:
  - "src/server/**"
---
# API & Backend Rules

- Every endpoint matches its contract in `core_arch-system-design.md#api-contracts` exactly
- Request validation at the boundary — before any business logic
- Responses never expose internal details (no stack traces, internal IDs, schema details)
- Pagination required for list endpoints returning > 100 items
- Idempotency keys for all state-mutating endpoints
- Database schema must match `core_arch-data-model.md` — divergence requires Schema Change Protocol
- All migrations must be reversible unless explicitly approved
- Parameterized queries only — no string concatenation in queries

## GDPR Data Subject Rights (if personal data processed)

- **Art. 17 — Right to Erasure**: `DELETE /api/v[N]/users/:id` mandatory. Cascade deletion across all stores (DB, cache, search index, backups) must be documented in ADR. Partial erasure (where legal retention applies) documented with legal basis.
- **Art. 20 — Data Portability**: `GET /api/v[N]/users/:id/export` mandatory. Returns all personal data for that subject in machine-readable format (JSON or CSV). Covers every field annotated with LEGAL-BASIS.
- Both endpoints require the same auth/authz as the highest-sensitivity endpoint in the system.
