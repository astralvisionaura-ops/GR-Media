# qa_spec-conformance.md

# qa/qa_spec-conformance.md | Compliance Conformance Tracking

-----

## [CONTEXT]

INHERITS:   —
PHASE:      QM — maintained by qm agent
AUDIENCE:   qm, Orchestrator, Instructor
OWNED BY:   agent_spec-qm.md

-----

## [SECTION] overview

```
PROJECT:        [PROJECT NAME]
VERSION:        [version]
STATUS:         IN PROGRESS | COMPLETE
LAST UPDATED:   [YYYY-MM-DD]
AUTHOR:         agent-qm
```

Every compliance finding is tracked here.
A release is blocked if any CRITICAL finding is not RESOLVED.
Evidence must be concrete — not asserted.

-----

## [SECTION] active-frameworks

Compliance frameworks active for this project:

```
FRAMEWORK:      [e.g., GDPR]
SPEC FILE:      comp_spec-gdpr.md
STATUS:         ACTIVE
CRITICAL OPEN:  [N — must be 0 for release]

FRAMEWORK:      [e.g., SOC 2]
SPEC FILE:      comp_spec-soc2.md
STATUS:         ACTIVE
CRITICAL OPEN:  [N — must be 0 for release]
```

-----

## [SECTION] finding-format

```
CF-NNN
FRAMEWORK:  [framework name]
SPEC REF:   [comp_spec-*.md#section]
SEVERITY:   CRITICAL | HIGH | MEDIUM | LOW
STATUS:     OPEN | IN PROGRESS | RESOLVED | ACCEPTED RISK
CREATED:    [YYYY-MM-DD]
RESOLVED:   [YYYY-MM-DD — or: —]

DESCRIPTION:
  [What is missing or non-compliant — concrete, not vague.]

EVIDENCE (when RESOLVED):
  REFERENCE:  [file + section or document name]
  METHOD:     [automated test | manual review | external audit]
  DATE:       [YYYY-MM-DD]
  VERIFIED BY: [agent-qm | external auditor]

ACCEPTED RISK (when ACCEPTED RISK):
  RATIONALE:  [why this is accepted]
  APPROVED BY: instructor
  DATE:       [YYYY-MM-DD]
  REVIEW:     [when to revisit]
```

-----

## [SECTION] gdpr-findings

[CF-NNN blocks for GDPR findings]

-----

## [SECTION] soc2-findings

[CF-NNN blocks for SOC 2 findings]

-----

## [SECTION] iso27001-findings

[CF-NNN blocks for ISO 27001 findings]

-----

## [SECTION] domain-compliance-findings

[CF-NNN blocks for domain-specific findings: medical, industrial, AI]

-----

## [SECTION] conformance-summary

Updated by qm agent before each release gate:

```
SUMMARY DATE:       [YYYY-MM-DD]
RELEASE CANDIDATE:  [version]

FINDINGS TOTAL:     [N]
  CRITICAL:         [N open]   [N resolved]
  HIGH:             [N open]   [N resolved]
  MEDIUM:           [N open]   [N resolved]
  LOW:              [N open]   [N resolved]

RELEASE GATE:
  CRITICAL = 0 open     → PASS | FAIL
  HIGH = 0 open         → PASS | FAIL (required for Class 3+)
  ACCEPTED RISKS:       [N — each approved by Instructor]

OVERALL:  READY | NOT READY
BLOCKER:  [list CRITICAL open findings — or: —]
```