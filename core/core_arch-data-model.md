# core_arch-data-model.md

# core/core_arch-data-model.md | Data Model

-----

## [CONTEXT]

INHERITS:   —
PHASE:      SPECIFICATION — written by architecture agent
AUDIENCE:   backend, qm, infra
OWNED BY:   agent_spec-architecture.md

-----

## [SECTION] overview

```
PROJECT:        [PROJECT NAME]
VERSION:        [data model version — e.g., 1.0.0]
STATUS:         DRAFT | REVIEWED | FINAL
LAST UPDATED:   [YYYY-MM-DD]
AUTHOR:         agent-architecture
```

This document is the data schema source of truth.
Schema here is binding for backend agent implementation.
Changes after GATE-01 require Schema Change Protocol.

-----

## [SECTION] schema

One entity block per database table or document collection.
Supabase is used as the primary PostgreSQL database with Row Level Security (RLS).

```sql
ENTITY: profiles
TABLE:  public.profiles
RLS:    ENABLED
──────────────────────────────────────────────────────
COLUMN          TYPE            CONSTRAINTS         DESCRIPTION
id              uuid            PK, FK(auth.users)  Primary identifier (must match auth.uid())
updated_at      timestamptz     —                   Last update timestamp
username        text            UNIQUE              Unique display name
avatar_url      text            —                   Profile picture URL

POLICIES:
  SELECT: "Public profiles are viewable by everyone." (true)
  INSERT: "Users can insert their own profile." (auth.uid() = id)
  UPDATE: "Users can update own profile." (auth.uid() = id)

PII:    none (username is public, id is internal)
INDEXES:
  profiles_username_idx ON (username) — Fast username lookups
```

-----

## [SECTION] relationships

```
[entity-a] ──< [entity-b]     one-to-many
[entity-a] >──< [entity-b]    many-to-many via [junction_table]
[entity-a] ──── [entity-b]    one-to-one

[Add relationship descriptions where behavior is non-obvious]
```

-----

## [SECTION] enumerations

```
ENUM: [enum_name]
VALUES:
  [VALUE_1]    [description]
  [VALUE_2]    [description]
  [VALUE_3]    [description]
USED IN: [entity-name].[column]
```

-----

## [SECTION] migration-history

Append-only log of schema changes after GATE-01.

```
MIGRATION: [NNN]
DATE:       [YYYY-MM-DD]
AUTHOR:     agent-architecture
ADR:        [adr file — or: —]
CHANGE:     [description — what changed and why]
REVERSIBLE: YES | NO — [if NO: explicit justification required]
```

[No migrations before GATE-01 — schema is settled at specification.]

-----

## [SECTION] change-protocol

**Schema Change Protocol** — any change to this document after GATE-01 follows these steps:

```
STEP  WHO                  ACTION
────  ───────────────────  ────────────────────────────────────────────────────
1     backend / any agent  Identifies schema divergence — STOPS implementation
2     backend / any agent  Issues formal SCHEMA CHANGE REQUEST to Instructor:

      SCHEMA CHANGE REQUEST
      ─────────────────────
      Requested by:  [agent name]
      Date:          [YYYY-MM-DD]
      Change:        [what needs to change — table, column, type, constraint]
      Reason:        [why current schema is insufficient]
      Impact:
        frontend:    [affected UI / API calls]
        backend:     [affected endpoints / queries]
        data:        [migration complexity: additive | destructive | rename]
        compliance:  [PII-registry update needed? GDPR implications?]
      Reversible:    YES / NO — [if NO: explicit Instructor approval required]

3     Instructor           Reviews and approves or rejects the request
4     architecture agent   Updates this document (core_arch-data-model.md)
5     architecture agent   Writes ADR documenting the decision
6     backend agent        Receives updated schema, then implements
7     backend agent        Writes reversible migration script
8     qm agent             Reviews migration before deployment
9     any agent            Appends to qa/qa_log-audit.md:
                           SCHEMA CHANGE — [table.column] — [reason] — approved by Instructor
```

**Approval by class:**
- Class 1/2: Instructor confirmation in chat
- Class 3: Instructor sign-off + ADR required
- Class 4: Instructor sign-off + ADR + external review if PII-registry changes

**No unilateral schema changes.** An agent that discovers a divergence must stop and follow this protocol — not implement around it.

-----

## [SECTION] pii-registry

Complete list of personal data fields across all entities.
Required when GDPR is active.

```
ENTITY          COLUMN          DATA CATEGORY       LEGAL BASIS
─────────────────────────────────────────────────────────────────
[entity]        [column]        [e.g., email]       Art.6(1)[X]
[entity]        [column]        [e.g., IP address]  Art.6(1)[X]
```

[Empty until schema is defined. Must be complete before GATE-01 on GDPR projects.]