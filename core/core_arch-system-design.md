# core_arch-system-design.md

# core/core_arch-system-design.md | System Architecture

-----

## [CONTEXT]

INHERITS:   —
PHASE:      SPECIFICATION — written by architecture agent
AUDIENCE:   all agents
OWNED BY:   agent_spec-architecture.md

-----

## [SECTION] overview

```
PROJECT:        [PROJECT NAME]
VERSION:        [arch version — e.g., 1.0.0]
STATUS:         DRAFT | REVIEWED | FINAL
LAST UPDATED:   [YYYY-MM-DD]
AUTHOR:         agent-architecture
```

This document is the architectural source of truth.
API contracts in #api-contracts are binding for all implementation agents.
Infrastructure topology in #infrastructure is binding for infra agent.

-----

## [SECTION] architectural-decisions

Summary of key decisions. Full rationale in docs/adr/.

```
DECISION:   [e.g., REST over GraphQL]
ADR:        adr_decision-001-api-protocol.md
STATUS:     ACCEPTED

DECISION:   [e.g., PostgreSQL as primary database]
ADR:        adr_decision-002-database.md
STATUS:     ACCEPTED
```

[One block per significant decision. All decisions have an ADR.]

-----

## [SECTION] system-overview

High-level description of the system’s components and their interactions.

```
COMPONENTS:
  [component-name]    [responsibility — one sentence]
  [component-name]    [responsibility — one sentence]

INTERACTIONS:
  [component-a] → [component-b]: [what flows between them]
  [component-b] → [component-c]: [what flows between them]

EXTERNAL DEPENDENCIES:
  [service name]      [what we use it for]
  [service name]      [what we use it for]
```

-----

## [SECTION] api-contracts

Binding for frontend and backend agents.
Any deviation requires Schema Change Protocol and Orchestrator sign-off.

```
ENDPOINT: [METHOD] [/path]
AUTH:     [required: bearer | api-key | none]
REQUEST:
  Body: {
    [field]: [type] — [required | optional] — [description]
  }
RESPONSE (200):
  {
    [field]: [type] — [description]
  }
RESPONSE (4xx):
  {
    "error": {
      "code": "[ERROR_CODE]",
      "message": "[human-readable description]"
    }
  }
STATUS CODES: [list all expected codes]
RATE LIMIT:   [requests per period — or: none]
```

[One block per endpoint. Complete before GATE-01.]

-----

## [SECTION] infrastructure

Binding for infra agent.

```
ARCHITECTURE PATTERN:
  [e.g., three-tier: client / API server / database]

COMPONENTS:
  [component]    [technology]    [size / tier]    [scaling]

DATA FLOWS:
  [describe how data moves between components]

NETWORKING:
  [describe network topology, ingress, internal communication]

SECRETS MANAGEMENT:
  [describe how secrets are stored and accessed]
```

-----

## [SECTION] security-architecture

Security decisions that constrain all implementation agents.

```
AUTHENTICATION:
  Protocol:     [JWT | session cookie | API key | OAuth2 — with specifics]
  Token expiry: [value from NFR-SEC-003]
  Storage:      [httpOnly cookie | Authorization header]

AUTHORIZATION:
  Model:        [RBAC | ABAC | owner-based]
  Enforcement:  [where authorization decisions are made]

TRANSPORT:
  Minimum TLS:  [1.2 | 1.3]
  Certificate:  [provider and renewal strategy]

ENCRYPTION AT REST:
  Scope:        [which data categories]
  Algorithm:    [AES-256 or equivalent]

INPUT VALIDATION:
  Strategy:     [validation layer location and approach]
```

-----

## [SECTION] scalability-design

Architectural patterns supporting NFRs in core_spec-non-functional.md.

```
BOTTLENECKS IDENTIFIED:
  [component]    [potential bottleneck]    [mitigation design]

HORIZONTAL SCALING:
  [which components scale horizontally and how]

CACHING STRATEGY:
  [what is cached, where, and for how long]

ASYNC PATTERNS:
  [what is processed asynchronously and why]
```

-----

## [SECTION] open-questions

Architectural decisions not yet finalized:

```
AQ-001
QUESTION:  [specific architectural question]
OPTIONS:   A) [option] B) [option]
IMPACT:    [what depends on this decision]
DEADLINE:  [before GATE-01]
STATUS:    OPEN
```

Empty when STATUS = FINAL. Open questions block GATE-01.