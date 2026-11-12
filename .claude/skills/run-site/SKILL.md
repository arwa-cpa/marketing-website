---
name: run-site
description: Launch and preview the Arbur CPA marketing site locally. Eleventy (11ty) static site — use `npm start` for a live-reloading dev server instead of reaching for other tooling from scratch.
---

# Running the Arbur CPA site

This is an Eleventy static site. Source lives in `src/`; the build writes to `_site/` (gitignored).

## Node version

Node is pinned in `.nvmrc`. A SessionStart hook in `.claude/settings.json` activates it for Claude's Bash tool, so `npm` commands work without a prefix. Check with `node -v`; if it doesn't match `.nvmrc` (e.g. the hook didn't run), fall back to prefixing commands with:

```
source ~/.nvm/nvm.sh && nvm use
```

Run `npm install` once after cloning.

## Preview

From the repo root:

```
npm start
```

Then open http://localhost:8080. Eleventy's dev server rebuilds and live-reloads on save. Stop it with Ctrl-C. When Claude runs it, start it in the background so the session isn't blocked.

`npm run build` produces a one-off build in `_site/`.

The contact form's `fetch()` call to Formspree needs to run from a server origin (not `file://`), so test it through `npm start`.

## Visually verifying a change

Use Claude in Chrome (the `mcp__claude-in-chrome__*` tools) against the dev server; no extra dependencies are needed. There's no auth, no routing beyond anchor links, and no data fetching except the contact form.

1. Start `npm start` in the background.
2. Open a new tab at http://localhost:8080 and take a screenshot at desktop width.
3. Read console messages and confirm there are no errors.
4. Click a nav link and confirm the anchor scroll lands on the right section.
5. Resize to a phone viewport (~390px wide), screenshot again, and confirm the hamburger menu opens (the header collapses below 1040px).

Don't submit the contact form during checks; it sends a real message to Formspree.
