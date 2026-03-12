#!/bin/bash
# skill-complete.sh — Skill-Completion-Audit-Hook
# Aufruf: skill-complete.sh <skill-name>
# Wird aus dem hooks:-Frontmatter von Skills aufgerufen.
# $1 = Skill-Name (z.B. "compliance-audit", "gate-check")

SKILL="${1:-unknown}"
LOG="${CLAUDE_PROJECT_DIR:-$PWD}/qa/qa_log-audit.md"

mkdir -p "$(dirname "$LOG")" 2>/dev/null

printf '\n%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ) | SKILL | ${SKILL} | completed" >> "$LOG" 2>/dev/null

exit 0
