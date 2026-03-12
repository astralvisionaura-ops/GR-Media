# _prd-base.md

# docs/prd/_prd-base.md | PRD Base

-----

## [CONTEXT]

INHERITS:   —
PHASE:      loaded when any docs/prd/ file is active
AUDIENCE:   Orchestrator, Instructor, all agents

-----

## [SECTION] prd-principles

PR-01  PRD files are deliverables — they leave the project.
They are written for readers who were not in the room.

PR-02  PRD content is the Instructor’s voice — shaped by the team.
Agents draft. Instructor approves. No PRD section is agent opinion.

PR-03  PRD is stable after GATE-01.
Changes after specification require Instructor decision + audit log entry.

PR-04  PRD is the source of truth for requirements.
core_spec-*.md derives from PRD — not the other way around.

PR-05  Every PRD document is version-controlled.
The version in the header must match the changelog.

-----

## [SECTION] document-conventions

```
STATUS VALUES:
  DRAFT        Being written — not yet reviewed
  IN REVIEW    Submitted to Instructor for review
  APPROVED     Instructor has approved this version
  SUPERSEDED   Replaced by a newer version

CHANGE PROCESS:
  DRAFT → IN REVIEW: Orchestrator notifies Instructor
  IN REVIEW → APPROVED: Instructor confirms
  Any change after APPROVED: new version, old version marked SUPERSEDED
  Change logged in docs/changelog/CHANGELOG.md
```

-----

## [SECTION] audience-guide

How different readers use PRD documents:

```
INSTRUCTOR:     Owns the content. Approves and signs off.
                Primary audience for prd_spec-overview.md and prd_spec-signoff.md.

AGENTS:         Derive requirements and architecture from PRD.
                Primary consumers of prd_spec-requirements.md and prd_spec-architecture.md.

STAKEHOLDERS:   Understand scope and decisions.
                Read prd_spec-overview.md and prd_spec-handoff.md.

AUDITORS:       Verify compliance and governance.
                Read prd_spec-ai-governance.md, prd_spec-signoff.md, qa_spec-conformance.md.
```