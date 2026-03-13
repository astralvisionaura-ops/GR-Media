# ADR-004: Client File Delivery — Supabase Storage with Signed URLs

```
STATUS:     ACCEPTED
DATE:       2026-03-13
AUTHOR:     agent-architecture
SUPERSEDES: —
CONTEXT:    GR-Media — Architecture phase (pre GATE-01)
```

-----

## Context

The client portal must securely deliver private files to individual clients: photo galleries (high-resolution JPEGs), invoices (PDFs), and contracts/documents (PDFs). These files are deliverables belonging to a specific client — they must never be publicly accessible, and access must be strictly limited to the authenticated client who owns the content. The delivery mechanism must generate time-limited access URLs, support download of individual files, and scale to gallery sizes of several hundred images per client without performance degradation. This is the most security-sensitive data flow in the system.

-----

## Decision Drivers

```
MUST:   Files must not be reachable via any public URL — private bucket only
MUST:   Access must be scoped to the authenticated client who owns the file (no cross-client access)
MUST:   Signed URLs must be time-limited (prevent URL sharing beyond session)
MUST:   GDPR Art. 25 — personal data (deliverables contain identifiable images of clients)
SHOULD: Leverage existing infrastructure (avoid a fourth vendor for storage only)
SHOULD: Support ZIP-style batch download for full gallery retrieval
COULD:  Image optimization/resizing for gallery thumbnails (avoid loading full-res for browse)
```

-----

## Options Considered

### Option A: Supabase Storage — Private Buckets with Signed URLs

Supabase Storage (built on top of AWS S3 in the selected EU Frankfurt region) supports private buckets. Access to private bucket objects requires a signed URL generated server-side by an authenticated Supabase client with service-role key. Signed URLs have a configurable expiry (1 second to 7 days). RLS policies on the `storage.objects` table enforce ownership — only the object's owning user (or admin) can request a signed URL for a given path. URLs are generated on-demand per API request and delivered to the client for one-time or time-limited use.

Pros:

- Same platform as auth and database — object ownership can be enforced by the same RLS policies
- Signed URL generation is a first-class Supabase Storage API (`createSignedUrl`)
- EU Frankfurt region — all client files stay in the EU (GDPR Art. 44)
- No fourth vendor; Supabase subscription already required
- Supabase Storage CDN (via Cloudflare) is enabled by default — thumbnail delivery is fast
- Path-based organization (`/{user_id}/{gallery_id}/{filename}`) maps naturally to the data model

Cons:

- Supabase Storage bandwidth costs accrue for large gallery downloads (high-res photos)
- Image transformation (on-the-fly resizing for thumbnails) is available but in beta on Supabase Storage; not recommended for production reliance
- For galleries with 300+ images, thumbnail generation must be pre-computed at upload time or delegated to Cloudinary

### Option B: AWS S3 — Private Buckets with Pre-Signed URLs

Direct AWS S3 with a separate IAM user, private bucket policy, and pre-signed URL generation via `@aws-sdk/s3`.

Pros:

- Industry standard; most mature signed URL implementation
- Fine-grained IAM policies; bucket replication, versioning, lifecycle policies available
- Image Lambda@Edge transformations possible for thumbnails

Cons:

- Fourth vendor — separate AWS account, IAM configuration, billing, and monitoring
- No integration with Supabase RLS — access control must be re-implemented in application code
- Signed URLs generated server-side in Next.js API route — functionally identical to Supabase but more setup
- GDPR: S3 EU region available but requires explicit bucket region configuration and data processing agreement with AWS separately
- Operational complexity disproportionate to the use case

### Option C: Cloudinary — Asset Management with Signed Access

Cloudinary is a media management CDN with URL-based image transformations, signed URL access, and automatic format optimization.

Pros:

- Best-in-class image transformation — thumbnail generation, WebP conversion, responsive srcsets are built-in
- Signed URL support available
- Portfolio public images would also benefit from Cloudinary CDN

Cons:

- Primarily designed for public media with optional access control — private asset delivery is a secondary use case
- Access tokens in Cloudinary are media-specific but not integrated with user identity; ownership must still be enforced at application layer
- Separate vendor and billing from Supabase; pricing is based on bandwidth and transformations
- Files leave EU if Cloudinary's regional settings are not explicitly configured (requires enterprise plan for EU-only routing)
- Invoices and contracts as PDFs are not a media management problem — forcing PDFs through Cloudinary is semantically wrong

-----

## Decision

**Chosen: Option A — Supabase Storage with Signed URLs**

Supabase Storage satisfies all MUST requirements: private buckets, signed URLs with configurable expiry, and ownership enforced at the RLS level using the same auth.uid() available across the entire platform. Keeping all three backend concerns (auth, data, files) on Supabase eliminates a fourth vendor, maintains EU data residency without additional configuration, and allows ownership validation to be expressed once in RLS policy rather than duplicated in application code. For thumbnail optimization, pre-computed thumbnails will be generated at upload time and stored as a separate path in the same bucket — this is more reliable than depending on Supabase's beta transform API. If image transformation requirements grow, Cloudinary can be added alongside Supabase Storage for public portfolio images only (not client files).

-----

## File Organization Pattern

```
Storage bucket: client-files (PRIVATE)
  /{client_user_id}/
    /galleries/{gallery_id}/
      /originals/{filename}.jpg     — full resolution, download
      /thumbs/{filename}_thumb.jpg  — pre-computed 600px thumbnail, browse view
    /documents/{document_id}/
      {filename}.pdf                — invoices, contracts

Storage bucket: portfolio-assets (PUBLIC)
  /portfolio/{category}/{filename}.jpg    — public portfolio images
  /blog/{post_slug}/{filename}.jpg        — blog post images
```

Signed URL expiry policy:
- Gallery thumbnail browse: 1 hour (refresh on portal page load)
- Full-resolution download: 5 minutes (short window, per-file)
- Invoice/contract download: 5 minutes (per-file, per-request)

-----

## Consequences

```
POSITIVE:
  - All client files are inaccessible without a valid signed URL — no public exposure vector
  - RLS on storage.objects ensures a client cannot request a signed URL for another client's path
  - Short expiry on download URLs limits the blast radius of a leaked URL
  - EU Frankfurt region keeps client files within GDPR jurisdiction
  - Thumbnail pre-computation at upload eliminates runtime image transform dependency

NEGATIVE:
  - Every file view requires a server-side signed URL generation call — adds latency per gallery page load
  - Supabase Storage bandwidth is metered — large galleries generate cost at download time
  - Pre-computing thumbnails requires a server-side process at upload (Next.js API route or Supabase Edge Function)
  - No ZIP batch download out of the box — must be implemented as a server-side stream via API route

RISKS:
  - Signed URL leakage (client copies URL and shares): mitigated by short expiry (5 min for downloads)
  - RLS policy misconfiguration on storage.objects allows cross-client access.
    Mitigation: explicit integration tests that attempt cross-client file access; reviewed at GATE-05.
  - Supabase Storage CDN caches responses — ensure private bucket objects are never accidentally
    served from cache without auth. Mitigation: private bucket CDN caching is disabled by default
    in Supabase; validate this in configuration review.

REVISIT WHEN:
  - Gallery sizes consistently exceed 500 images — evaluate S3 Multipart + Presigned POST for upload
  - Batch download (ZIP) is a frequent user request — evaluate server-side streaming ZIP generation
  - Image quality requirements demand on-the-fly resizing — evaluate Cloudinary for portfolio images only
```

-----

## Privacy by Design Assessment *(GDPR Art. 25)*

```
PERSONAL DATA INVOLVED: YES
  Client files include identifiable photographs of individuals (wedding guests, portrait subjects),
  invoices with client names and addresses, and contracts. All qualify as personal data
  under GDPR Art. 4(1). Client photographs may incidentally contain biometric-adjacent data
  (recognizable faces) — this does not trigger Art. 9 biometric data processing as the
  photographs are not processed for biometric identification.

[x] Data Minimisation   — only files explicitly assigned to a client are stored in their path;
                          no metadata beyond filename, size, and upload timestamp collected
[x] Purpose Limitation  — files stored for client delivery only; not used for analytics,
                          training, or any secondary purpose
[x] Storage Limitation  — files deleted when the client account is deleted (Art. 17);
                          retention period: files retained for 2 years post-project completion,
                          then deleted. Defined in data model.
[x] Privacy by Default  — private bucket by default; no public URLs generated unless explicitly
                          for portfolio (separate bucket)
[x] Data Portability    — client can download all their files via the portal (Art. 20);
                          admin can export a client's complete file set on request
[x] Access Control      — RLS policy on storage.objects: client can only access files
                          under their own user_id path; admin has unrestricted access

GAPS IDENTIFIED:
  [ ] Thumbnail images (pre-computed) are derived from originals — if originals are deleted,
      thumbnails must also be deleted. Mitigation: deletion cascade must cover thumbs/ path.
      Tracked as a data model requirement.

DPIA REQUIRED: NO
  Rationale: Delivery of personal photographs to the subject is the primary processing purpose.
  Not large-scale; not systematic monitoring; not special category data under Art. 9.
  Individuals depicted in wedding/portrait photos are not the "data subjects" for GDPR portal
  purposes (they are subjects of the photos, not users of the system).
  If facial recognition or automated processing of image content is ever added, DPIA is required.
```
