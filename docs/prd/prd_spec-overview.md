# prd_spec-overview.md

# docs/prd/prd_spec-overview.md | Product Requirements Document (PRD) Overview

-----

## [CONTEXT]

INHERITS:   _prd-base.md
PHASE:      SPECIFICATION — required before GATE-02
AUDIENCE:   Instructor, stakeholders, all agents

-----

## [SECTION] document-header

```
PROJECT:        [PROJECT NAME]
VERSION:        0.1.0
STATUS:         DRAFT
DATE:           [YYYY-MM-DD]
AUTHOR:         [Instructor Name]
CLASS:          [1 | 2 | 3 | 4]
```

-----

## [SECTION] executive-summary

**Project:** [PROJECT NAME]
**Vision:** [One sentence: what this product does and for whom.]
**Problem statement:** [What problem does this solve? Why does it matter now?]
**Success definition:** [How will we know this project succeeded?]

-----

## [SECTION] target-audience

**Primary users:** [Who uses this product directly?]
**Secondary stakeholders:** [Who is affected by or cares about this product?]
**User context:** [Where, when, and how do they use it? What are their constraints?]

-----

## [SECTION] scope-definition

**In Scope (current class):**
- [Feature or capability 1]
- [Feature or capability 2]
- [Feature or capability 3]

**Out of Scope (explicitly excluded):**
- [What will NOT be built in this version]
- [Future capability deferred to next class/phase]

**Assumptions:**
- [Assumption 1 — if wrong, scope changes]
- [Assumption 2]

-----

## [SECTION] success-metrics

| Metric | Target | Measurement method |
|--------|--------|--------------------|
| [e.g., Page load time] | [e.g., LCP < 2.5s] | [e.g., Lighthouse CI] |
| [e.g., User activation] | [e.g., 60% complete onboarding] | [e.g., analytics event] |
| [e.g., Error rate] | [e.g., < 0.1% 5xx] | [e.g., monitoring dashboard] |

-----

## [SECTION] constraints

**Technical constraints:** [Stack decisions already made, infrastructure limits, existing integrations]
**Business constraints:** [Budget, timeline, regulatory deadlines, team size]
**Non-negotiable requirements:** [Security, compliance, accessibility — link to compliance findings]

-----

## [SECTION] open-questions

| Question | Owner | Due |
|----------|-------|-----|
| [Decision needed] | [Instructor / Agent] | [Date or Gate] |

-----

## [SECTION] approval

```
Reviewed by:   [Name]
Approved by:   [Instructor Name]
Approval date: [YYYY-MM-DD]
Next review:   [GATE-02 | GATE-05 | as needed]
```
