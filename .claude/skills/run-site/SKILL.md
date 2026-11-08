---
name: run-site
description: Launch and preview the Arbur CPA marketing site locally. Eleventy (11ty) static site — use `npm start` for a live-reloading dev server instead of reaching for other tooling from scratch.
---

# Running the Arbur CPA site

This is an Eleventy static site. Source lives in `src/`; the build writes to `_site/` (gitignored).

## Node version

Node is pinned in `.nvmrc`. In an interactive shell, re-entering the repo folder switches to it. In a non-interactive shell (e.g. Claude's Bash tool), the auto-switch doesn't fire, so prefix commands with:

```
source ~/.nvm/nvm.sh && nvm use
```

Run `npm install` once after cloning.

## Preview

From the repo root:

```
npm start
```

Then open http://localhost:8080. Eleventy's dev server rebuilds and live-reloads on save. Stop it with Ctrl-C.

`npm run build` produces a one-off build in `_site/`.

The contact form's `fetch()` call to Formspree needs to run from a server origin (not `file://`), so test it through `npm start`.

## Visually verifying a change

No project-specific browser driver is set up here. Any generic headless-Chromium approach (Playwright, `chromium-cli`) works against the dev server URL above. There's no auth, no routing beyond anchor links, and no data fetching except the contact form.

A representative check: load the page, confirm there are no console errors, click a nav link and confirm the anchor scroll lands, then resize to a mobile viewport (~390px wide) and confirm the hamburger menu opens.

## Known placeholders

Grep `src/_data/` for `TODO` to find content Arwa still needs to supply: testimonial quotes (`testimonials.js`), the Google review rating/link, the Formspree form ID, and the LinkedIn / Google Business Profile links (`site.js`).
