---
paths:
  - "src/**"
  - "core/**"
  - "docs/adr/**"
---
# Core Context

These files define the authoritative project architecture. Read the relevant file(s)
via the Read tool when their domain is involved — do not assume contents from memory.

| File | When to read |
|------|-------------|
| `core/core_arch-system-design.md` | System design, component boundaries, API contracts |
| `core/core_arch-data-model.md` | Data model, schemas, entity relationships |
| `core/core_spec-functional.md` | Functional requirements, feature scope |
| `core/core_spec-non-functional.md` | Performance budgets, SLAs, security constraints |
| `core/core_spec-edge-cases.md` | Edge cases, error handling, boundary conditions |

Rule: Any architectural change that contradicts these documents requires a Schema Change
Protocol (data model) or a new ADR (all other decisions) before implementation begins.
