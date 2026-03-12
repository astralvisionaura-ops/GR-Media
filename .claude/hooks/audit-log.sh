#!/bin/bash
# PostToolUse hook — appends Write/Edit actions to qa/qa_log-audit.md
# Input: JSON via stdin (Claude Code hook protocol)

INPUT=$(cat)
TOOL=$(echo "$INPUT"    | jq -r '.tool_name // "unknown"')
FILE=$(echo "$INPUT"    | jq -r '.tool_input.file_path // .tool_input.path // ""')
SESSION=$(echo "$INPUT" | jq -r '.session_id // ""')

# Only log if a file path was captured
if [ -n "$FILE" ] && [ "$FILE" != "null" ]; then

  # Sensitive file detection — flag modifications to credentials/secrets
  SENSITIVE=false
  case "$FILE" in
    */.env|*/.env.*|*.pem|*.key|*.p12|*.pfx|*credential*|*secret*|*private_key*|*/.npmrc|*/.netrc|*/id_rsa|*/id_ed25519)
      SENSITIVE=true
      ;;
  esac

  LOG="${CLAUDE_PROJECT_DIR:-$PWD}/qa/qa_log-audit.md"

  if [ "$SENSITIVE" = "true" ]; then
    echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) | $TOOL | [SENSITIVE] $FILE | session=${SESSION} | MANUAL REVIEW REQUIRED" >> "$LOG" 2>/dev/null
  else
    echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) | $TOOL | $FILE | session=${SESSION}" >> "$LOG" 2>/dev/null
  fi

fi

exit 0
