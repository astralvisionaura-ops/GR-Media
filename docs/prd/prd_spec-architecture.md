# prd_spec-architecture.md

# docs/prd/prd_spec-architecture.md | Architecture Summary for PRD

-----

## [CONTEXT]

INHERITS:   _prd-base.md
PHASE:      SPECIFICATION — after GATE-01
AUDIENCE:   Instructor, stakeholders, technical reviewers

-----

## [SECTION] document-header

```
PROJECT:        [PROJECT NAME]
VERSION:        [e.g., 1.0.0]
STATUS:         DRAFT | IN REVIEW | APPROVED
DATE:           [YYYY-MM-DD]
DERIVED FROM:   core_arch-system-design.md v[N]
```

-----

## [SECTION] architecture-summary

Plain-language summary for non-technical readers.

```
SYSTEM OVERVIEW:
  [Two to four sentences describing what the system is made of
   and how the pieces relate. No jargon. No acronyms without expansion.]

WHY THIS ARCHITECTURE:
  [One to two sentences on what drove the key decisions.
   e.g., "We chose X because Y constraint required it."]
```

-----

## [SECTION] key-decisions

Each significant architectural decision and its business rationale.
Technical details and alternatives in docs/adr/.

```
DECISION:    [what was decided]
REASON:      [why — business and technical rationale in one sentence]
TRADEOFF:    [what was given up by choosing this — one sentence]
ADR:         [adr_decision-NNN-*.md]
```

-----

## [SECTION] technology-stack

```
COMPONENT       TECHNOLOGY          PURPOSE
──────────────────────────────────────────────────────
[layer]         [technology]        [what it does]
[layer]         [technology]        [what it does]
```

-----

## [SECTION] external-dependencies

Systems and services this product depends on:

```
DEPENDENCY:     [name]
PURPOSE:        [what we use it for]
CRITICALITY:    [what happens if it is unavailable]
SLA / UPTIME:   [vendor SLA — or: unknown]
DATA SHARED:    [what data is sent — or: none]
```

-----

## [SECTION] security-approach

High-level security architecture for non-technical stakeholders:

```
AUTHENTICATION: [how users prove who they are — plain language]
AUTHORIZATION:  [how the system controls what users can do]
DATA PROTECTION:[how sensitive data is protected at rest and in transit]
COMPLIANCE:     [which frameworks apply and their primary requirement]
```

-----

## [SECTION] scalability-approach

```
EXPECTED LOAD:      [users, requests, data volume — at launch and at scale]
SCALING STRATEGY:   [how the system grows with demand]
KNOWN LIMITS:       [where the current design would need to change at scale]
```