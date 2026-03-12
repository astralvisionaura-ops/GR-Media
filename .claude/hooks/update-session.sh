#!/bin/bash
# Stop hook — updates LAST SESSION date in CLAUDE.md at end of every session

TODAY=$(date +%Y-%m-%d)
CLAUDE_MD="${CLAUDE_PROJECT_DIR:-$PWD}/CLAUDE.md"

if [ -f "$CLAUDE_MD" ] && grep -q "LAST SESSION:" "$CLAUDE_MD" 2>/dev/null; then
  sed -i.bak "s/LAST SESSION:.*/LAST SESSION:   $TODAY/" "$CLAUDE_MD" && rm -f "${CLAUDE_MD}.bak"
fi

exit 0
