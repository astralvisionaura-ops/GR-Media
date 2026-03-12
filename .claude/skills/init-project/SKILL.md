---
name: init-project
description: "Initialize a new project with the Master Template workflow. Runs 8 steps: system validation, strategic context, discovery, best-practice research, compliance evaluation, configuration, integrity validation, handover."
user-invocable: true
disable-model-invocation: true
---

# Project Initialization

Execute these 8 steps in order. Ask the user (Instructor) when decisions are needed.

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
On PASS: continue to step 2.

## Step 2 — Strategic Context

Ask the user:
> "Soll der strategische Unternehmenskontext zuerst definiert werden? (Gilt für alle zukünftigen Projekte)"

If YES: collect company name, mission, long-term goal, principles, technology preferences.
If NO: proceed without company context.

## Step 3 — Project Discovery

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
2. `qa/qa_log-audit.md` — entry: INIT COMPLETE
3. `docs/changelog/CHANGELOG.md` — entry: v0.1.0-alpha — project initialized
4. **Domain rules cleanup** — Remove non-applicable domain rule files from `.claude/rules/`.
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
