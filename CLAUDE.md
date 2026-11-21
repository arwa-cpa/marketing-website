# Arbur CPA Marketing Website

Single-page marketing site for **Arbur CPA** (Arwa Naalwala, CPA) — a rebrand covering U.S.–Canada cross-border tax, business/individual tax preparation, and small business accounting.

## Stack

[Eleventy](https://www.11ty.dev/) (v3) with Nunjucks templates, plain CSS, and vanilla JS. Eleventy is the only build dependency (`@playwright/test` is used only for browser tests and screenshots, `backlog.md` only for task tracking, and `node-tectonic` only for the partner flyer PDF), and there's no bundler or client-side framework. The site is edited rarely, and the owner wanted to avoid the overhead that made Squarespace feel harder than necessary. Keep it lean: don't add a bundler, framework, CMS, extra Eleventy plugins, or a test framework without checking first.

Node is pinned in `.nvmrc`. A SessionStart hook in `.claude/settings.json` activates it for Claude's Bash tool, so `npm` commands need no prefix; if `node -v` doesn't match, fall back to `source ~/.nvm/nvm.sh && nvm use`.

## Hosting

GitHub Pages, deployed by `.github/workflows/deploy.yml`: every push to `main` starts the dev server, runs `npm test` against it, then runs `npm run build` and publishes `site/_site/`. A failing test blocks the deploy. The repo's Pages source must be set to **GitHub Actions** (Settings → Pages), not "Deploy from a branch". `CNAME` and `.nojekyll` live in `site/src/` and are passthrough-copied into the build. The site's domain is `arburcpa.com` (switched 2026-11-13 from `arwacpa.com`, the pre-rebrand domain, which is meant to forward to it (a permanent redirect set up in Squarespace Domains) and still carries Arwa's Google Workspace email). Both domains are registered at Squarespace Domains. Don't hard-code either domain anywhere in the site. `site/src/CNAME` is the single source of the domain inside the site: `site/src/_data/siteUrl.js` reads it at build time, and the structured data, sitemap and robots.txt build their absolute URLs from it. Because the site deploys through GitHub Actions, GitHub ignores the CNAME file when deciding what domain to serve; that's set in the repo's Settings → Pages. A domain switch means changing both, plus DNS.

## File layout

The repo is a set of npm workspaces, one folder per part, each with its own `package.json` and dependencies: `site/` (the website), `partner-doc/` (the partner referral flyer for other CPA firms, see "Partner flyer") and `backlog/` (the task tracker). There's one `npm install`, one `package-lock.json` and one `node_modules/`, all at the top, and the top-level `package.json` only lists the workspaces and passes commands through, so every command runs from the top folder. npm runs a workspace's scripts inside its folder, so paths in the site's configs are relative to `site/`.

```
package.json                    workspace list + pass-through scripts (npm start → site, npm run backlog → backlog)
.githooks/pre-push              runs npm test against its own server before every push (enabled by npm install)
.github/workflows/deploy.yml    test, build and publish site/_site/ to GitHub Pages
.claude/skills/run-site/        how to preview and verify the site locally

site/package.json               Eleventy + Playwright, and the site's scripts
site/eleventy.config.js         input src/, output _site/, passthrough copies
site/src/index.njk              page front matter (title, description) + section includes, in page order
site/src/about.njk              /about/, Arwa's story and her philosophy (the header's About link)
site/src/privacy.njk            /privacy/, the privacy notice (linked from the footer)
site/src/sitemap.njk, robots.njk  /sitemap.xml and /robots.txt for search engines
site/src/_includes/sections/    one file per page section: hero, highlights, cross-border, services, about, testimonials, booking, contact
site/src/_includes/base.njk     <head>, fonts, header/footer includes, script tag
site/src/_includes/partials/    header.njk, footer.njk
site/src/_data/site.js          LinkedIn/Google URLs, rating text, booking embed URL, Formspree ID
site/src/_data/testimonials.js  client review quotes
site/src/_data/siteUrl.js       https:// + the domain in src/CNAME, for absolute URLs
site/src/_data/structuredData.js  JSON-LD (AccountingService + Person + WebSite) rendered into <head>
site/src/css/styles.css         all styles; design tokens as CSS custom properties at the top
site/src/js/main.js             mobile nav toggle + Formspree contact form submit (fetch, no page redirect)
site/src/assets/images/         logo variants, hero photo, headshot
site/src/assets/fonts/          self-hosted woff2 fonts (see "Design tokens")
site/src/assets/favicon.ico
site/playwright.config.js       test config; keeps the browser in node_modules
site/tests/site.spec.js         browser checks against the running site (npm test)
site/tests/live/domains.spec.js  checks the real domains: HTTPS, old-domain redirect, email MX (npm run test:live)
site/scripts/screenshots.mjs    saves screenshots to site/screenshots/ for visual review (npm run screenshots)

partner-doc/package.json        node-tectonic (the LaTeX engine) and the build script
partner-doc/partner-services.tex  every word of the partner flyer
partner-doc/arbur-brand.sty     the flyer's look: page, brand colors and fonts, layout macros, \tbd
partner-doc/send-email.mjs      emails the built PDF through the Gmail API (run by the workflow)
partner-doc/assets/             the white tree mark for the flyer's header (a copy of the site's)
.github/workflows/partner-doc.yml  builds the flyer and emails it when partner-doc/ changes

backlog/package.json            the backlog.md CLI
backlog/backlog.config.yml      Backlog.md settings; backlog_directory points it at data/
backlog/data/tasks/, drafts/    pending tasks, site and off-site (see "Task tracking")
backlog/data/docs/              living documents, e.g. the BrandScript the site's copy is built from
```

Each section of the page lives in its own file under `site/src/_includes/sections/`. That's the main reason the site moved to Eleventy, so keep it that way: add a new section as a new file and include it from `index.njk`, rather than putting markup in `index.njk` directly. Section anchor IDs (`#cross-border`, `#reviews`, …) must keep matching the nav links in the header and footer. The header's "About" link goes to the About page (`/about/`), which holds Arwa's full story and her philosophy; the home page's `#about` section is a short teaser that links there, so the home page can stay focused on the client. Services are split into two sections: `#cross-border` (labelled "Cross-border services", her specialty, shown first) and `#services` ("Other services"). The "Services" nav link and the hero's "View services" button go to `#cross-border`, so visitors land on the first and scroll into the second.

Sections share a header pattern: a small uppercase `.eyebrow` label (matching the nav link name where there is one), the `h2` title, and an optional one-line `.subtitle`. Layouts are shared too: `.split` (text left, picture or form right) for hero/about/contact, `.section-head` (title block left, action right) for services/reviews/booking, and `.card` for every card. New sections should reuse these rather than adding one-off styles.

Sections share sizing through the `main > section` rule in `styles.css`: the same vertical padding (`--section-pad`) everywhere, and on desktop a shared minimum height (`--section-min`) with content centered vertically. Don't add per-section `padding` to a section; adjust the tokens instead. The one exception to the minimum height is the home page's stats strip (`.highlights`), a slim band that would otherwise float in empty space.

Internal links are root-relative, the usual Eleventy approach, so they work from any page: `/css/styles.css`, `/assets/images/hero.jpg`, and `/#about` for a home-page section (it still smooth-scrolls when clicked on the home page). The one exception is the "Skip to content" link, `#main`, which stays on the current page. The site is served from the root of its domain; if it ever moves to a subfolder, turn on Eleventy's bundled HTML Base plugin rather than going back to relative links. `site/src/js/main.js` runs on every page, so it must not assume home-page elements like the contact form exist. Text in front matter or data files is autoescaped, so write a plain `&` there, not `&amp;`.

## Design tokens

Source: `Website - Arbur CPA/ARBUR _ BRAND guidlines.pdf`.

- Colors: `--bg-cream:#F6F4F1` `--bg-taupe:#E6DED6` `--accent-tan:#D3C3A6` `--sage:#738063` `--dark-green:#20322E`
- Fonts: **Cormorant Garamond** (headings), **Roboto** (body) — self-hosted in `site/src/assets/fonts/` with `@font-face` rules at the top of `styles.css`, so no third party sees visitors' IP addresses (the privacy notice relies on it). The files are Google Fonts' variable woff2 files (latin and latin-ext subsets). To add a weight or style, download it the same way, from the Google Fonts CSS with a modern browser user agent, rather than linking to Google. A test in `npm test` fails if the page loads anything from a third party outside the booking frame.
- Logo usage: the header uses the sage tree mark alone (`logo-mark-sage.png`, cropped out of `logo-horizontal-sage.png`) with "Arbur CPA" set as live text in Cormorant Garamond beside it. Below 1040px the header collapses to the hamburger and the name centers in the header; at 420px and below it moves back beside the mark, since a centered name collides with the header's Call and Text buttons. The footer uses the white mark (`logo-mark-white.png`) with the same live-text wordmark. `logo-stacked-sage.png` is the logo in the structured data; `logo-horizontal-sage.png` is kept but not currently used. The U.S. and Canadian flags in the cross-border section (`flag-us.svg`, `flag-ca.svg`) are hand-written SVGs recolored in the brand palette on purpose (slightly richer shades of sage, dark green and cream, so they don't look washed out); don't restore the official red, white and blue. Each sits in a white mat (a border in `styles.css`) to match the card between them.

## Source vs. site assets

`Website - Arbur CPA/` holds the original mockup PDFs, brand guidelines, and raw logo/photo files everything is derived from. It's **gitignored on purpose** — local-only reference material, not needed to build or serve the site. On a fresh clone it won't exist; that's expected, not a missing-file bug. If it's present locally, treat it as reference, not something the site links to directly.

`site/src/assets/images/` holds the versions actually used on the site:
- Hero and headshot were re-encoded as JPEG (cut file size by ~90% with no visible quality loss)
- All three logo PNGs were cropped to their content bounding box — the originals have large transparent margins that make the logo render illegibly tiny if used as-is. If re-exporting a logo from source, re-crop to content bounds the same way.

## Content notes

No placeholder content remains. No email address is shown on the site, by choice; don't add one. The one exception is `site.privacyEmail` (privacy@arburcpa.com, a Google Group on the Workspace account), shown only on the privacy page for privacy requests.

The privacy notice (`site/src/privacy.njk`) lists what the site collects and every service that sees visitors' details (Formspree, Google, GitHub). Keep it accurate: adding a form field, an embed, a third-party script or any other service means updating the notice and its `updated` date in the same change. It deliberately states no retention period, because the data sits in Formspree and Google and nobody deletes it on a schedule. The site has no analytics or tracking, so it needs no cookie banner; a test in `npm test` fails if the site stores any cookie or browser storage of its own. Adding analytics would mean adding a consent banner too, so check first. Visitors book a consultation through the embedded Google Calendar appointment schedule (`#book`), use the contact form below it if they are not ready to book, or call or text the business phone number. Every "Book a consultation" button links to `#book`. The site leaves out the word "free" on purpose (repeated everywhere it looked cheap); the booking section's subtitle is the one place that says the consultation has no cost. the "Contact" nav link goes to the form.

The phone number (`site.phone` for display, `site.phoneLink` for `tel:`/`sms:` links and the structured data) is a Google Voice number on the Workspace account, not Arwa's personal cell: calls ring her phone and she answers texts in Google Voice. It appears in the contact section's subtitle (call and text links, worded together with the form so the two read as one "not ready to book?" option rather than more choices), the footer (above 720px), a dark-green "Call or text" strip at the top of the sticky header (above 1040px, where the nav row has no room for it), and, below 1040px, as separate Call and Text icon buttons in the header, which take the place of the header's LinkedIn icon (LinkedIn stays in the footer). No link format makes the phone itself offer both call and text, and a Call/Text pop-up menu was tried and looked off on real phones, so keep them as two buttons.

The booking section embeds Google's appointment page in an iframe (`site.bookingEmbedUrl`). Its height is set by hand in `styles.css`, with ~90px to spare: Google stacks the calendar above the time slots when the frame is narrower than 600px, so narrow frames get a taller height. That switch is a container query on the frame's own width, not a media query on the window: Windows scrollbars take ~17px of width (macOS ones take none), so a window-width breakpoint picked the wrong height on Windows and the calendar scrolled inside the frame. To check for that on a Mac, launch Playwright's Chromium with `ignoreDefaultArgs: ["--hide-scrollbars"]` to get space-taking scrollbars. If Google changes its layout and the calendar gets cut off or leaves a big gap, re-measure and adjust the two heights.

Testimonials in `site/src/_data/testimonials.js` are real client reviews copied verbatim from the old site (including the reviewers' own typos). Don't edit or paraphrase them. A review's `excerpt` is a word-for-word sentence from its quote, shown on its own beside the Other services list. Don't add them (or the Google rating) to the structured data: Google disallows marking up reviews copied from another site. The Google rating text in `site.js` (`5.0 stars from 11 Google reviews` as of 2026-11-07) is updated by hand.

Everything else (bio paragraphs, service descriptions, intro copy) is drafted sample copy meant to be reviewed/personalized before launch, not placeholder brackets — it's safe to ship as-is but better if Arwa edits it in her own voice.

The site's message comes from the StoryBrand BrandScript in `backlog/data/docs/doc-1 - BrandScript.md` (the client is the hero, Arwa the guide; lead with "she makes it understandable", not with detail). Write or review copy against it, and when the message changes, update the BrandScript first. It's a plain Markdown file meant to be edited directly (unlike tasks, which go through the CLI); TASK-11 links to it.

## Partner flyer

`partner-doc/` builds a one-page US Letter PDF for other CPA firms that contract Arwa for the cross-border parts of their clients' returns: what she takes on, her price for each, and how an engagement works (TASK-16). It's written in LaTeX, not HTML, by choice: `partner-services.tex` holds every word, and `arbur-brand.sty` holds the look (the design tokens, Cormorant Garamond and Roboto at the site's weights, the header band, the services table, the numbered steps), so content edits never touch styling. Write its copy against the BrandScript, with the partner CPA as the hero.

`npm run partner-doc` builds it to `partner-doc/build/partner-services.pdf` (gitignored; the PDF is a build artifact, never committed). The engine is Tectonic, from the npm package `node-tectonic`, which ships Tectonic's binary per platform the way esbuild does, so `npm install` is the whole setup, with no TeX install. Its Linux binary was checked to be byte-identical to the official Tectonic 0.16.9 release; it's pinned to an exact version, so recheck when bumping it. Tectonic downloads the LaTeX packages and fonts a document uses on its first build (from relay.fullyjustified.net, which redirects to data1b.fullyjustified.net; a cloud session's network must allow both) and caches them. The fonts come from CTAN that way, so the site's woff2 files aren't used: Roboto is `.otf`, Cormorant Garamond `.ttf`, as named in `arbur-brand.sty`.

Anything not yet confirmed with Arwa goes in `\tbd{…}`: it prints on a tan highlight, and while any remain the page carries a DRAFT watermark (the page is a single page, so a flag set while typesetting is enough; no manual switch). Remove the last `\tbd` and the watermark goes away. Keep the flyer to one page: check the build output for "Overfull" warnings and look at the PDF after a change.

`.github/workflows/partner-doc.yml` runs on pushes to `main` that touch `partner-doc/` (or itself), and by hand from the Actions tab. It builds the PDF, keeps it as the run's artifact, and emails it, marking the subject "[DRAFT]" while any `\tbd` remains. Sending is split in two. Google's own `google-github-actions/auth` action signs in to a Google Cloud service account through Workload Identity Federation, so no key or password is stored anywhere (only this repo's `main` branch is trusted). Then `partner-doc/send-email.mjs`, a plain Node script with no dependencies, uses that sign-in to get a token that acts as a Workspace user through domain-wide delegation, limited to the `gmail.send` scope, and sends the message through the Gmail API. Domain-wide delegation lets the service account send as any user in the domain, so keep the identity provider's condition limited to this repo's `main`. The Google Cloud project sits under the organization tied to the Workspace domain. The workflow reads four repo variables (not secrets): `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_SERVICE_ACCOUNT`, `PARTNER_DOC_SENDER` (the Workspace user the email comes from) and `PARTNER_DOC_RECIPIENT` (who gets it). The site's deploy doesn't build or publish the flyer.

## Task tracking

What's still pending, on the site or off it (domain, profiles, copy review), is tracked with [Backlog.md](https://github.com/MrLesk/Backlog.md): one Markdown file per task in `backlog/data/tasks/`. It's a dependency of the `backlog` workspace, not installed globally, and it has to run inside `backlog/` to find its config, so run it from the top folder with `npm run backlog --` (`npm run -s backlog -- task list --plain`, `npm run -s backlog -- task create "Title" -d "…" -l label`, `npm run -s backlog -- task edit 3 -s Done`; `-s` keeps npm's own output out of the CLI's). Plain `npx backlog` at the top no longer finds the tasks. Change tasks through the CLI rather than editing the files by hand. `auto_commit` is off, so task changes are committed like any other change. When work here finishes or uncovers a follow-up, update the backlog to match. A PreToolUse hook (`.claude/hooks/backlog-check.sh`) enforces this for Claude: `git commit` is blocked unless `backlog/` is staged (or staged in the same command), or the command starts with `BACKLOG_CHECKED=1` after checking that nothing needs updating. It needs `jq` (`brew install jq`); without it, every commit is blocked until jq is installed. Commits made in a terminal aren't affected. A SessionStart hook (`.claude/hooks/backlog-start.sh`, on startup and `/clear`) gives Claude the open tasks so each session starts by planning from the backlog.

## Previewing / verifying changes

See `.claude/skills/run-site/SKILL.md`. Short version: `npm install` once, then `npm start` (live-reload dev server at http://localhost:8080). After a change, with `npm start` running, run `npm test` (browser checks) and, for visual changes, `npm run screenshots` and look at the images in `site/screenshots/`. Neither starts a server itself. All of these run from the top folder. After any DNS, forwarding or hosting change, run `npm run test:live` (no server needed): it checks the live domains over the internet, so it's deliberately not part of `npm test`, the pre-push hook, or CI.
