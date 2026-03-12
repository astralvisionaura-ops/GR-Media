# core_spec-functional.md

# core/core_spec-functional.md | Functional Requirements

-----

## [CONTEXT]

INHERITS:   —
PHASE:      SPECIFICATION — written by requirements agent
AUDIENCE:   all agents
OWNED BY:   agent_spec-requirements.md

-----

## [SECTION] overview

```
PROJECT:        [PROJECT NAME]
VERSION:        [spec version — e.g., 1.0.0]
STATUS:         DRAFT | REVIEWED | FINAL
LAST UPDATED:   [YYYY-MM-DD]
AUTHOR:         agent-requirements
```

Purpose: single source of truth for what the system must do.
All functional requirements are traceable to docs/prd/prd_spec-requirements.md.

-----

## [SECTION] must-requirements

PRIORITY: MUST — required for any release.

```
REQ-001
SOURCE:    prd_spec-requirements.md#[section]
PRIORITY:  MUST
STATUS:    OPEN
STATEMENT: [single testable statement]

REQ-002
SOURCE:    prd_spec-requirements.md#[section]
PRIORITY:  MUST
STATUS:    OPEN
STATEMENT: [single testable statement]
```

[Add REQ-NNN blocks sequentially. Do not skip numbers.]

-----

## [SECTION] should-requirements

PRIORITY: SHOULD — important but deferrable under scope pressure.

```
REQ-1nn
SOURCE:    prd_spec-requirements.md#[section]
PRIORITY:  SHOULD
STATUS:    OPEN
STATEMENT: [single testable statement]
```

-----

## [SECTION] could-requirements

PRIORITY: COULD — desirable, addressed after MUST and SHOULD.

```
REQ-2nn
SOURCE:    prd_spec-requirements.md#[section]
PRIORITY:  COULD
STATUS:    OPEN
STATEMENT: [single testable statement]
```

-----

## [SECTION] wont-requirements

Explicitly out of scope for this release. Documented to prevent scope creep.

```
REQ-9nn
SOURCE:    prd_spec-requirements.md#[section] or: Instructor decision
PRIORITY:  WONT
STATUS:    DEFERRED
STATEMENT: [what is out of scope]
REASON:    [why — one sentence]
```

-----

## [SECTION] traceability-matrix

Cross-reference: requirement → implementation → test.

```
REQ-ID     STATUS          IMPL FILE              TEST / AC
────────────────────────────────────────────────────────────
REQ-001    OPEN            —                      AC-001
REQ-002    OPEN            —                      AC-002
```

Update STATUS on implementation: OPEN → IMPLEMENTED → VERIFIED.

-----

## [SECTION] open-questions

Requirements that cannot be finalized without Instructor input:

```
OQ-001
QUESTION:  [specific question]
IMPACT:    [which requirements depend on this answer]
DEADLINE:  [before GATE-01 | before implementation | —]
STATUS:    OPEN | ANSWERED
```

Empty when FINAL. Open questions block transition to GATE-01.