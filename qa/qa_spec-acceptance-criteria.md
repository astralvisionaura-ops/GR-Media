# qa_spec-acceptance-criteria.md

# qa/qa_spec-acceptance-criteria.md | Acceptance Criteria

-----

## [CONTEXT]

INHERITS:   —
PHASE:      QM — written by qm agent
AUDIENCE:   qm, frontend, backend, Instructor
OWNED BY:   agent_spec-qm.md

-----

## [SECTION] overview

```
PROJECT:        [PROJECT NAME]
VERSION:        [version]
STATUS:         DRAFT | IN PROGRESS | COMPLETE
LAST UPDATED:   [YYYY-MM-DD]
AUTHOR:         agent-qm
```

Every acceptance criterion derives from a functional requirement.
Format: Gherkin (Given / When / Then).
One criterion minimum per MUST requirement.

-----

## [SECTION] criteria

```
AC-001
SOURCE:   REQ-001
STATUS:   PENDING | PASS | FAIL
UPDATED:  [YYYY-MM-DD]

Given:    [system state / precondition]
When:     [user action or system event]
Then:     [expected observable outcome]
And:      [additional assertion — if needed]

FAILURE MEANS: [what a FAIL result implies for the release]
```

[Add one AC-NNN block per MUST requirement.
SHOULD requirements: add criteria after MUST criteria are complete.
Numbering mirrors REQ-NNN where possible.]

-----

## [SECTION] coverage-summary

```
TOTAL REQUIREMENTS (MUST):   [N]
CRITERIA WRITTEN:            [N]
CRITERIA PASSED:             [N]
CRITERIA FAILED:             [N]
CRITERIA PENDING:            [N]

RELEASE READINESS:
  All MUST criteria PASS required for release.
  Any MUST criterion FAIL → NOT READY.
  SHOULD criteria FAIL → document, escalate if significant.
```

-----

## [SECTION] regression-scope

Criteria that must be re-verified after any production change:

```
REGRESSION SET:
  [List AC-NNN entries that form the regression baseline.
   Typically: all MUST criteria for critical paths.
   Add entries when a criterion catches a real regression.]
```