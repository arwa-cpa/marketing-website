# Arbur CPA Marketing Website

Single-page marketing site for **Arbur CPA** (Arwa Naalwala, CPA) — a rebrand covering U.S.–Canada cross-border tax, business/individual tax preparation, and small business accounting.

## Stack

Plain HTML/CSS/JS. No framework, no build step, no `package.json`. This is a deliberate choice: the site is edited rarely, and the owner specifically wanted to avoid the build-tool overhead that made Squarespace feel harder than necessary. Don't introduce a bundler, framework, CMS, or test framework without checking first — that would undo the reason this stack was chosen.

## Hosting

GitHub Pages, served from the repo root (no `/docs` subfolder, no build output to publish). Current working domain is `arwacpa.com`; a matching `arburcpa.com` domain is planned but not yet purchased — don't hard-code either domain anywhere beyond the `info@arwacpa.com` address already used as the contact email.

## File layout

```
index.html          single page, all sections, anchor IDs matching the nav links
css/styles.css       all styles; design tokens as CSS custom properties at the top
js/main.js           mobile nav toggle + Formspree contact form submit (fetch, no page redirect)
assets/images/       logo variants, hero photo, headshot
assets/favicon.ico
.claude/skills/run-site/   how to preview the site locally
```

## Design tokens

Source: `Website - Arbur CPA/ARBUR _ BRAND guidlines.pdf`.

- Colors: `--bg-cream:#F6F4F1` `--bg-taupe:#E6DED6` `--accent-tan:#D3C3A6` `--sage:#738063` `--dark-green:#20322E`
- Fonts: **Cormorant Garamond** (headings), **Roboto** (body) — loaded via Google Fonts `<link>` tags in `index.html`
- Logo usage: sage lockup (`logo-horizontal-sage.png`) on light backgrounds (header); white icon-only mark (`logo-mark-white.png`) on dark-green backgrounds (footer)

## Source vs. site assets

`Website - Arbur CPA/` holds the original mockup PDFs, brand guidelines, and raw logo/photo files everything is derived from. It's **gitignored on purpose** — local-only reference material, not needed to build or serve the site. On a fresh clone it won't exist; that's expected, not a missing-file bug. If it's present locally, treat it as reference, not something the site links to directly.

`assets/images/` holds the versions actually used on the site:
- Hero and headshot were re-encoded as JPEG (cut file size by ~90% with no visible quality loss)
- All three logo PNGs were cropped to their content bounding box — the originals have large transparent margins that make the logo render illegibly tiny if used as-is. If re-exporting a logo from source, re-crop to content bounds the same way.

## Content still needed from Arwa

Marked `TODO` in `index.html`:
- Testimonial quotes for the 3 named Google reviewers (Prasath Durairaj, Shoeb and Munira Ali, Jonathan Almeida) — left as `[Paste actual review text here.]` rather than fabricated, since real names are attached to them
- Google review star rating/count and the review link
- LinkedIn URL and Google Business Profile URL
- Formspree form endpoint ID (`action="https://formspree.io/f/REPLACE_WITH_FORM_ID"` in the contact form)
- Phone number, if Arwa wants one shown (currently omitted — wireframe marked it optional)

Everything else (bio paragraphs, service descriptions, intro copy) is drafted sample copy meant to be reviewed/personalized before launch, not placeholder brackets — it's safe to ship as-is but better if Arwa edits it in her own voice.

## Previewing / verifying changes

See `.claude/skills/run-site/SKILL.md`. Short version: `python3 -m http.server` from the repo root — nothing to install.
