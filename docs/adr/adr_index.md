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
ADR-NNN   STATUS      TITLE                                    DATE        SUPERSEDES
──────────────────────────────────────────────────────────────────────────────────────
ADR-000   ACCEPTED    ADR template                             —           —
ADR-001   ACCEPTED    Framework Selection (Next.js 14)         2026-03-13  —
ADR-002   ACCEPTED    Auth and Database (Supabase)             2026-03-13  —
ADR-003   ACCEPTED    Blog Strategy (Git/Markdown, no CMS)     2026-03-13  —
ADR-004   ACCEPTED    File Delivery (Supabase Storage + URLs)  2026-03-13  —
```

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

```
FRONTEND FRAMEWORK:   ADR-001  (Next.js 14 App Router)
AUTHENTICATION:       ADR-002  (Supabase Auth)
DATABASE:             ADR-002  (Supabase PostgreSQL)
OBJECT STORAGE:       ADR-004  (Supabase Storage + signed URLs)
BLOG / CONTENT:       ADR-003  (Git/Markdown)
FILE DELIVERY:        ADR-004  (signed URLs, private buckets)
COMPLIANCE (GDPR):    ADR-002, ADR-004 (Privacy by Design assessments)
```
