---
id: TASK-14
title: Restructure the repo into backlog, site and partner-doc folders
status: In Progress
assignee:
  - '@murtuza'
created_date: '2026-11-21T16:12:00Z'
updated_date: '2026-11-21T17:00:00Z'
labels:
  - repo
dependencies: []
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Organize the top level of the repo into three folders, each a small project owning its own tooling: backlog/ (tasks), site/ (the website) and partner-doc/ (a partner referral document listing Arwa's services, to come). Groundwork for the partner doc.

Use npm workspaces (built into npm, no extra tool). The top-level package.json lists the workspaces (site, backlog; partner-doc joins when TASK-16 gives it a package.json), the prepare script that enables .githooks, and pass-through scripts so the site's npm commands (start, test, build, screenshots, test:live) and the backlog CLI run from the top folder. One npm install and one package-lock.json at the top, as workspaces work.

site/package.json holds Eleventy and Playwright and the site's scripts, which npm runs inside site/, so configs keep paths relative to site/ (the standard Eleventy setup). site/ holds src/, tests/, scripts/, eleventy.config.js, playwright.config.js and the build output (_site, screenshots, test reports).

backlog/package.json holds backlog.md. The Backlog.md data (config.yml, tasks/, drafts/, docs/, …) moves to backlog/data/, set by backlog/backlog.config.yml (backlog_directory: data). The CLI runs inside backlog/, through a top-level pass-through: npm run backlog -- task list --plain.

Repo-wide files stay at the top: .nvmrc, .githooks, .github, .claude, CLAUDE.md, README.md.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Top level holds backlog/ and site/ plus repo-wide files only (partner-doc/ arrives with TASK-16's first files)
- [x] #2 npm workspaces: site/ and backlog/ each have a package.json with their own dependencies; the top-level package.json has only the workspace list, the hooks prepare script and pass-through scripts
- [x] #3 Backlog data lives in backlog/data/ and the backlog CLI works from the top folder through npm run backlog
- [x] #4 npm start, npm test, npm run build, npm run screenshots and npm run test:live work from the top folder
- [x] #5 Deploy workflow, pre-push hook, SessionStart and commit hooks, run-site skill and .gitignore updated to the new paths
- [x] #6 CLAUDE.md, README.md and file path references updated
- [ ] #7 Deploy to GitHub Pages succeeds after the push and the live site is unchanged
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Done 2026-11-21. Verified before committing, all from the top folder: npm install gives the same package versions as before; a clean npm run build matches the pre-move build file for file (sitemap entries in a different order, since Eleventy sorts them by file date); npm test 20/20, npm run test:live 4/4, npm run screenshots look right; the pre-push hook passes and leaves port 8282 free; both Claude hooks work with npm run backlog. Open tasks' paths updated (TASK-5, 13, 15, DRAFT-2, and the BrandScript links on TASK-11 and 13). The pre-push hook still calls Eleventy directly from site/; TASK-17 switches it to npm.
<!-- SECTION:NOTES:END -->
