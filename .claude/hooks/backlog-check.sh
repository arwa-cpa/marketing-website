#!/bin/bash
# PreToolUse hook (Bash): before Claude runs `git commit`, make it check
# whether the Backlog.md tasks in backlog/ need updating.
#
# The commit goes through when:
#   - backlog/ already has staged changes, or
#   - the same command stages backlog/ (e.g. `git add backlog ... && git commit`), or
#   - the command starts with BACKLOG_CHECKED=1 (checked, nothing to update).
# Otherwise it's blocked (exit 2) and the message below is shown to Claude.
# Only Claude's Bash tool calls go through this; commits made in a terminal don't.

input=$(cat)

# jq is required to read the command. Without it, block anything that looks
# like a commit (other commands still run, so the session isn't stuck).
if ! command -v jq >/dev/null; then
  echo "$input" | grep -Eq 'git +commit' || exit 0
  echo "The backlog check before git commit needs jq, which isn't installed. Install it (brew install jq) and commit again." >&2
  exit 2
fi
cmd=$(echo "$input" | jq -r '.tool_input.command // empty')

echo "$cmd" | grep -Eq '(^|[^[:alnum:]_-])git +commit' || exit 0
echo "$cmd" | grep -q 'BACKLOG_CHECKED=1' && exit 0
echo "$cmd" | grep -Eq 'git +add[^;&|]*backlog' && exit 0

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
[ -n "$(git diff --cached --name-only -- backlog 2>/dev/null)" ] && exit 0

cat >&2 <<'EOF'
Before committing, check the Backlog.md tasks (npx backlog task list --plain):
does this change finish a task, change one, or leave a follow-up?
- If so, update them with npx backlog (e.g. npx backlog task edit 3 -s Done)
  and stage backlog/ in this commit.
- If nothing needs updating, re-run the commit prefixed with BACKLOG_CHECKED=1,
  e.g. BACKLOG_CHECKED=1 git commit -m "..."
EOF
exit 2
