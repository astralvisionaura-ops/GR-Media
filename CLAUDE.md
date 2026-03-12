# CLAUDE.md — Project Configuration

## Project Identity

```
PROJECT:          [PROJECT NAME]
CLASS:            [1 | 2 | 3 | 4]
STATUS:           ACTIVE
ACTIVE PHASE:     INIT
ACTIVE DOMAIN:    [web-saas | desktop | mobile | embedded]
LAST SESSION:     —
TEMPLATE VERSION: 3.1.0
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