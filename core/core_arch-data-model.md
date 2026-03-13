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
PROJECT:        GR-Media
VERSION:        1.0.0
STATUS:         FINAL
LAST UPDATED:   2026-03-13
AUTHOR:         agent-architecture
```

This document is the data schema source of truth for GR-Media.
Schema here is binding for backend agent implementation.
Changes after GATE-01 require Schema Change Protocol (see #change-protocol).

All tables live in Supabase PostgreSQL. Row-Level Security (RLS) is enabled on
all portal tables. The public schema is used unless noted otherwise.
Supabase Auth manages the `auth.users` table — it is not redefined here.

-----

## [SECTION] schema

---

```
ENTITY: client_profile
TABLE:  public.client_profiles
RLS:    ENABLED
NOTE:   Extends Supabase auth.users with portal-specific fields.
        Created automatically via Supabase trigger on auth.users INSERT.
──────────────────────────────────────────────────────────────────────────────
COLUMN            TYPE              CONSTRAINTS                   DESCRIPTION
id                uuid              PK, FK auth.users.id          Supabase Auth user UUID
display_name      text              NOT NULL                      Client display name (first name or full name)
email             text              NOT NULL, UNIQUE              Email address (mirrors auth.users.email)
phone             text              NULL                          Optional phone number
notes             text              NULL                          Internal photographer notes (not visible to client)
created_at        timestamptz       NOT NULL, DEFAULT now()       Account creation timestamp
updated_at        timestamptz       NOT NULL, DEFAULT now()       Last profile update
deleted_at        timestamptz       NULL                          Soft-delete timestamp (GDPR Art. 17 erasure)

POLICIES:
  SELECT: "client reads own profile"    (auth.uid() = id)
  UPDATE: "client updates own profile"  (auth.uid() = id AND deleted_at IS NULL)
  SELECT: "admin reads all profiles"    (auth.uid() IN (SELECT id FROM public.admins))
  UPDATE: "admin updates all profiles"  (auth.uid() IN (SELECT id FROM public.admins))

PII: display_name, email, phone, notes
INDEXES:
  idx_client_profiles_email ON (email) — lookup by email
  idx_client_profiles_deleted_at ON (deleted_at) — filter soft-deleted accounts
```

---

```
ENTITY: admin
TABLE:  public.admins
RLS:    ENABLED
NOTE:   Simple allowlist of admin user IDs. Initially one row (photographer).
        Not a role system — admin = can do everything.
──────────────────────────────────────────────────────────────────────────────
COLUMN            TYPE              CONSTRAINTS                   DESCRIPTION
id                uuid              PK, FK auth.users.id          Supabase Auth user UUID
created_at        timestamptz       NOT NULL, DEFAULT now()       When admin access was granted

POLICIES:
  SELECT: "admin reads admin table"     (auth.uid() IN (SELECT id FROM public.admins))
  INSERT: "no self-promotion"           (FALSE — only via Supabase SQL editor / migration)
  DELETE: "no self-demotion"            (FALSE — only via Supabase SQL editor / migration)

PII: none (id is a UUID — not directly identifiable without cross-reference)
INDEXES:
  — (PK index is sufficient)
```

---

```
ENTITY: gallery
TABLE:  public.galleries
RLS:    ENABLED
──────────────────────────────────────────────────────────────────────────────
COLUMN            TYPE              CONSTRAINTS                   DESCRIPTION
id                uuid              PK, DEFAULT gen_random_uuid() Gallery UUID
client_user_id    uuid              NOT NULL, FK client_profiles.id  Owning client
name              text              NOT NULL                      Gallery display name (e.g., "Wedding — June 2024")
description       text              NULL                          Optional gallery description
cover_image_path  text              NULL                          Storage path to cover thumbnail
created_at        timestamptz       NOT NULL, DEFAULT now()       Gallery creation timestamp
updated_at        timestamptz       NOT NULL, DEFAULT now()       Last update
deleted_at        timestamptz       NULL                          Soft-delete (gallery removed from portal)

POLICIES:
  SELECT: "client views own galleries"   (auth.uid() = client_user_id AND deleted_at IS NULL)
  SELECT: "admin views all galleries"    (auth.uid() IN (SELECT id FROM public.admins))
  INSERT: "admin creates galleries"      (auth.uid() IN (SELECT id FROM public.admins))
  UPDATE: "admin updates galleries"      (auth.uid() IN (SELECT id FROM public.admins))
  DELETE: "admin soft-deletes galleries" (auth.uid() IN (SELECT id FROM public.admins))

PII: none directly (name may incidentally reference client — treat as potentially sensitive)
INDEXES:
  idx_galleries_client_user_id ON (client_user_id) — list galleries per client
  idx_galleries_deleted_at ON (deleted_at)         — filter soft-deleted
```

---

```
ENTITY: gallery_image
TABLE:  public.gallery_images
RLS:    ENABLED
──────────────────────────────────────────────────────────────────────────────
COLUMN            TYPE              CONSTRAINTS                   DESCRIPTION
id                uuid              PK, DEFAULT gen_random_uuid() Image UUID
gallery_id        uuid              NOT NULL, FK galleries.id     Parent gallery
storage_path      text              NOT NULL                      Supabase Storage path to original (private bucket)
thumb_path        text              NOT NULL                      Supabase Storage path to 600px thumbnail
filename          text              NOT NULL                      Original filename (display only)
width             integer           NOT NULL                      Original image width in pixels
height            integer           NOT NULL                      Original image height in pixels
filesize_bytes    bigint            NOT NULL                      File size in bytes
sort_order        integer           NOT NULL, DEFAULT 0           Display order within gallery
created_at        timestamptz       NOT NULL, DEFAULT now()       Upload timestamp
deleted_at        timestamptz       NULL                          Soft-delete (image removed)

POLICIES:
  SELECT: "client views images in own galleries"
          (auth.uid() = (SELECT client_user_id FROM galleries WHERE id = gallery_id))
  SELECT: "admin views all images"   (auth.uid() IN (SELECT id FROM public.admins))
  INSERT: "admin uploads images"     (auth.uid() IN (SELECT id FROM public.admins))
  UPDATE: "admin updates images"     (auth.uid() IN (SELECT id FROM public.admins))
  DELETE: "admin soft-deletes images" (auth.uid() IN (SELECT id FROM public.admins))

PII: storage_path / thumb_path may reference identifiable subjects (photographs of people)
     — treated as personal data under GDPR Art. 4(1)
INDEXES:
  idx_gallery_images_gallery_id ON (gallery_id)          — list images per gallery
  idx_gallery_images_sort ON (gallery_id, sort_order)    — ordered gallery display
  idx_gallery_images_deleted_at ON (deleted_at)          — filter soft-deleted
```

---

```
ENTITY: document
TABLE:  public.documents
RLS:    ENABLED
NOTE:   Stores invoices, contracts, and other client documents (all as PDFs).
──────────────────────────────────────────────────────────────────────────────
COLUMN            TYPE              CONSTRAINTS                   DESCRIPTION
id                uuid              PK, DEFAULT gen_random_uuid() Document UUID
client_user_id    uuid              NOT NULL, FK client_profiles.id  Owning client
name              text              NOT NULL                      Display name (e.g., "Invoice #2024-003")
type              document_type     NOT NULL                      invoice | contract | other
storage_path      text              NOT NULL                      Supabase Storage path (private bucket)
filename          text              NOT NULL                      Original filename
filesize_bytes    bigint            NOT NULL                      File size in bytes
created_at        timestamptz       NOT NULL, DEFAULT now()       Upload/creation timestamp
deleted_at        timestamptz       NULL                          Soft-delete

POLICIES:
  SELECT: "client views own documents"   (auth.uid() = client_user_id AND deleted_at IS NULL)
  SELECT: "admin views all documents"    (auth.uid() IN (SELECT id FROM public.admins))
  INSERT: "admin creates documents"      (auth.uid() IN (SELECT id FROM public.admins))
  UPDATE: "admin updates documents"      (auth.uid() IN (SELECT id FROM public.admins))
  DELETE: "admin soft-deletes documents" (auth.uid() IN (SELECT id FROM public.admins))

PII: name (references client), storage_path (contains invoice with name/address data)
     — documents are personal data under GDPR Art. 4(1)
INDEXES:
  idx_documents_client_user_id ON (client_user_id)       — list documents per client
  idx_documents_type ON (client_user_id, type)           — filter by type per client
  idx_documents_deleted_at ON (deleted_at)               — filter soft-deleted
```

---

```
ENTITY: blog_post_meta
TABLE:  public.blog_post_meta
RLS:    DISABLED (public read; no personal data)
NOTE:   Lightweight metadata mirror of Git/markdown blog posts.
        Content lives in /content/blog/*.md — this table is NOT the source of truth for content.
        Purpose: enables fast server-side listing/search without filesystem reads at runtime.
        Populated at build time via a migration or seed script. Optional — can be omitted
        if Next.js filesystem-based blog is sufficient. Include if blog index needs DB queries.
──────────────────────────────────────────────────────────────────────────────
COLUMN            TYPE              CONSTRAINTS                   DESCRIPTION
slug              text              PK                            URL slug (matches filename without .md)
title             text              NOT NULL                      Post title
excerpt           text              NOT NULL                      Short description for index + meta
cover_image_url   text              NULL                          Cover image URL (Supabase Storage or /public)
tags              text[]            NOT NULL, DEFAULT '{}'        Tag array for filtering
published_at      date              NOT NULL                      Publication date (from frontmatter)
draft             boolean           NOT NULL, DEFAULT FALSE       If true: excluded from public index
created_at        timestamptz       NOT NULL, DEFAULT now()       Record creation timestamp

POLICIES:
  — (RLS disabled; table is append-only from build pipeline; no auth required for reads)

PII: none
INDEXES:
  idx_blog_post_meta_published_at ON (published_at DESC)  — chronological listing
  idx_blog_post_meta_draft ON (draft)                     — filter drafts
```

---

```
ENTITY: contact_submission
TABLE:  public.contact_submissions
RLS:    ENABLED
NOTE:   Optional audit log of contact form submissions.
        NOT required — contact form can be email-only (no DB write).
        Include only if photographer needs a submission history in the portal.
        If included: data must not be retained beyond purpose (GDPR storage limitation).
──────────────────────────────────────────────────────────────────────────────
COLUMN            TYPE              CONSTRAINTS                   DESCRIPTION
id                uuid              PK, DEFAULT gen_random_uuid() Submission UUID
name              text              NOT NULL                      Sender name
email             text              NOT NULL                      Sender email
message           text              NOT NULL                      Message content
submitted_at      timestamptz       NOT NULL, DEFAULT now()       Submission timestamp
ip_hash           text              NULL                          SHA-256 of IP (not raw IP — proportionality)
deleted_at        timestamptz       NULL                          Soft-delete / erasure

POLICIES:
  SELECT: "admin reads submissions"  (auth.uid() IN (SELECT id FROM public.admins))
  INSERT: none (insert via service role key in API route only)
  DELETE: "admin deletes submissions" (auth.uid() IN (SELECT id FROM public.admins))

PII: name, email, message — all personal data under GDPR Art. 4(1)
RETENTION: 90 days from submission_at — automatic deletion via pg_cron or Supabase scheduled function
INDEXES:
  idx_contact_submissions_submitted_at ON (submitted_at DESC) — recent-first listing
```

-----

## [SECTION] relationships

```
auth.users ──── client_profiles       one-to-one (Supabase user → portal profile)
auth.users ──── admins                one-to-one (optional — not all users are admins)

client_profiles ──< galleries         one-to-many (one client has many galleries)
galleries       ──< gallery_images    one-to-many (one gallery has many images)
client_profiles ──< documents         one-to-many (one client has many documents)

Ownership chain for access control:
  gallery_image.gallery_id → galleries.client_user_id → auth.uid()
  document.client_user_id  → auth.uid()

Cascade behavior:
  client_profiles.deleted_at set → galleries must be soft-deleted (application logic)
  gallery.deleted_at set → gallery_images remain in storage but are inaccessible (RLS)
  GDPR erasure: hard delete of client_profiles removes all FK-linked data (ON DELETE CASCADE)
               OR application-layer erasure job that clears all rows + storage paths
```

-----

## [SECTION] enumerations

```
ENUM: document_type
VALUES:
  invoice     An invoice issued to the client
  contract    A signed contract or service agreement
  other       Any other document (shoot brief, mood board, etc.)
USED IN: documents.type
```

```
ENUM: (soft-delete pattern — not a PostgreSQL ENUM)
NOTE: All tables with deleted_at use the soft-delete pattern:
  deleted_at IS NULL  → record is active
  deleted_at IS NOT NULL → record is archived / soft-deleted
  Hard deletion is performed only on GDPR erasure request (Art. 17).
```

-----

## [SECTION] storage-strategy

```
DATABASE (Supabase PostgreSQL):
  Stores: all relational metadata — user profiles, gallery records, image metadata,
          document records, blog post metadata
  Does NOT store: file content, image binaries, PDF content

OBJECT STORAGE (Supabase Storage):
  Bucket: client-files  (PRIVATE — no public access)
    /{client_user_id}/galleries/{gallery_id}/originals/{uuid}.jpg
    /{client_user_id}/galleries/{gallery_id}/thumbs/{uuid}_thumb.jpg
    /{client_user_id}/documents/{document_id}/{uuid}.pdf

  Bucket: portfolio-assets  (PUBLIC — CDN-served)
    /portfolio/{category}/{filename}.jpg
    /blog/{slug}/{filename}.jpg

  Access model:
    client-files bucket: RLS on storage.objects mirrors client ownership
    portfolio-assets bucket: public read, admin write only

FILE NAMING:
  All stored objects use UUID filenames (not original filenames) to prevent
  path enumeration and filename-based disclosure. Original filename stored
  in DB (gallery_images.filename, documents.filename) for display only.
```

-----

## [SECTION] access-control-model

```
ROLE          SCOPE                               MECHANISM
─────────────────────────────────────────────────────────────────────────────
anonymous     Public site only — no DB access     No Supabase session
client        Own galleries + own documents only  RLS: auth.uid() = client_user_id
admin         All client data + all storage       RLS: auth.uid() IN admins table +
                                                  service role key for admin API routes

CROSS-TENANT ISOLATION GUARANTEE:
  Every SELECT on galleries, gallery_images, documents filters by client_user_id = auth.uid().
  Even if an API bug passes the wrong ID, the RLS policy at the DB layer returns 0 rows.
  This is the primary isolation guarantee.

ADMIN ACCESS PATTERN:
  Admin operations (upload file, create gallery, assign to client) use the Supabase
  service role key in server-side API routes. Service role bypasses RLS — this is
  intentional for admin operations but must NEVER be used in client-facing routes.
  Rule: service role key is only imported in files under /src/server/admin/**.
```

-----

## [SECTION] pii-registry

Complete list of personal data fields. GDPR is active on this project.

```
ENTITY               COLUMN           DATA CATEGORY              LEGAL BASIS
─────────────────────────────────────────────────────────────────────────────
auth.users           email            Contact identifier          Art.6(1)(b) contract
auth.users           (password hash)  Credentials (hashed)       Art.6(1)(b) contract
client_profiles      display_name     Name                        Art.6(1)(b) contract
client_profiles      email            Contact identifier          Art.6(1)(b) contract
client_profiles      phone            Contact identifier          Art.6(1)(f) legitimate interest
client_profiles      notes            Internal notes (admin-only) Art.6(1)(f) legitimate interest
gallery_images       storage_path     Photographs of persons      Art.6(1)(b) contract (delivery)
documents            storage_path     Invoice/contract data       Art.6(1)(b) contract (invoicing)
documents            name             Document reference name     Art.6(1)(b) contract
contact_submissions  name             Name                        Art.6(1)(a) consent (form consent checkbox)
contact_submissions  email            Contact identifier          Art.6(1)(a) consent
contact_submissions  message          Free-text (may contain PII) Art.6(1)(a) consent
contact_submissions  ip_hash          Pseudonymous network ID     Art.6(1)(f) legitimate interest (spam prevention)
```

RETENTION SCHEDULE:
```
ENTITY               RETENTION           DELETION MECHANISM
─────────────────────────────────────────────────────────────────────────────
client_profiles      Duration of client relationship + 2 years (invoicing / legal)
                                         Manual admin action or GDPR erasure request
gallery_images       Duration of client relationship + 2 years
                                         Storage path cleared on hard delete
documents            10 years (German commercial law — HGB §257 for invoices)
                                         Admin-triggered; not auto-deleted
contact_submissions  90 days             Automated deletion (pg_cron or Edge Function)
auth.users           Deleted with client_profiles (cascade via Supabase admin API)
```

-----

## [SECTION] migration-history

Append-only log of schema changes after GATE-01.

No migrations before GATE-01. Schema is settled at specification.

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
