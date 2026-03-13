# Master Template — Claude Code Native (V1.0.0)

A production-ready project template built entirely on native Claude Code primitives. Every workflow, rule, and agent is wired to the Claude Code runtime — no simulation, no workarounds.

---

## Architecture

### Two-Layer Infrastructure Model

```
~/.claude/                    ← GLOBAL (install once, works across all projects)
├── agents/                   # 6 specialized sub-agents
├── hooks/                    # session-start, audit-log, update-session, skill-complete
├── rules/                    # Base rules: boundaries, security, compliance, api-contracts
└── settings.json             # Global hooks: SessionStart, PostToolUse, Stop

~/YourProject/.claude/        ← PROJECT-SPECIFIC (per project, minimal)
├── settings.json             # Deny rules only (compliance protection)
├── rules/
│   ├── core-context.md       # Project stack and architecture context
│   └── domain-*.md           # One domain rule matching ACTIVE DOMAIN
└── skills/                   # Project workflow skills (init-project, gate-check, etc.)
```

**Why this split:**
- Global layer installs once — updates propagate to all projects automatically
- Project layer contains only what differs between projects
- New project creation = copy template scaffold + fill in `CLAUDE.md` + drop `Client-PRD.md`

**Source vs. Runtime:**
- `.claude/agents/` und `.claude/hooks/` im Template-Repo = **Source of Truth** (versioniert)
- `~/.claude/agents/` und `~/.claude/hooks/` = **Runtime Install** (wird von Claude Code geladen)
- Wenn Agents oder Hooks im Template geändert werden: Global neu synchronisieren:
  ```bash
  cp .claude/agents/*.md ~/.claude/agents/
  cp .claude/hooks/*.sh ~/.claude/hooks/ && chmod +x ~/.claude/hooks/*.sh
  ```
- Neue Projekte via `cp -r`: Enthalten `.claude/agents/` als lokale Kopie — Claude Code lädt diese bevorzugt vor dem Global Layer (identischer Inhalt, kein Funktionsproblem).

---

### `CLAUDE.md` — Session Entry Point

Project identity and essential references. Loaded automatically at every session start.
Contains: project class, active phase, active domain, workflow pointers.
Does NOT auto-load large files — core context is loaded on-demand via the `core-context` rule.

### `~/.claude/agents/` — Specialized Sub-Agents

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

| Rule | Location | Loads When |
|------|----------|-----------|
| `core-context.md` | project | `src/**`, `core/**`, `docs/adr/**` |
| `api-contracts.md` | global | `src/server/**` |
| `security.md` | global | `src/server/**`, `src/api/**`, `src/auth/**`, `deploy/**` |
| `compliance.md` | global | `src/**`, `qa/**` |
| `boundaries.md` | global | `src/**`, `qa/**`, `deploy/**`, `docs/adr/**`, `core/**` |
| `domain-web-saas.md` | project | `src/**` (web-saas projects) |
| `domain-desktop.md` | project | `src/**` (desktop projects) |
| `domain-mobile.md` | project | `src/**` (mobile projects) |
| `domain-embedded.md` | project | `src/**` (embedded projects) |

### `.claude/skills/` — Invokable Workflows

User-invocable via `/skill-name [arguments]`. Heavier skills run in `context: fork` (isolated subagent) to protect the main context.

| Skill | Trigger | Description |
|-------|---------|-------------|
| `/init-project [NAME]` | Project start | 8-step onboarding. Auto-extracts from `Client-PRD.md` if present. |
| `/discovery` | Auto-delegated from init | Domain/regulatory signal detection, class proposal |
| `/gate-check [01–07 \| all]` | Before phase transitions | GATE-01 through GATE-07 readiness evaluation |
| `/compliance-audit` | Auto-delegated from init | Regulatory framework detection (GDPR, NIS2, DORA, MDR, EAA, AI Act) |
| `/best-practices [T1\|T2\|T3\|topic]` | T1: init, T2: mid, T3: pre-release | Technology and domain best-practice research |
| `/team-consult [topic]` | Any phase | Consult specialized agents for architectural or implementation decisions |
| `/class-migration [target-class]` | Scope change | Migrate project between classes 1–4 with impact analysis |
| `/retrospective` | Post-release | Project retrospective with prioritized improvement recommendations |

### `~/.claude/settings.json` — Global Runtime Controls

Hooks active on every project:

- **SessionStart**: Surfaces project identity (class, phase, domain) to Claude at every session
- **PostToolUse** (Write|Edit): Appends to `qa/qa_log-audit.md` on every file modification
- **Stop**: Updates `LAST SESSION` date in `CLAUDE.md` on session end

Hooks are safe to run on non-template projects — they exit gracefully if `CLAUDE.md` or `qa/qa_log-audit.md` don't exist.

### `.claude/settings.json` (project) — Protection Rules

Minimal. Contains only:
- **Deny**: `Write(.compliance/**)` and `Edit(.compliance/**)` — compliance specs are append-only

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

### 0 — One-Time Global Setup (first machine only)

```bash
# Run from the Master Template directory
mkdir -p ~/.claude/agents ~/.claude/hooks ~/.claude/rules
cp .claude/agents/*.md ~/.claude/agents/
cp .claude/hooks/*.sh ~/.claude/hooks/ && chmod +x ~/.claude/hooks/*.sh
cp .claude/rules/boundaries.md .claude/rules/security.md \
   .claude/rules/compliance.md .claude/rules/api-contracts.md ~/.claude/rules/
```

Then set `~/.claude/settings.json` — copy from `.claude/settings-global-template.json` in this repo.

> This step is already done on the primary development machine.

### 1 — Neues Projekt anlegen

```bash
# Option A: git archive (empfohlen) — kopiert nur committed State, kein Audit-Log-Rauschen
mkdir ~/MeinProjekt && git -C ~/ClaudeCode archive HEAD | tar -x -C ~/MeinProjekt
cd ~/MeinProjekt && git init

# Option B: Git clone
git clone <repo-url> MeinProjekt
cd MeinProjekt && rm -rf .git && git init
```

### 2 — Client Brief ausfüllen (vor dem Kundentermin)

```
docs/prd/Client-PRD.md
```

Beim Kundentermin gemeinsam ausfüllen. 10 Fragen, ca. 30–45 Minuten.

### 3 — Claude Code starten und initialisieren

```bash
claude
```

```
/init-project MeinProjektName
```

Claude liest `Client-PRD.md`, extrahiert Projektklasse, Domain, Compliance-Flags und MVP — und befüllt die PRD-Dateien automatisch. Bestätigung vor jedem Write.

| Step | Was passiert |
|------|-------------|
| 1 | Strukturvalidierung |
| 2 | Strategischer Kontext (skip wenn Client-PRD vorhanden) |
| 3 | Client-PRD Extraktion → Klasse + Domain + Compliance |
| 4 | Best Practices T1 |
| 5 | Compliance-Audit |
| 6 | CLAUDE.md + PRD + Audit-Log schreiben |
| 7 | Integritätsprüfung |
| 8 | Handover |

### 4 — Weiterarbeiten

```
/gate-check 01     → Architektur-Review
/gate-check 02     → Scope-Bestätigung
/team-consult      → Architektur-, Backend-, Frontend-Entscheidungen
/compliance-audit  → Vollständiges Compliance-Audit
```

### Troubleshooting

| Problem | Fix |
|---------|-----|
| `Unknown skill: init-project` | Ignorieren — Skill läuft |
| SessionStart Hook zeigt nichts im Terminal | Korrekt — Output geht an Claude, nicht Terminal |
| `Error editing file` beim Init | Retry — Claude versucht es erneut |
| Hooks feuern nicht | `chmod +x ~/.claude/hooks/*.sh` ausführen |

---

## Template Structure

```
~/.claude/                             # GLOBAL — install once
├── agents/                            # 6 sub-agents (architecture, backend, frontend, ...)
├── hooks/                             # audit-log.sh, session-start.sh, update-session.sh
├── rules/                             # Base rules: boundaries, security, compliance, api-contracts
└── settings.json                      # Global hooks

YourProject/
├── CLAUDE.md                          # Session entry point — fill in project details
├── CLAUDE.local.md                    # Personal overrides (gitignored)
├── .gitignore
├── README.md
├── .claude/
│   ├── settings.json                  # Deny rules only (compliance protection)
│   ├── settings.local.json            # Local permission overrides (gitignored)
│   ├── rules/                         # Project-specific rules only
│   │   ├── core-context.md            # Project stack context
│   │   └── domain-web-saas.md         # Active domain rule (one only)
│   ├── docs/                          # Internal template docs (non-project)
│   │   ├── SHARED-RULES.md            # Symlink-pattern for company-wide rules
│   │   └── SKILL-DEPS.md             # Skill invocation graph + runtime limitations
│   └── skills/                        # Invokable workflows
│       ├── best-practices/SKILL.md
│       ├── class-migration/SKILL.md
│       ├── compliance-audit/SKILL.md
│       ├── discovery/SKILL.md
│       ├── gate-check/SKILL.md
│       ├── init-project/SKILL.md
│       ├── retrospective/SKILL.md
│       └── team-consult/SKILL.md
├── core/                              # Architecture + spec files (agent-owned)
├── docs/
│   ├── adr/                           # Architectural Decision Records
│   ├── prd/
│   │   ├── Client-PRD.md              # Client intake brief (fill before /init-project)
│   │   ├── prd_spec-overview.md       # Auto-populated by init-project
│   │   └── prd_spec-requirements.md   # Auto-populated by init-project
│   └── changelog/
├── qa/                                # QM-owned quality artifacts
└── deploy/                            # Infra-owned deployment config
```

---

## First-Time Setup

When you copy this template for a new project:

**Fill in before `/init-project`:**
- `docs/prd/Client-PRD.md` — complete this with the client before the session

**Populated automatically by `/init-project`:**
- `CLAUDE.md` — project identity (name, class, domain)
- `docs/prd/prd_spec-overview.md` — extracted from Client-PRD
- `docs/prd/prd_spec-requirements.md` — MVP feature as FR-001

**Keep as-is:**
- `docs/adr/adr_template-000.md` — ADR template (do not modify)
- `docs/adr/adr_index.md` — starts empty, populated by architecture agent
- `qa/qa_log-audit.md` — starts empty, populated by hooks and QM

**Delete before committing:**
- `.claude/rules/domain-*.md` — keep only the one matching ACTIVE DOMAIN (init-project does this)

**Gitignored (never commit):**
- `CLAUDE.local.md`
- `.claude/settings.local.json`

---

## Template Version

`1.0.0` — Two-layer infrastructure model. Global agents/hooks/rules + minimal project scaffold. Client-PRD driven initialization.
