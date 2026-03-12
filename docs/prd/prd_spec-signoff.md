# prd_spec-signoff.md

# docs/prd/prd_spec-signoff.md | Release Sign-Off

-----

## [CONTEXT]

INHERITS:   _prd-base.md
PHASE:      PRE-RELEASE — required before GATE-05 (Class 3+)
AUDIENCE:   Instructor, stakeholders, auditors

-----

## [SECTION] document-header

```
PROJECT:        [PROJECT NAME]
VERSION:        [release version]
STATUS:         PENDING | SIGNED
DATE:           [YYYY-MM-DD]
GATE:           GATE-05
```

-----

## [SECTION] release-summary

```
RELEASE VERSION:    [version number]
RELEASE TYPE:       INITIAL | FEATURE | PATCH | SECURITY | HOTFIX
RELEASE DATE:       [planned date]

WHAT IS INCLUDED:
  [Three to five sentences describing what this release contains.
   Written for a non-technical stakeholder.]

WHAT IS NOT INCLUDED:
  [Deferred items — prevents misunderstanding after release.]
```

-----

## [SECTION] quality-gate-status

```
GATE-01 (Architecture Review):
  STATUS:    PASS | FAIL | WAIVED
  DATE:      [YYYY-MM-DD]
  NOTES:     [open items accepted — or: —]

GATE-03 (Staging Validation):
  STATUS:    PASS | FAIL | WAIVED
  DATE:      [YYYY-MM-DD]
  NOTES:     [—]

GATE-04 (Infra Readiness):
  STATUS:    PASS | FAIL | WAIVED
  DATE:      [YYYY-MM-DD]
  NOTES:     [—]

GATE-05 (Release Approval):
  STATUS:    PENDING — awaiting sign-off below
  DATE:      [YYYY-MM-DD]
```

-----

## [SECTION] acceptance-criteria-status

```
TOTAL CRITERIA (MUST):    [N]
CRITERIA PASSED:          [N]
CRITERIA FAILED:          [N — must be 0 for sign-off]
CRITERIA PENDING:         [N — must be 0 for sign-off]

SOURCE: qa_spec-acceptance-criteria.md v[N]
```

-----

## [SECTION] compliance-status

```
ACTIVE FRAMEWORKS:        [list]
CRITICAL FINDINGS OPEN:   [N — must be 0 for sign-off]
HIGH FINDINGS OPEN:       [N — must be 0 for Class 3+]
ACCEPTED RISKS:           [N — each documented with Instructor approval]

SOURCE: qa_spec-conformance.md v[N]
```

-----

## [SECTION] known-risks

Risks accepted at release by Instructor:

```
RISK:         [description]
SEVERITY:     [HIGH | MEDIUM | LOW]
MITIGATION:   [what is in place to reduce impact]
ACCEPTED BY:  [Instructor name]
DATE:         [YYYY-MM-DD]
```

-----

## [SECTION] sign-off

```
I have reviewed this release document and the referenced quality gate results.
I confirm that this release meets the acceptance criteria and compliance
standards documented above, and I authorize production deployment.

NAME:         [Instructor name]
ROLE:         [role]
DATE:         [YYYY-MM-DD]
SIGNATURE:    [physical | digital | confirmed in audit log]

AUDIT LOG REF: [qa_log-audit.md entry date and time]
```

-----

## [SECTION] class-4-additional-sign-off

Required for Class 4 only:

```
REGULATORY REVIEW:
  REVIEWER:     [name and role]
  ORGANIZATION: [internal legal | external counsel | regulatory consultant]
  DATE:         [YYYY-MM-DD]
  FINDING:      [approved for release | conditional approval | not approved]
  CONDITIONS:   [list conditions if conditional — or: —]

TECHNICAL DOCUMENTATION:
  COMPLETE:     YES | NO
  LOCATION:     [document location or repository]
  VERSION:      [version at sign-off]
```