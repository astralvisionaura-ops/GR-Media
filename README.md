# Master Template — Claude Code Native (V3.1.0)

A production-ready project template built entirely on native Claude Code primitives. Every workflow, rule, and agent is wired to the Claude Code runtime — no simulation, no workarounds.

---

## Architecture

### `CLAUDE.md` — Session Entry Point

Project identity and essential references. Loaded automatically at every session start.
Contains: project class, active phase, active domain, workflow pointers.
Does NOT auto-load large files — core context is loaded on-demand via the `core-context` rule.

### `.claude/agents/` — Specialized Sub-Agents

Invoked via the Agent tool or by Claude delegating work. Each agent owns a defined set of files and cannot modify files outside its scope.

| Agent | Role | Owns |
|-------|------|------|
| `requirements` | Spec analysis, requirements writing | `core/core_spec-*` (reads `docs/prd/` — never modifies) |
| `architecture` | ADRs, API contracts, data models | `docs/adr/`, `core/core_arch-*` |
| `frontend` | UI implementation | `src/client/` |
| `backend` | API/service implementation | `src/server/`, `src/shared/` |
| `qm` | Quality gates, test cases, compliance findings | `qa/` |
| `infra` | IaC, deployment, monitoring | `deploy/` |

### `.claude/rules/` — Path-Scoped Rules

Loaded automatically only when Claude works on files matching the rule's `paths:` pattern. Zero overhead for unrelated files.

| Rule | Loads When |
|------|-----------|
| `core-context.md` | `src/**`, `core/**`, `docs/adr/**` |
| `api-contracts.md` | `src/server/**` |
| `security.md` | `src/server/**`, `src/api/**`, `src/auth/**`, `deploy/**` |
| `compliance.md` | `src/**`, `qa/**` |
| `boundaries.md` | `src/**`, `qa/**`, `deploy/**`, `docs/adr/**`, `core/**` |
| `domain-web-saas.md` | `src/**` (web-saas projects only) |

### `.claude/skills/` — Invokable Workflows

User-invocable via `/skill-name [arguments]`. Heavier skills run in `context: fork` (isolated subagent) to protect the main context.

| Skill | Trigger | Description |
|-------|---------|-------------|
| `/init-project` | Project start | 8-step onboarding: validation → discovery → compliance → config |
| `/discovery` | Auto-delegated from init | Domain/regulatory signal detection, class proposal |
| `/gate-check [01–07 \| all]` | Before phase transitions | GATE-01 through GATE-07 readiness evaluation |
| `/compliance-audit` | Auto-delegated from init | Regulatory framework detection (GDPR, NIS2, DORA, MDR, EAA, AI Act) |
| `/best-practices [T1\|T2\|T3\|topic]` | T1: init, T2: mid, T3: pre-release | Technology and domain best-practice research |
| `/team-consult [topic]` | Any phase | Consult specialized agents for architectural or implementation decisions |
| `/class-migration [target-class]` | Scope change | Migrate project between classes 1–4 with impact analysis |
| `/retrospective` | Post-release | Project retrospective with prioritized improvement recommendations |

### `.claude/settings.json` — Runtime Controls

Global permissions and hooks, enforced at the Claude Code runtime level:

- **Deny**: `Write(.compliance/**)` and `Edit(.compliance/**)` — compliance specs are append-only
- **SessionStart hook**: Surfaces project identity (class, phase, domain) to Claude at every session
- **PostToolUse hook** (Write|Edit): Appends to `qa/qa_log-audit.md` on every file modification
- **Stop hook**: Updates `LAST SESSION` date in `CLAUDE.md` on session end

---

## Project Classes

| Class | Profile | Required Gates |
|-------|---------|---------------|
| 1 | Static / No backend | GATE-02 |
| 2 | Dynamic / Backend | GATE-01, 02, 04, 05 |
| 3 | Production / Multi-team | GATE-01, 02, 03, 04, 05, 06 |
| 4 | Regulated / Enterprise | All gates + GATE-07 |

---

## Quick Start

Copy this template to a new project directory, then:

```bash
claude
/init-project
```

The `/init-project` skill guides you through the full 8-step initialization, including project discovery, compliance evaluation, and configuration.

---

## Template Structure

```
.
├── CLAUDE.md                          # Session entry point — fill in project details
├── CLAUDE.local.md                    # Personal overrides (gitignored)
├── .gitignore
├── README.md
├── .claude/
│   ├── settings.json                  # Global permissions + hooks
│   ├── settings.local.json            # Local permission overrides (gitignored)
│   ├── agents/                        # Sub-agent definitions
│   │   ├── architecture.md
│   │   ├── backend.md
│   │   ├── frontend.md
│   │   ├── infra.md
│   │   ├── qm.md
│   │   └── requirements.md
│   ├── rules/                         # Path-scoped rules (auto-loaded)
│   │   ├── api-contracts.md
│   │   ├── boundaries.md
│   │   ├── compliance.md
│   │   ├── core-context.md
│   │   ├── domain-web-saas.md
│   │   └── security.md
│   ├── skills/                        # Invokable workflows
│   │   ├── best-practices/SKILL.md
│   │   ├── class-migration/SKILL.md
│   │   ├── compliance-audit/SKILL.md
│   │   ├── discovery/SKILL.md
│   │   ├── gate-check/SKILL.md
│   │   ├── init-project/SKILL.md
│   │   ├── retrospective/SKILL.md
│   │   └── team-consult/SKILL.md
│   ├── hooks/                         # Shell scripts for hook events
│   │   ├── audit-log.sh
│   │   ├── session-start.sh
│   │   ├── skill-complete.sh
│   │   └── update-session.sh
│   └── docs/
│       └── SHARED-RULES.md            # Company-wide shared rules (symlink pattern)
├── core/                              # Architecture + spec files (agent-owned)
├── docs/
│   ├── adr/                           # Architectural Decision Records
│   ├── prd/                           # Product Requirements Documents
│   └── changelog/
├── qa/                                # QM-owned quality artifacts
└── deploy/                            # Infra-owned deployment config
```

---

## First-Time Setup

When you copy this template for a new project:

**Fill in (required):**
- `CLAUDE.md` — replace all `[PLACEHOLDER]` values with project identity
- `docs/prd/prd_spec-overview.md` — project scope and out-of-scope
- `docs/prd/prd_spec-requirements.md` — functional requirements

**Keep as-is (template infrastructure):**
- `.claude/` — all agents, skills, rules, hooks, settings
- `docs/adr/adr_template-000.md` — ADR template (do not modify)
- `docs/adr/adr_index.md` — starts empty, populated by architecture agent
- `qa/qa_log-audit.md` — starts empty, populated by hooks and QM

**Delete before committing (project-specific only):**
- `.claude/rules/domain-*.md` — keep only the one matching your ACTIVE DOMAIN, delete the rest
- `_archive_template_v2/` — if present, remove (legacy reference only)

**Gitignored (never commit):**
- `CLAUDE.local.md` — personal developer overrides
- `.claude/settings.local.json` — local permission overrides

The `/init-project` skill automates most of this — it validates structure, runs discovery, and cleans up domain rules in Step 6.

---

## Template Version

`3.1.0` — Built on Claude Code native primitives. No legacy `.system/`, `.team/`, or `.compliance/` directories.
