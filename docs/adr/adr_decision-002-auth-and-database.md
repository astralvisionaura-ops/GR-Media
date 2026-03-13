# ADR-002: Auth and Database — Supabase

```
STATUS:     ACCEPTED
DATE:       2026-03-13
AUTHOR:     agent-architecture
SUPERSEDES: —
CONTEXT:    GR-Media — Architecture phase (pre GATE-01)
```

-----

## Context

GR-Media Class 2 requires a backend for authenticated client portal access, persistent storage of user accounts and client data (galleries, invoices, contracts), and secure file delivery. These three concerns — auth, relational storage, and object storage — must integrate cleanly and be operable by a single developer without a dedicated DevOps function. The system handles personal data (EU clients), which means the storage provider must be GDPR-compliant, with data residency in the EU achievable.

-----

## Decision Drivers

```
MUST:   Auth must be production-grade — no home-rolled password hashing or session management
MUST:   Personal data stored within the EU (GDPR Art. 44 — no unsanctioned cross-border transfer)
MUST:   Object storage supports private buckets with signed URL access (client files must not be publicly accessible)
MUST:   Row-level security (RLS) must be enforceable at the database layer
SHOULD: Single vendor for auth + DB + storage to minimize integration surface
SHOULD: Manageable by one developer; no dedicated DB admin required
COULD:  Free or low-cost tier available during development
```

-----

## Options Considered

### Option A: Supabase (Auth + PostgreSQL + Storage)

Supabase is an open-source Firebase alternative providing a managed PostgreSQL database, Auth (email/password, OAuth, magic link), and object storage — all on the same platform. Row-level security policies are a first-class feature, directly expressible in SQL. The `@supabase/ssr` package provides official Next.js App Router middleware integration. Supabase Cloud offers EU data residency on paid plans (Frankfurt, eu-central-1).

Pros:

- Single platform: auth, PostgreSQL, and object storage in one — no multi-vendor integration complexity
- RLS policies enforced at database level — bypass is architecturally prevented for all queries going through Supabase client
- Signed URL support for private buckets is native — file delivery (ADR-004) integrates without custom middleware
- `@supabase/ssr` is purpose-built for Next.js App Router; cookie-based session is the default pattern
- EU region available (Frankfurt) — GDPR Art. 44 satisfied without SCCs
- Supabase is open-source — self-hosting is possible if vendor lock-in becomes a concern
- PostgreSQL: standard, portable, well-understood by any backend developer

Cons:

- Auth and DB are coupled to Supabase — migration is non-trivial (requires db dump + auth user export)
- Free tier has inactivity pausing; paid plan required for production
- Supabase Auth is less configurable than Auth.js for complex OAuth flows (not a current requirement)
- Supabase Storage is not a CDN by default — image delivery for gallery thumbnails requires additional configuration (see ADR-004)

### Option B: Auth.js + PlanetScale + AWS S3

Auth.js (formerly NextAuth.js) handles session management; PlanetScale provides a serverless MySQL-compatible database; S3 handles object storage. This stack has maximum flexibility but three separate vendors.

Pros:

- Auth.js is deeply integrated with Next.js App Router (first-party package)
- PlanetScale's branching model is excellent for schema migrations
- S3 is the most mature object storage with fine-grained IAM policies

Cons:

- Three vendors to configure, monitor, bill, and secure
- PlanetScale is MySQL — no native PostgreSQL; RLS must be implemented in application code, not database layer
- Auth.js requires a database adapter and session store configuration — more moving parts
- S3 cross-origin signed URL setup requires IAM policy expertise
- PlanetScale discontinued its free tier in 2024; pricing comparable to Supabase paid plan
- No single EU-only data residency guarantee across all three vendors

### Option C: Firebase (Auth + Firestore + Cloud Storage)

Google Firebase offers a comparable BaaS with real-time capabilities, Auth, NoSQL Firestore, and Cloud Storage.

Pros:

- Mature platform with excellent Next.js examples
- Real-time data capabilities (overkill but available)

Cons:

- Firestore is a NoSQL document database — relational data model (galleries→images, users→documents) is awkward without joins
- Security rules language (Firestore Security Rules) is proprietary — harder to audit and migrate
- Google Cloud data residency in EU is available but more complex to configure than Supabase
- Firebase vendor lock-in is deeper than Supabase (proprietary query language, no SQL export)

-----

## Decision

**Chosen: Option A — Supabase (Auth + PostgreSQL + Storage)**

Supabase satisfies every MUST requirement: production-grade auth with no custom session management, EU data residency on the Frankfurt region, private buckets with signed URL delivery, and PostgreSQL RLS as a first-class feature. The single-vendor approach eliminates multi-vendor integration complexity, which is the right tradeoff for a single-developer project prioritizing quality and stability. PostgreSQL is a portable, standard choice — Supabase's open-source nature means self-hosting is a viable exit path. Auth.js + PlanetScale was the closest alternative but introduces three vendors, application-layer RLS (weaker security guarantee), and no comparable storage integration.

-----

## Consequences

```
POSITIVE:
  - RLS policies enforce data isolation at the database layer — no query can bypass client ownership checks
  - Auth, DB, and storage share the same JWT — no cross-service token exchange required
  - EU Frankfurt region satisfies GDPR data residency without SCCs or additional legal review
  - Supabase dashboard provides audit trail of auth events for GDPR compliance evidence
  - PostgreSQL schemas are standard SQL — migrations are portable

NEGATIVE:
  - Production requires paid Supabase plan (no free tier for always-on projects)
  - Migrating away from Supabase Auth is significant effort (user UUIDs are Supabase-issued)
  - RLS policies must be reviewed on every schema change — incorrect policies are a silent security gap

RISKS:
  - RLS policies misconfiguration: a missing policy could expose one client's data to another.
    Mitigation: All RLS policies must be reviewed in code review; backend agent must run
    cross-tenant access tests before GATE-05. QM agent validates isolation in test suite.
  - Supabase service outage affects auth, DB, and storage simultaneously (single point of failure).
    Mitigation: Acceptable for a Class 2 single-photographer business — not a 24/7 critical system.
    Revisit if SLA requirements are introduced.
  - Supabase Auth does not support hardware MFA (TOTP only).
    Mitigation: TOTP is sufficient for client portal use case. Not a regulated system.

REVISIT WHEN:
  - Portal exceeds 1,000 active client accounts — evaluate dedicated auth service.
  - SLA or uptime requirements are formalized — evaluate multi-region or self-hosted Supabase.
  - E-commerce is added to scope — evaluate PCI DSS implications for data residency.
```

-----

## Privacy by Design Assessment *(GDPR Art. 25)*

```
PERSONAL DATA INVOLVED: YES
  Supabase stores user accounts (email, hashed password), client portal data,
  and client files. All are personal data under GDPR Art. 4(1).

[x] Data Minimisation   — auth collects email + password only; no name, phone, or address at registration
[x] Purpose Limitation  — Supabase Auth data used for authentication only; not shared with analytics
[x] Storage Limitation  — user accounts deleted on client request (Art. 17); retention policy
                          defined in data model (see core_arch-data-model.md)
[x] Privacy by Default  — RLS ensures no data visible without authenticated session
[x] Data Portability    — Supabase supports JSON export of user data via admin API (Art. 20)
[x] Access Control      — RLS policies bind every query to auth.uid(); no shared queries across clients

GAPS IDENTIFIED:
  [ ] Supabase audit logs (Auth events) must be retained per GDPR accountability principle (Art. 5(2)).
      Mitigation: Enable Supabase log retention (paid plan); export monthly to durable storage.

DPIA REQUIRED: NO
  Rationale: Single-photographer business; not large-scale processing; no special category data (Art. 9);
  no systematic monitoring; no cross-border transfers (EU Frankfurt region).
  Note: If invoice data includes health/family information in future, reassess.
```
