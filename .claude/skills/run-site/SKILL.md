---
name: run-site
description: Launch and preview the Arbur CPA marketing site locally. Plain static HTML/CSS/JS, no build step, no npm install — use this instead of reaching for Node/Playwright tooling from scratch.
---

# Running the Arbur CPA site

This is a plain static site: `index.html` + `css/styles.css` + `js/main.js`. No framework, no bundler, no `package.json`. There is nothing to install.

## Preview

From the repo root:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Stop it with `pkill -f "http.server 8000"` or Ctrl-C.

Opening `index.html` directly via `file://` also works for a quick look, but the contact form's `fetch()` call to Formspree needs to run from a server origin (not `file://`) to test properly — use the `http.server` approach when verifying the contact form.

## Visually verifying a change

No project-specific browser driver is set up here — any generic headless-Chromium approach (Playwright, `chromium-cli`) works fine against the `http.server` URL above. There's no auth, no routing beyond anchor links, and no data fetching except the contact form.

A representative check: load the page, confirm no console errors, click a nav link and confirm the anchor scroll lands, resize to a mobile viewport (~390px wide) and confirm the hamburger menu opens.

## Known placeholders

Grep `index.html` for `TODO` to find content Arwa still needs to supply: testimonial quotes, the Google review rating/link, the Formspree form ID, and the LinkedIn / Google Business Profile links.
