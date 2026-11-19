#!/bin/bash
# SessionStart hook (new session or /clear): give Claude the open Backlog.md
# tasks so it opens the session by planning with the user from the backlog.
# Whatever this prints is added to Claude's context.

cd "$CLAUDE_PROJECT_DIR" || exit 0

# Hooks don't run in the user's interactive shell, so npx may not be on PATH.
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use --silent >/dev/null 2>&1

# Keep every section except Done.
tasks=$(npx --no-install backlog task list --plain 2>/dev/null |
  awk '/^[^ ].*:$/ { keep = ($0 != "Done:") } keep')

if [ -z "$tasks" ]; then
  echo "Session start: couldn't read the backlog (npx backlog task list --plain failed or found no open tasks). Mention that to the user and ask what they'd like to work on."
  exit 0
fi

cat <<EOF
Session start: these are the open tasks in the project backlog (Backlog.md):

$tasks

Begin this session by planning with the user from the backlog, whatever their first message is (unless it's clearly about something else, then do that first and offer the backlog after). Read the details of the tasks that look most relevant (npx backlog task <id> --plain), then give a short summary of what's open, say which task you'd pick up next and why (separate site work from off-site steps that need a person), and ask what they want to tackle.
EOF
