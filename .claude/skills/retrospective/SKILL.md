---
name: retrospective
description: "Run a project retrospective: evaluate what went well, what went wrong, what changed, and derive actionable improvements for future projects."
user-invocable: true
disable-model-invocation: true
context: fork
agent: Explore
---

# Retrospective

## Process

### 1. Gather Data
Review the project's:
- `qa/qa_log-audit.md` — timeline of events
- `docs/changelog/CHANGELOG.md` — what was delivered
- `qa/qa_spec-conformance.md` — compliance status
- Gate results from audit log

### 2. Analyze
For each category, assess:

**What went well?**
- Decisions that proved correct
- Processes that worked smoothly
- Quality wins

**What went wrong?**
- Late discoveries
- Rework caused by unclear requirements
- Technical debt created

**What changed mid-project?**
- Scope changes
- Technology changes (ADRs)
- Class migration

### 3. Derive Improvements
For each finding, propose:
```
IMPROVEMENT: [what to change]
APPLIES TO:  [future projects / this project / both]
PRIORITY:    [HIGH | MEDIUM | LOW]
ACTION:      [specific next step]
```

### 4. Report
Present summary to user with prioritized improvements.
