# Arbur CPA Marketing Website

Single-page marketing site for **Arbur CPA** (Arwa Naalwala, CPA) — a rebrand covering U.S.–Canada cross-border tax, business/individual tax preparation, and small business accounting.

## Stack

[Eleventy](https://www.11ty.dev/) (v3) with Nunjucks templates, plain CSS, and vanilla JS. Eleventy is the only dependency, and there's no bundler or client-side framework. The site is edited rarely, and the owner wanted to avoid the overhead that made Squarespace feel harder than necessary. Keep it lean: don't add a bundler, framework, CMS, extra Eleventy plugins, or a test framework without checking first.

Node is pinned in `.nvmrc`. In non-interactive shells, run `source ~/.nvm/nvm.sh && nvm use` before `npm` commands.

## Hosting

GitHub Pages, deployed by `.github/workflows/deploy.yml`: every push to `main` runs `npm run build` and publishes `_site/`. The repo's Pages source must be set to **GitHub Actions** (Settings → Pages), not "Deploy from a branch". `CNAME` and `.nojekyll` live in `src/` and are passthrough-copied into the build. Current working domain is `arwacpa.com`; a matching `arburcpa.com` domain is planned but not yet purchased — don't hard-code either domain anywhere beyond the `info@arwacpa.com` address already used as the contact email.

## File layout

```
eleventy.config.js              input src/, output _site/, passthrough copies
src/index.njk                   single page, all sections, anchor IDs matching the nav links
src/_includes/base.njk          <head>, fonts, header/footer includes, script tag
src/_includes/partials/         header.njk, footer.njk
src/_data/site.js               email, LinkedIn/Google URLs, rating text, Formspree ID, phone
src/_data/testimonials.js       client review quotes
src/css/styles.css              all styles; design tokens as CSS custom properties at the top
src/js/main.js                  mobile nav toggle + Formspree contact form submit (fetch, no page redirect)
src/assets/images/              logo variants, hero photo, headshot
src/assets/favicon.ico
.claude/skills/run-site/        how to preview the site locally
```

Asset links are relative (`css/styles.css`, not `/css/styles.css`), matching the pre-Eleventy site. Text in front matter or data files is autoescaped, so write a plain `&` there, not `&amp;`.

## Design tokens

Source: `Website - Arbur CPA/ARBUR _ BRAND guidlines.pdf`.

- Colors: `--bg-cream:#F6F4F1` `--bg-taupe:#E6DED6` `--accent-tan:#D3C3A6` `--sage:#738063` `--dark-green:#20322E`
- Fonts: **Cormorant Garamond** (headings), **Roboto** (body) — loaded via Google Fonts `<link>` tags in `src/_includes/base.njk`
- Logo usage: sage lockup (`logo-horizontal-sage.png`) on light backgrounds (header); white icon-only mark (`logo-mark-white.png`) on dark-green backgrounds (footer)

## Source vs. site assets

`Website - Arbur CPA/` holds the original mockup PDFs, brand guidelines, and raw logo/photo files everything is derived from. It's **gitignored on purpose** — local-only reference material, not needed to build or serve the site. On a fresh clone it won't exist; that's expected, not a missing-file bug. If it's present locally, treat it as reference, not something the site links to directly.

`src/assets/images/` holds the versions actually used on the site:
- Hero and headshot were re-encoded as JPEG (cut file size by ~90% with no visible quality loss)
- All three logo PNGs were cropped to their content bounding box — the originals have large transparent margins that make the logo render illegibly tiny if used as-is. If re-exporting a logo from source, re-crop to content bounds the same way.

## Content still needed from Arwa

In `src/_data/site.js`:
- Phone number, if Arwa wants one shown (`phone: ""`; the contact section renders a `tel:` link once it's set. The wireframe marked it optional)

Testimonials in `src/_data/testimonials.js` are real client reviews copied verbatim from the old site (including the reviewers' own typos). Don't edit or paraphrase them. The Google rating text in `site.js` (`5.0 stars from 11 Google reviews` as of 2026-11-07) is updated by hand.

Everything else (bio paragraphs, service descriptions, intro copy) is drafted sample copy meant to be reviewed/personalized before launch, not placeholder brackets — it's safe to ship as-is but better if Arwa edits it in her own voice.

## Previewing / verifying changes

See `.claude/skills/run-site/SKILL.md`. Short version: `npm install` once, then `npm start` (live-reload dev server at http://localhost:8080).
