# prd_spec-handoff.md

# docs/prd/prd_spec-handoff.md | Handoff Document

-----

## [CONTEXT]

INHERITS:   _prd-base.md
PHASE:      POST-RELEASE
AUDIENCE:   Future team members, maintainers, operations

-----

## [SECTION] document-header

```
PROJECT:        [PROJECT NAME]
VERSION:        [product version at handoff]
STATUS:         DRAFT | IN REVIEW | APPROVED
DATE:           [YYYY-MM-DD]
PREPARED BY:    [Instructor or: drafted by orchestrator]
```

-----

## [SECTION] project-summary

For someone taking over this project cold:

```
WHAT THIS IS:
  [Three sentences maximum. What the product does, who uses it, why it exists.]

CURRENT STATE:
  [Is it in production? How many users? What phase of development?]

CRITICAL CONTEXT:
  [What does a new person most need to know that is not obvious from the code?
   Unusual decisions, hard-won lessons, non-obvious constraints.]
```

-----

## [SECTION] system-access

```
ENVIRONMENT        ACCESS METHOD          OWNER / CONTACT
──────────────────────────────────────────────────────────
Production         [how to access]        [contact]
Staging            [how to access]        [contact]
Source code        [repository URL]       [contact]
CI/CD              [platform + URL]       [contact]
Monitoring         [platform + URL]       [contact]
Secrets vault      [platform + URL]       [contact]
```

-----

## [SECTION] runbook

Most likely operational tasks and how to perform them:

```
TASK:         [common operation — e.g., deploy a new version]
STEPS:        [numbered steps]
NOTES:        [gotchas or non-obvious requirements]
ROLLBACK:     [how to undo if it goes wrong]

TASK:         [second common operation]
STEPS:        [numbered steps]
NOTES:        [—]
ROLLBACK:     [—]
```

-----

## [SECTION] known-issues

Open issues and limitations the new owner should be aware of:

```
ISSUE:        [description]
IMPACT:       [user-facing or operational impact]
WORKAROUND:   [current workaround — or: none]
PRIORITY:     [HIGH | MEDIUM | LOW]
TRACKING:     [issue tracker reference — or: —]
```

-----

## [SECTION] architectural-debt

Technical debt worth documenting:

```
ITEM:         [what it is]
WHY IT EXISTS: [decision that created it]
COST:         [current impact on development or operations]
REMEDIATION:  [how to fix it and rough effort estimate]
PRIORITY:     [HIGH | MEDIUM | LOW]
```

-----

## [SECTION] contacts

```
ROLE                NAME / TEAM             CONTACT METHOD
──────────────────────────────────────────────────────────
Product Owner       [name]                  [contact]
Technical Lead      [name]                  [contact]
On-call (primary)   [name]                  [contact]
On-call (secondary) [name]                  [contact]
External: [vendor]  [name]                  [contact + support tier]
```