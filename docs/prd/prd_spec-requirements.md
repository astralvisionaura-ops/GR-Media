# prd_spec-requirements.md

# docs/prd/prd_spec-requirements.md | Product Requirements

-----

## [CONTEXT]

INHERITS:   _prd-base.md
PHASE:      SPECIFICATION
AUDIENCE:   Instructor, requirements agent, architecture agent

-----

## [SECTION] document-header

```
PROJECT:        [PROJECT NAME]
VERSION:        [e.g., 1.0.0]
STATUS:         DRAFT | IN REVIEW | APPROVED
DATE:           [YYYY-MM-DD]
DERIVED FROM:   prd_spec-overview.md v[N]
```

-----

## [SECTION] functional-requirements

Requirements describing what the system must do.
Written in Instructor voice. Drafted by requirements agent.

```
FR-001
TITLE:       [short descriptive name]
PRIORITY:    MUST | SHOULD | COULD | WONT
STATEMENT:   [one sentence: "The system must [action] so that [outcome]"]
RATIONALE:   [why this is required — one sentence]
ACCEPTANCE:  [brief description of what done looks like]
```

[Add FR-NNN blocks sequentially.]

-----

## [SECTION] non-functional-requirements

Requirements describing system qualities with measurable thresholds.

```
NFR-001
TITLE:       [short descriptive name]
CATEGORY:    PERFORMANCE | AVAILABILITY | SECURITY | SCALABILITY |
             COMPLIANCE | RELIABILITY | MAINTAINABILITY
STATEMENT:   [quantified requirement with threshold]
RATIONALE:   [why this threshold was chosen]
```

-----

## [SECTION] user-stories

Optional — use when user context improves clarity for a requirement.

```
US-001
AS A:        [type of user]
I WANT TO:   [capability]
SO THAT:     [outcome or benefit]
LINKED TO:   FR-[NNN]
```

-----

## [SECTION] constraints

Requirements that restrict the solution space.

```
CON-001
TYPE:        TECHNICAL | REGULATORY | BUSINESS
STATEMENT:   [the constraint]
SOURCE:      [where this constraint comes from]
```

-----

## [SECTION] prioritization-rationale

Explanation of MUST vs. SHOULD vs. COULD decisions:

```
[Brief narrative — 3-5 sentences maximum — explaining the prioritization
 logic for this release. What was included and why. What was deferred and why.
 This is the Instructor's framing of tradeoffs made.]
```

-----

## [SECTION] open-items

Requirements that cannot be finalized without additional input:

```
OI-001
QUESTION:    [what needs to be decided]
IMPACT:      [which requirements depend on this]
OWNER:       [who will decide — Instructor | team | external]
DEADLINE:    [before GATE-01 | before implementation | —]
STATUS:      OPEN | RESOLVED
```