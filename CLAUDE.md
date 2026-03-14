# CLAUDE.md — Project Configuration

## Project Identity

```
PROJECT:          GR-Media
CLASS:            2
STATUS:           ACTIVE
ACTIVE PHASE:     IMPLEMENTATION
ACTIVE DOMAIN:    web-saas
LAST SESSION:   2026-03-14
TEMPLATE VERSION: 1.0.0
```

Class 1: Static/No Backend | Class 2: Dynamic/Backend | Class 3: Production/Multi-Team | Class 4: Regulated/Enterprise

## Essential References

@README.md

## Workflow

- Explore first → plan → implement → verify
- Use the `requirements` agent for spec analysis, `architecture` for design, `frontend`/`backend` for implementation, `qm` for quality review, `infra` for deployment
- Every significant decision → ADR in `docs/adr/`
- To initialize a new project: use the `init-project` skill
- Before deployment: use the `gate-check` skill
- When compacting, always preserve: project class, active phase, modified files list, and any test commands