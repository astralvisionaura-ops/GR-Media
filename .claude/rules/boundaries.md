---
paths:
  - "src/**"
  - "qa/**"
  - "deploy/**"
  - "docs/adr/**"
  - "core/**"
---

# Agent Boundaries

## Write Permissions

- `qa/qa_log-audit.md` → append-only by all agents
- `CLAUDE.md` → Orchestrator (main session) only
- `.compliance/` → read-only (system intelligence)
- `docs/adr/` → architecture agent only
- `src/client/` → frontend agent only
- `src/server/` → backend agent only
- `src/shared/` → backend (primary), frontend (read)
- `deploy/` → infra agent only

## Cross-Boundary Rules

- Requirements and architecture agents must not modify `src/` directly
- Frontend agent must not modify `src/server/`
- Backend agent must not modify `src/client/`
- QM agent must not modify `src/` (read only)
- Infra agent must not modify `src/`, `core/`, or `docs/`
