---
id: TASK-14
title: Restructure the repo into backlog, site and partner-doc folders
status: To Do
assignee: []
created_date: '2026-11-21T16:12:00Z'
updated_date: '2026-11-21T16:15:00Z'
labels:
  - repo
dependencies: []
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Organize the top level of the repo into three independent folders: backlog/ (tasks, unchanged), site/ (the website) and partner-doc/ (a partner referral document listing Arwa's services, to come). Groundwork for the partner doc.

site/ is a self-contained npm project: its own package.json, package-lock.json and node_modules with Eleventy and Playwright, plus src/, tests/, scripts/, eleventy.config.js and playwright.config.js, and its build output (_site, screenshots, test reports). Configs keep their paths relative to site/, the standard Eleventy setup.

The top-level package.json keeps only backlog.md and the prepare script that enables .githooks. Repo-wide files stay at the top: .nvmrc (nvm finds it from site/), .githooks, .github, .claude, CLAUDE.md, README.md. partner-doc/ can get its own tooling later without touching the site's dependencies.

Open: whether to add pass-through scripts at the top level (npm start etc.) or run site commands from inside site/.

Folder name partner-doc (hyphen, matching the repo's other names) unless partner_doc is preferred.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Top level holds backlog/, site/ and partner-doc/ plus repo-wide files only
- [ ] #2 site/ has its own package.json and lockfile; the top-level package.json has only backlog.md and the hooks prepare script
- [ ] #3 npm start, npm test, npm run build and npm run screenshots work for the site
- [ ] #4 npx backlog works from the top folder
- [ ] #5 Deploy workflow, pre-push hook, SessionStart Node hook, run-site skill and .gitignore updated to the new paths
- [ ] #6 CLAUDE.md file layout, path references and commands updated
- [ ] #7 Deploy to GitHub Pages succeeds after the push and the live site is unchanged
<!-- AC:END -->
