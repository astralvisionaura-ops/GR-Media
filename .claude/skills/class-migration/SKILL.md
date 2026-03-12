---
name: class-migration
description: "Migrate a project between classes (1-4). Evaluates impact, activates/deactivates agents and compliance requirements, updates configuration, and confirms with the user."
user-invocable: true
disable-model-invocation: true
context: fork
argument-hint: "[target-class]"
---

# Class Migration

Target class: **$ARGUMENTS**

## When to Migrate
- Scope significantly increases (e.g., internal tool → external SaaS)
- Regulatory requirements discovered post-discovery
- User explicitly requests a class change

## Migration Process

### 1. Impact Analysis
Compare current and target class:

```
CLASS 1 → 2: Add requirements, architecture, qm agents. Add GATE-01, GATE-04, GATE-05.
CLASS 2 → 3: Add infra agent. Add GATE-03, GATE-06. Require automated E2E testing.
CLASS 3 → 4: Add GATE-07 (regulatory). Require security testing, regulatory evidence.
CLASS N → N-1: (Downgrade) Remove gates and agent requirements. Document reason in ADR.
```

### 2. Compliance Delta
Check which compliance frameworks are added or removed:
- New PII scope? → GDPR activation
- New B2B customers? → SOC 2 evaluation
- New medical context? → MDR/IEC 62304 activation

### 3. Configuration Update
1. Update `CLAUDE.md` — CLASS field
2. Log in `qa/qa_log-audit.md` — CLASS MIGRATION entry
3. Create ADR: `adr_decision-[NNN]-class-migration.md`

### 4. Confirmation
Ask user to confirm:
```
"Class migration: [OLD] → [NEW]
 New agents: [list]
 New gates: [list]
 New compliance: [list or —]
 Confirm?"
```

## Rules
- Migration is never automatic — always user-confirmed
- Downgrade requires explicit justification (ADR)
- Compliance requirements activated by upgrade cannot be silently dropped on downgrade
