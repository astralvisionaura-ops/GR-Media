# adr_index.md

# docs/adr/adr_index.md | ADR Index

-----

## [CONTEXT]

INHERITS:   —
PHASE:      SPECIFICATION — updated when any ADR is created or changed
AUDIENCE:   all agents, Instructor

-----

## [SECTION] index-rules

```
REGISTER IMMEDIATELY:   Add an ADR to this index when it is created.
                        Not after it is accepted — when it is created.
STATUS ACCURACY:        Update status here when the ADR status changes.
NEVER DELETE:           Superseded and rejected ADRs stay in the index.
                        They are part of the decision history.
```

-----

## [SECTION] index

```
ADR-NNN   STATUS      TITLE                           DATE        SUPERSEDES
──────────────────────────────────────────────────────────────────────────────
ADR-000   ACCEPTED    ADR template                    [date]      —
```

[Add one row per ADR. Most recent last.]

-----

## [SECTION] status-legend

```
PROPOSED     Written — not yet reviewed by architecture agent + Instructor
ACCEPTED     Reviewed, chosen, and active
SUPERSEDED   Replaced by a newer ADR (column: SUPERSEDES shows replacement)
DEPRECATED   No longer relevant — not replaced
REJECTED     Considered and explicitly declined
```

-----

## [SECTION] decisions-by-topic

Grouped view for quick navigation:

```
API DESIGN:         ADR-[NNN]
DATABASE:           ADR-[NNN]
AUTHENTICATION:     ADR-[NNN]
FRONTEND FRAMEWORK: ADR-[NNN]
INFRASTRUCTURE:     ADR-[NNN]
COMPLIANCE:         ADR-[NNN]
```

[Update groups as ADRs are added. Add new topic groups as needed.]