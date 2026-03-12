---
name: gate-check
description: "Evaluate project readiness against approval gates (GATE-01 through GATE-07). Checks architecture, scope, staging, infra, release, external access, and regulatory gates based on project class."
user-invocable: true
disable-model-invocation: true
context: fork
model: claude-opus-4-6
argument-hint: "[gate-number | all]"
allowed-tools:
  - Read
  - Write
  - Grep
  - Glob
hooks:
  Stop:
    - hooks:
        - type: command
          command: "\"${CLAUDE_PROJECT_DIR}\"/.claude/hooks/skill-complete.sh gate-check"
          async: true
---

# Gate Check

ultrathink

## Resource Usage

Expected: 2–6 turns. Single-gate check (e.g., `/gate-check 01`) is significantly cheaper than `/gate-check all`. For Class 1/2 projects, prefer specific gate numbers. Reserve `all` for pre-release Class 3/4 reviews.

Evaluating: **$ARGUMENTS** (pass a gate number like `01`–`07`, or `all` to evaluate every gate applicable for the current class).

## Gate Definitions

### GATE-01 — Architecture Review
**Trigger**: Architecture design phase complete
**Checks**: Architecture complete? API contracts defined? ADRs present for critical decisions?
**Approval**: Class 2+ → user confirmation
**Blocked by**: Open placeholders in `core/core_arch-*.md`

### GATE-02 — Scope Confirmation
**Trigger**: `docs/prd/prd_spec-overview.md` finalized
**Checks**: Scope and out-of-scope clearly defined? User has confirmed scope?
**Approval**: Class 2+ → user confirmation
**Blocked by**: Missing out-of-scope definition

### GATE-03 — Staging Validation
**Trigger**: Feature fully deployed to staging
**Checks**: Acceptance criteria met? No CRITICAL bugs? Performance budget maintained?
**Approval**: Class 2 → internal, Class 3+ → user confirmation
**Blocked by**: Open CRITICAL bugs, performance violation

### GATE-04 — Infrastructure
**Trigger**: Before first production deployment
**Checks**: IaC complete? Rollback tested? Monitoring active? Secrets secured?
**Approval**: Class 2+ → user confirmation
**Blocked by**: No tested rollback plan

### GATE-05 — Release
**Trigger**: Before production release
**Checks**: QM sign-off? `docs/prd/prd_spec-signoff.md` filled (Class 2+)? Compliance PASS? Rollback plan? Dependency scan (Class 3+)? SAST completed with no unmitigated HIGH findings (Class 3+)? DAST report archived (Class 4)? SBOM archived (Class 4)?
**Approval**: Class 2+ → user confirmation
**Blocked by**: Open CRITICAL/HIGH compliance findings, missing QM sign-off, unmitigated CRITICAL/HIGH CVEs in dependencies (Class 3+), unmitigated HIGH/CRITICAL SAST findings (Class 3+), missing DAST report (Class 4), missing or unsigned SBOM (Class 4)

### GATE-06 — External Access
**Trigger**: External access to production data planned
**Checks**: `docs/prd/prd_spec-handoff.md` present? Access rights minimal? Contracts in place?
**Approval**: Always → user confirmation
**Blocked by**: Missing access control definition

### GATE-07 — Regulatory Compliance (Class 4 only)
**Trigger**: Before first production release
**Checks**: All CRITICAL compliance findings addressed? Technical docs complete? `qa/qa_spec-conformance.md` PASS?
**Approval**: User + external body if applicable
**Blocked by**: Any open CRITICAL compliance finding

## Gates by Class
- **Class 1**: GATE-02 (internal)
- **Class 2**: GATE-01, GATE-02, GATE-04, GATE-05
- **Class 3**: GATE-01, GATE-02, GATE-03, GATE-04, GATE-05, GATE-06 (if external)
- **Class 4**: All gates + GATE-07 (mandatory)

## Output Format
For each gate: PASS / FAIL / NOT APPLICABLE with evidence. Log result in `qa/qa_log-audit.md`.
