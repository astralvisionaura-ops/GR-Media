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

Changes to this document after GATE-01:

```
1. Agent identifies need for schema change
2. Agent reports to Orchestrator: SCHEMA CHANGE REQUEST
   Content: what, why, impact on: frontend | backend | data | migration
3. Architecture agent evaluates and updates this document
4. New ADR written for the change
5. Backend agent receives updated schema before implementing
6. Migration script written and reviewed before deployment
7. Audit log entry: SCHEMA CHANGE — [description]
```

No unilateral schema changes. Every change follows this protocol.

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