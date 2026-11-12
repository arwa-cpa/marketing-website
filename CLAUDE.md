# Arbur CPA Marketing Website

Single-page marketing site for **Arbur CPA** (Arwa Naalwala, CPA) — a rebrand covering U.S.–Canada cross-border tax, business/individual tax preparation, and small business accounting.

## Stack

[Eleventy](https://www.11ty.dev/) (v3) with Nunjucks templates, plain CSS, and vanilla JS. Eleventy is the only build dependency (`@playwright/test` is used only for browser tests and screenshots), and there's no bundler or client-side framework. The site is edited rarely, and the owner wanted to avoid the overhead that made Squarespace feel harder than necessary. Keep it lean: don't add a bundler, framework, CMS, extra Eleventy plugins, or a test framework without checking first.

Node is pinned in `.nvmrc`. A SessionStart hook in `.claude/settings.json` activates it for Claude's Bash tool, so `npm` commands need no prefix; if `node -v` doesn't match, fall back to `source ~/.nvm/nvm.sh && nvm use`.

## Hosting

GitHub Pages, deployed by `.github/workflows/deploy.yml`: every push to `main` starts the dev server, runs `npm test` against it, then runs `npm run build` and publishes `_site/`. A failing test blocks the deploy. The repo's Pages source must be set to **GitHub Actions** (Settings → Pages), not "Deploy from a branch". `CNAME` and `.nojekyll` live in `src/` and are passthrough-copied into the build. Current working domain is `arwacpa.com`; a matching `arburcpa.com` domain is planned but not yet purchased — don't hard-code either domain anywhere in the site. `src/CNAME` is the single source of the domain: `src/_data/structuredData.js` reads it at build time to build absolute URLs, so switching domains means editing only CNAME.

## File layout

```
eleventy.config.js              input src/, output _site/, passthrough copies
src/index.njk                   page front matter (title, description) + section includes, in page order
src/_includes/sections/         one file per page section: hero, highlights, services, about, testimonials, booking, contact
src/_includes/base.njk          <head>, fonts, header/footer includes, script tag
src/_includes/partials/         header.njk, footer.njk
src/_data/site.js               LinkedIn/Google URLs, rating text, booking embed URL, Formspree ID
src/_data/testimonials.js       client review quotes
src/_data/structuredData.js     JSON-LD (AccountingService + Person + WebSite) rendered into <head>
src/css/styles.css              all styles; design tokens as CSS custom properties at the top
src/js/main.js                  mobile nav toggle + Formspree contact form submit (fetch, no page redirect)
src/assets/images/              logo variants, hero photo, headshot
src/assets/favicon.ico
playwright.config.js            test config; keeps the browser in node_modules
tests/site.spec.js              browser checks against the running site (npm test)
scripts/screenshots.mjs         saves screenshots to screenshots/ for visual review (npm run screenshots)
.githooks/pre-push              runs npm test against its own server before every push (enabled by npm install)
.claude/skills/run-site/        how to preview and verify the site locally
```

Each section of the page lives in its own file under `src/_includes/sections/`. That's the main reason the site moved to Eleventy, so keep it that way: add a new section as a new file and include it from `index.njk`, rather than putting markup in `index.njk` directly. Section anchor IDs (`#about`, `#services`, …) must keep matching the nav links in the header and footer.

Sections share a header pattern: a small uppercase `.eyebrow` label (matching the nav link name where there is one), the `h2` title, and an optional one-line `.subtitle`. Layouts are shared too: `.split` (text left, picture or form right) for hero/about/contact, `.section-head` (title block left, action right) for services/reviews/booking, and `.card` for every card. New sections should reuse these rather than adding one-off styles.

Sections share sizing through the `main > section` rule in `styles.css`: the same vertical padding (`--section-pad`) everywhere, and on desktop a shared minimum height (`--section-min`) with content centered vertically. Don't add per-section `padding` to a section; adjust the tokens instead.

Asset links are relative (`css/styles.css`, not `/css/styles.css`), matching the pre-Eleventy site. Text in front matter or data files is autoescaped, so write a plain `&` there, not `&amp;`.

## Design tokens

Source: `Website - Arbur CPA/ARBUR _ BRAND guidlines.pdf`.

- Colors: `--bg-cream:#F6F4F1` `--bg-taupe:#E6DED6` `--accent-tan:#D3C3A6` `--sage:#738063` `--dark-green:#20322E`
- Fonts: **Cormorant Garamond** (headings), **Roboto** (body) — loaded via Google Fonts `<link>` tags in `src/_includes/base.njk`
- Logo usage: the header uses the sage tree mark alone (`logo-mark-sage.png`, cropped out of `logo-horizontal-sage.png`) with "Arbur CPA" set as live text in Cormorant Garamond beside it. Below 1040px the header collapses to the hamburger and the name centers in the header. The footer uses the white mark (`logo-mark-white.png`) with the same live-text wordmark. `logo-stacked-sage.png` is the logo in the structured data; `logo-horizontal-sage.png` is kept but not currently used.

## Source vs. site assets

`Website - Arbur CPA/` holds the original mockup PDFs, brand guidelines, and raw logo/photo files everything is derived from. It's **gitignored on purpose** — local-only reference material, not needed to build or serve the site. On a fresh clone it won't exist; that's expected, not a missing-file bug. If it's present locally, treat it as reference, not something the site links to directly.

`src/assets/images/` holds the versions actually used on the site:
- Hero and headshot were re-encoded as JPEG (cut file size by ~90% with no visible quality loss)
- All three logo PNGs were cropped to their content bounding box — the originals have large transparent margins that make the logo render illegibly tiny if used as-is. If re-exporting a logo from source, re-crop to content bounds the same way.

## Content notes

No placeholder content remains. No phone number or email address is shown on the site, by choice; visitors book a consultation through the embedded Google Calendar appointment schedule (`#book`), or use the contact form below it if they are not ready to book. Every "Book a free consultation" button links to `#book`; the "Contact" nav link goes to the form. Don't add a phone number or email back.

The booking section embeds Google's appointment page in an iframe (`site.bookingEmbedUrl`). Its height is set by hand in `styles.css`: Google stacks the calendar above the time slots when the frame is narrower than ~600px, so phones get a taller frame. If Google changes the layout and the calendar gets cut off or leaves a big gap, re-measure and adjust those two heights.

Testimonials in `src/_data/testimonials.js` are real client reviews copied verbatim from the old site (including the reviewers' own typos). Don't edit or paraphrase them. Don't add them (or the Google rating) to the structured data: Google disallows marking up reviews copied from another site. The Google rating text in `site.js` (`5.0 stars from 11 Google reviews` as of 2026-11-07) is updated by hand.

Everything else (bio paragraphs, service descriptions, intro copy) is drafted sample copy meant to be reviewed/personalized before launch, not placeholder brackets — it's safe to ship as-is but better if Arwa edits it in her own voice.

## Previewing / verifying changes

See `.claude/skills/run-site/SKILL.md`. Short version: `npm install` once, then `npm start` (live-reload dev server at http://localhost:8080). After a change, with `npm start` running, run `npm test` (browser checks) and, for visual changes, `npm run screenshots` and look at the images in `screenshots/`. Neither starts a server itself.
