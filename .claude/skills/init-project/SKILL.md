---
name: init-project
description: "Initialize a new project from a Client-PRD or interactively. Usage: /init-project [PROJECT NAME]. If Client-PRD.md exists in project root, extracts all signals automatically. Falls back to interactive discovery if not present."
user-invocable: true
disable-model-invocation: true
---

# Project Initialization

Execute these 8 steps in order. Ask the user (Instructor) when decisions are needed.

**Invocation:** `/init-project [PROJECT NAME]`
- If `[PROJECT NAME]` is provided, use it as the project name.
- If `docs/prd/Client-PRD.md` exists, run in **Client-PRD mode** (Steps 2–3 replaced by extraction).
- Otherwise, run in **interactive mode** (Steps 2–3 as normal).

## Step 1 — System Validation

Verify these critical files exist:
- `CLAUDE.md`
- `core/core_arch-system-design.md`, `core/core_arch-data-model.md`
- `core/core_spec-functional.md`, `core/core_spec-non-functional.md`, `core/core_spec-edge-cases.md`
- `qa/qa_log-audit.md`, `qa/qa_spec-acceptance-criteria.md`, `qa/qa_spec-test-cases.md`, `qa/qa_spec-conformance.md`
- `deploy/deploy_gate-approval-required.md`
- `docs/prd/prd_spec-overview.md`, `docs/prd/prd_spec-requirements.md`
- `docs/adr/adr_template-000.md`, `docs/adr/adr_index.md`
- `docs/changelog/CHANGELOG.md`

!find . \( -path "*/core/*.md" -o -path "*/qa/*.md" -o -path "*/deploy/*.md" -o -path "*/docs/*.md" \) 2>/dev/null | sort | head -30

On FAIL: report missing files. STOP.
On PASS: check for `docs/prd/Client-PRD.md`. Continue to step 2.

## Step 2 — Strategic Context

**Interactive mode only** (skip if Client-PRD.md exists — context comes from the brief).

Ask the user:
> "Should we define the strategic company context first? (Applies to all future projects)"

If YES: collect company name, mission, long-term goal, principles, technology preferences.
If NO: proceed without company context.

## Step 3 — Discovery

### Client-PRD Mode (if `docs/prd/Client-PRD.md` exists)

Read the file and extract the following signals. Present findings to the user for confirmation before proceeding.

**Extract from Client-PRD.md:**

| Signal | Source Field | Maps To |
|--------|-------------|---------|
| Project name | Argument or "The Idea" | `CLAUDE.md → PROJECT` |
| Business model | "The Business" | Project Class signal |
| Primary user + pain | "The People" | `prd_spec-overview.md` |
| MVP feature | "The One Thing" | `prd_spec-requirements.md` |
| Differentiator | "The One Thing" (2nd question) | `prd_spec-overview.md` |
| Domain + tone | "The Feel" | `ACTIVE DOMAIN`, frontend context |
| Brand assets | "The Feel" (2nd question) | Note in `prd_spec-overview.md` |
| Integrations | "The Landscape" | Architecture signals |
| Compliance flags | "The Sensitivity" | Compliance-audit pre-fill |
| Constraints | "The Constraints" | `prd_spec-overview.md` |
| Risk | "The Fear" | `prd_spec-overview.md` |
| Additional context | "Anything Else" | As applicable |

**Class proposal from Client-PRD signals:**
- "Internal tool, no sensitive data" + no backend → Class 1
- Dynamic features, backend required → Class 2
- Multi-team, production traffic → Class 3
- Regulated data (GDPR, HIPAA, payments) → Class 4

**After extraction:** Present a summary card to the user:
```
Extracted from Client-PRD:
  Project:    [name]
  Class:      [1–4] — [reason]
  Domain:     [web-saas | desktop | mobile | embedded]
  Compliance: [flags or —]
  MVP:        [one thing]
  Confirm? (yes / correct me)
```

Wait for user confirmation before proceeding to Step 4.

### Interactive Mode (no Client-PRD.md)

Delegate to the `discovery` skill — do not re-implement its logic here.

Invoke: `/discovery`

The skill handles: domain signal analysis, regulatory signal detection, class proposal, and user confirmation. Wait for the user to confirm the project class before proceeding to Step 4.

## Step 4 — Best Practice Research

Delegate to the `best-practices` skill — do not re-implement its logic here.

Invoke: `/best-practices T1`

The skill handles: technology stack research, domain-specific best practices, and confidence-rated recommendations. Wait for the research report before proceeding to Step 5.

## Step 5 — Compliance Evaluation

Delegate to the `compliance-audit` skill — do not re-implement its detection logic here.

Invoke: `/compliance-audit`

The skill handles: regulatory keyword detection (incl. NIS2, DORA, GDPR, MDR, EU AI Act), priority assignment, and gap detection. Wait for the detection report before proceeding to Step 6.

## Step 6 — Write Configuration

Update in this order:
1. `CLAUDE.md` — fill PROJECT, CLASS, ACTIVE PHASE → SPECIFICATION, ACTIVE DOMAIN
2. `docs/prd/prd_spec-overview.md` — populate from Client-PRD (if available):
   - Vision from "The Idea" + "The Business"
   - Target user from "The People"
   - Out-of-scope: derive from "The One Thing" (what explicitly waits)
   - Constraints from "The Constraints"
   - Risk from "The Fear"
   - Brand notes from "The Feel"
3. `docs/prd/prd_spec-requirements.md` — populate MVP feature from "The One Thing" as FR-001
4. `qa/qa_log-audit.md` — entry: INIT COMPLETE
5. `docs/changelog/CHANGELOG.md` — entry: v0.1.0-alpha — project initialized
6. **Domain rules cleanup** — Remove non-applicable domain rule files from `.claude/rules/`.
   Keep only the rule file matching ACTIVE DOMAIN (e.g., `domain-web-saas.md` for web-saas).
   Delete all other `domain-*.md` rule files to prevent stale rules loading in unrelated projects.

## Step 7 — Integrity Validation

Search for unreplaced `[VALUE]` placeholders in `CLAUDE.md`. Report any remaining.

## Step 8 — Handover

Report to user:
```
"Project initialized.
  Name:    [PROJECT]
  Class:   [CLASS]
  Domain:  [ACTIVE DOMAIN]
  Compliance: [CRITICAL/HIGH findings or —]
  Next step: draft docs/prd/prd_spec-overview.md.
  Shall I begin?"
```
