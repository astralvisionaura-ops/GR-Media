# deploy_gate-approval-required.md

# deploy/deploy_gate-approval-required.md | Deployment Gate — Approval Required

-----

## [CONTEXT]

INHERITS:   —
PHASE:      DEPLOYMENT — first file read by infra agent
AUDIENCE:   infra agent, Orchestrator

-----

## [SECTION] stop

```
╔══════════════════════════════════════════════════════════╗
║  STOP. READ THIS SECTION BEFORE ANY PRODUCTION ACTION.   ║
╚══════════════════════════════════════════════════════════╝

This file exists because production deployments are irreversible
until rollback — and rollbacks are costly.

Before touching production:

  □ GATE-04 (infra readiness) — confirmed PASS in audit log
  □ GATE-05 (release approval) — confirmed PASS in audit log
  □ Rollback plan — written, tested, actionable
  □ Monitoring — active and alerting before deployment starts
  □ Instructor — notified of deployment window

If any item is not checked → STOP. Report to Orchestrator.
Do not proceed on the assumption that a missing check "will be fine."
```

-----

## [SECTION] gate-04-checklist

GATE-04: Infrastructure Readiness

```
□ Staging environment validated — behavior matches production
□ All automated tests pass in staging
□ Database migrations tested in staging — not production
□ Environment variables and secrets verified for production
□ Monitoring and alerting configured
□ Backup verified — last successful backup within [X] hours
□ On-call contact defined and reachable (Class 3+)
□ Deployment window communicated to Instructor
□ No outstanding CRITICAL compliance findings in qa_spec-conformance.md

GATE-04 RESULT:  PASS | FAIL
DATE:            [YYYY-MM-DD]
CONFIRMED BY:    agent-infra + Orchestrator
```

-----

## [SECTION] gate-05-checklist

GATE-05: Release Approval

```
□ All MUST acceptance criteria PASS in qa_spec-acceptance-criteria.md
□ No CRITICAL or HIGH test failures in qa_spec-test-cases.md
□ All CRITICAL compliance findings RESOLVED in qa_spec-conformance.md
□ QM agent has issued READY signal
□ Technical documentation complete (Class 4)
□ prd_spec-signoff.md signed (Class 3+)
□ Instructor has confirmed release approval

GATE-05 RESULT:  PASS | FAIL
DATE:            [YYYY-MM-DD]
CONFIRMED BY:    Instructor
```

-----

## [SECTION] rollback-readiness

Before deployment proceeds:

```
ROLLBACK PLAN:
  Trigger:          [conditions that trigger rollback]
  Method:           [automated | manual — with steps]
  Database:         [migration rollback approach]
  Time to rollback: [estimated duration]
  Last tested:      [YYYY-MM-DD — or: not yet tested — BLOCKED]

A rollback plan that has not been tested is not a rollback plan.
Class 3+: rollback must be tested in staging before production deployment.
```

-----

## [SECTION] deployment-log

Append one entry per production deployment attempt:

```
DEPLOYMENT: [version]
DATE:       [YYYY-MM-DD HH:MM]
GATE-04:    PASS | FAIL
GATE-05:    PASS | FAIL
STATUS:     INITIATED | COMPLETE | FAILED | ROLLED BACK
ROLLBACK:   [YES — reason | NO]
NOTES:      [post-deployment observation — or: —]
```

[Entries appended below. Most recent last.]