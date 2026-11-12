---
name: run-site
description: Launch, test, and screenshot the Arbur CPA marketing site locally. Eleventy (11ty) static site — use `npm start` for a live-reloading dev server, then `npm test` / `npm run screenshots` against it, instead of reaching for other tooling from scratch.
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

## Verifying a change

Both tasks below expect the site to be running already: start `npm start` first (in the background, for Claude). Neither starts a server. Set `BASE_URL` to point them somewhere other than http://localhost:8080/.

```
npm test             # browser checks in tests/site.spec.js
npm run screenshots  # scripts/screenshots.mjs: saves images, asserts nothing
```

`npm test` uses Playwright's test runner and headless Chromium. It checks, at desktop (1280px) and phone (390px) widths:

- no console errors or failed local requests
- every header nav link scrolls to its section (desktop)
- no horizontal scroll, and the hamburger opens the menu and a link closes it (mobile)

If no server is running, every test fails with `net::ERR_CONNECTION_REFUSED`. On other failures, `npx playwright show-report` opens the HTML report (`playwright-report/`, gitignored).

`npm run screenshots` saves `desktop.png`, `mobile.png` (both full page) and `mobile-menu.png` (menu open) to `screenshots/` (gitignored). After a visual change, run it and read the images to check the result: the tests catch breakage, not whether it looks right.

Playwright's browser is kept inside `node_modules` (`PLAYWRIGHT_BROWSERS_PATH=0`), never a machine-wide cache, so the repo stays self-contained. The `pretest`/`prescreenshots` hooks run `npm run browsers` to download it if it's missing.

A git `pre-push` hook (`.githooks/pre-push`, enabled by `npm install` via the `prepare` script) starts its own dev server on port 8282 and runs `npm test` before every push; a failure cancels the push. `git push --no-verify` skips it.

In CI, `.github/workflows/deploy.yml` does the same: starts `npm start` in the background, waits for port 8080, runs `npm test`, and only deploys if the tests pass.

Never submit the contact form in a test: it sends a real message to Formspree.
