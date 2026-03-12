#!/bin/bash
# SessionStart hook — surfaces project identity to Claude at session start

CLAUDE_MD="${CLAUDE_PROJECT_DIR:-$PWD}/CLAUDE.md"

if [ ! -f "$CLAUDE_MD" ]; then
  exit 0
fi

PROJECT=$(grep "^PROJECT:"      "$CLAUDE_MD" | head -1 | sed 's/PROJECT:[[:space:]]*//')
CLASS=$(grep   "^CLASS:"        "$CLAUDE_MD" | head -1 | sed 's/CLASS:[[:space:]]*//')
PHASE=$(grep   "^ACTIVE PHASE:" "$CLAUDE_MD" | head -1 | sed 's/ACTIVE PHASE:[[:space:]]*//')
DOMAIN=$(grep  "^ACTIVE DOMAIN:" "$CLAUDE_MD" | head -1 | sed 's/ACTIVE DOMAIN:[[:space:]]*//')
LAST=$(grep    "^LAST SESSION:" "$CLAUDE_MD" | head -1 | sed 's/LAST SESSION:[[:space:]]*//')

echo "[SESSION START] ${PROJECT} | Class: ${CLASS} | Phase: ${PHASE} | Domain: ${DOMAIN} | Last session: ${LAST}"

exit 0
