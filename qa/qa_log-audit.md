# qa_log-audit.md

# qa/qa_log-audit.md | Audit Log

-----

## [CONTEXT]

INHERITS:   —
PHASE:      ALL — append only from project start
AUDIENCE:   Orchestrator, all agents, Instructor
CUSTODIAN:  agent-qm

-----

## [SECTION] log-rules

```
APPEND ONLY:    Never edit or delete existing entries.
IMMEDIATE:      Log significant events as they occur — not retrospectively.
COMPLETE:       Every gate, decision, escalation, and override is logged.
CUSTODIAN:      QM agent verifies log completeness before every release gate.
```

-----

## [SECTION] entry-format

```
[YYYY-MM-DD HH:MM] | [agent or: orchestrator | instructor] | [CATEGORY] | [description]
```

Categories:

```
PROJECT        Project lifecycle events (init, phase change)
GATE           Gate evaluation, pass, fail
DECISION       Instructor decision on a question raised by team
OVERRIDE       Instructor overrides team recommendation
ESCALATION     Issue escalated to Instructor or external expert
COMPLIANCE     Compliance finding, signal, or resolution
CLASS          Class assignment or migration
SCHEMA CHANGE  Data model change after GATE-01
DEPLOYMENT     Deployment events (initiated, complete, failed, rollback)
DISSENT        Formal agent dissent recorded
RETROSPECTIVE  Retrospective events
```

-----

## [SECTION] log

```
2026-03-11 14:00 | orchestrator | PROJECT | Project initialized — template v2.0.0
2026-03-11 14:01 | orchestrator | PROJECT | INIT COMPLETE — Test-SaaS [TEST]
```

[All subsequent entries appended below this line. Never above.]