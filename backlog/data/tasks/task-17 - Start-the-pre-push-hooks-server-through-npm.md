---
id: TASK-17
title: Start the pre-push hook's server through npm
status: To Do
assignee: []
created_date: '2026-11-21T16:44:00Z'
labels:
  - repo
dependencies:
  - TASK-14
ordinal: 17000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The pre-push hook (.githooks/pre-push) starts its test server by calling Eleventy directly from site/ (../node_modules/.bin/eleventy), so it can kill exactly that process when the tests finish. Through npm, the saved process ID would be npm's, with npm -w site, a shell and Eleventy beneath it, and killing it might leave a server running on port 8282 that later pushes would test against.

Switch to npm start -- --quiet --port=8282 so the hook doesn't depend on site/ or where npm installs Eleventy. Check whether npm forwards the stop signal through the nested workspace call; if not, start the server in its own process group and kill the group on exit.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Pre-push hook starts the server with npm instead of a node_modules path
- [ ] #2 After a push (passing and failing), nothing is left listening on port 8282
<!-- AC:END -->
