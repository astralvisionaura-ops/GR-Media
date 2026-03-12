# adr_template-000.md

# docs/adr/adr_template-000.md | ADR Template

-----

## HOW TO USE

Copy this file. Rename:
`adr_decision-[NNN]-[short-title].md`

NNN = three-digit sequential number (001, 002, …)
short-title = 2–4 words, lowercase, hyphenated
Examples: adr_decision-001-api-protocol.md
adr_decision-002-database-engine.md

Register in docs/adr/adr_index.md immediately after creation.
Set STATUS: PROPOSED — do not leave blank.

-----

# ADR-[NNN]: [Title]

```
STATUS:     PROPOSED | ACCEPTED | SUPERSEDED | DEPRECATED | REJECTED
DATE:       [YYYY-MM-DD]
AUTHOR:     agent-architecture
SUPERSEDES: [ADR-NNN — or: —]
CONTEXT:    [project name and phase]
```

-----

## Context

[What is the situation that requires a decision?
Describe the technical, business, or compliance forces at play.
Do not mention the decision itself yet — just the context.
Two to five sentences.]

-----

## Decision Drivers

```
MUST:   [non-negotiable constraint driving this decision]
MUST:   [second constraint]
SHOULD: [important preference]
COULD:  [nice to have]
```

-----

## Options Considered

### Option A: [Name]

[Description — two to three sentences.]

Pros:

- [advantage]
- [advantage]

Cons:

- [disadvantage]
- [disadvantage]

### Option B: [Name]

[Description — two to three sentences.]

Pros:

- [advantage]

Cons:

- [disadvantage]

### Option C: [Name] *(if applicable)*

[Description.]

-----

## Decision

**Chosen: Option [A | B | C]**

[Two to three sentences explaining why this option was chosen over the others.
Reference the decision drivers explicitly.]

-----

## Consequences

```
POSITIVE:
  [What improves as a result of this decision?]

NEGATIVE:
  [What becomes harder or is given up?]

RISKS:
  [What could go wrong? How are we mitigating it?]

REVISIT WHEN:
  [Condition under which this decision should be re-evaluated.
   e.g., "User base exceeds 100,000 — database choice may need review."]
```

-----

## Privacy by Design Assessment *(GDPR Art. 25 — complete if personal data is involved)*

```
PERSONAL DATA INVOLVED: YES | NO | UNKNOWN

If YES, confirm each principle is addressed by this architectural decision:

[ ] Data Minimisation   — only data necessary for the stated purpose is collected/processed
[ ] Purpose Limitation  — data not used beyond the purpose documented with LEGAL-BASIS annotation
[ ] Storage Limitation  — retention period defined; deletion mechanism implemented (Art. 17)
[ ] Privacy by Default  — most privacy-protective settings active without user action required
[ ] Data Portability    — user can export their data in machine-readable format (Art. 20)
[ ] Access Control      — only authorised roles access personal data; ownership verified per request

GAPS IDENTIFIED:
  [ ] None
  [ ] [describe gap and planned mitigation]

DPIA REQUIRED: YES | NO
  Trigger YES if: large-scale PII processing, systematic profiling/monitoring,
  sensitive categories (Art. 9), or cross-border transfers without adequacy decision.
```