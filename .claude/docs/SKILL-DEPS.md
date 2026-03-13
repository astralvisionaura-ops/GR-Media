# Skill Dependency Map

Documents which skills invoke other skills or agents. Update when adding or modifying skills.

## Invocation Graph

```
/init-project
  ├── /discovery          (Step 3 — delegated)
  ├── /best-practices T1  (Step 4 — delegated)
  └── /compliance-audit   (Step 5 — delegated)

/gate-check [N | all]
  └── (reads qa/, core/, docs/adr/ — no skill delegation)

/compliance-audit
  └── (reads project files via agent: Explore — no skill delegation)

/discovery
  └── (reads project files — no skill delegation)

/best-practices [T1|T2|T3|topic]
  └── (web search via agent: Explore — no skill delegation)

/team-consult [topic]
  └── invokes agents via Agent tool:
        architecture, backend, frontend, qm, requirements, infra
        (subset selected by topic — see SKILL.md Step 1)

/class-migration [target-class]
  └── (reads CLAUDE.md, writes audit log — no skill delegation)

/retrospective
  └── (reads qa/, docs/ via agent: Explore — no skill delegation)
```

## Hook Dependencies

```
settings.json hooks
  ├── SessionStart  → hooks/session-start.sh
  ├── PostToolUse   → hooks/audit-log.sh       (Write|Edit matcher)
  └── Stop          → hooks/update-session.sh

skill frontmatter hooks
  ├── gate-check/SKILL.md → Stop → $HOME/.claude/hooks/skill-complete.sh gate-check
  └── compliance-audit/SKILL.md → Stop → $HOME/.claude/hooks/skill-complete.sh compliance-audit

Note: Other skills (init-project, discovery, best-practices, team-consult, class-migration,
retrospective) intentionally have NO skill-complete hook — they are orchestration
skills or sub-skills invoked by init-project.
```

## Skills That Can Trigger Each Other

| Invoker | Invokes | Via |
|---------|---------|-----|
| `init-project` | `discovery` | `/discovery` in Step 3 |
| `init-project` | `best-practices` | `/best-practices T1` in Step 4 |
| `init-project` | `compliance-audit` | `/compliance-audit` in Step 5 |
| `team-consult` | any agent | Agent tool (dynamic, topic-based) |

## Known Runtime Limitations (Live-Verified 2026-03-12)

| Observation | Root Cause | Impact |
|---|---|---|
| "Unknown skill: X" warning on first invocation | Skill not yet in autocomplete index at session start | Cosmetic only — skill executes correctly |
| Agent tool unavailable in `context: fork` skills | Deferred tool resolution doesn't work in forked skill contexts | `team-consult` falls back to inline consultation (quality unaffected) |
| `disable-model-invocation: true` blocks sub-skill calls | Working as designed | Skills with this flag fall back to inline execution |
| SessionStart hook output invisible to user | Hook injects context into Claude, not into terminal stdout | Working as designed — Claude receives project identity |

## Update Protocol

When a skill is added or changes its delegation behavior:
1. Update the invocation graph above
2. Update the README.md skill table if the description changes
3. If a new hook is added: update the Hook Dependencies section
