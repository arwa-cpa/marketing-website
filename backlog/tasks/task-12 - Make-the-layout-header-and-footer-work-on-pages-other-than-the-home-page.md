---
id: TASK-12
title: Make the layout, header and footer work on pages other than the home page
status: Done
assignee:
  - '@murtuza'
created_date: '2026-11-19T16:15:00Z'
updated_date: '2026-11-19T16:34:00Z'
labels:
  - site
dependencies: []
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The site has only ever had one page, so the shared files assume they're on the home page:
- base.njk, header and footer: asset paths (css/styles.css, assets/images/...) are relative to the site root, so from /privacy/ they'd point to /privacy/css/..., which doesn't exist. The page would load with no styles, fonts, logo or favicon.
- Nav links: links like #about and #book point to sections that only exist on the home page, so on another page they'd go nowhere.
- main.js: it assumes the contact form exists. On a page without it, the script throws an error, which also stops the mobile menu from working there.

Make the change easy, then make the easy change: this prepares the site for a second page, so TASK-9 (privacy page) and TASK-10 (About page) can just add theirs.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A page in a subfolder (e.g. /privacy/) loads its styles, fonts, images and favicon with no 404s, at desktop and phone widths
- [x] #2 From that page, the header and footer nav links and the Book a consultation buttons go to the matching section of the home page
- [x] #3 main.js runs without errors on a page without the contact form, and the mobile menu works there
- [x] #4 The home page looks and behaves the same as before: screenshots match, npm test passes (including nav links scrolling to their sections), and the sitemap and robots.txt are unchanged
- [x] #5 CLAUDE.md states the linking rule: internal links are root-relative (start with /)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Use root-relative URLs, the standard Eleventy approach: every internal link starts with / (/css/styles.css, /assets/images/hero.jpg, /#about), in the shared files and section files alike, so they resolve the same from any page. No computed prefix and no plugin: the site is served from the root of arburcpa.com. If it is ever served from a subfolder, Eleventy's bundled HTML Base plugin adds the prefix at build time.

1. Switch asset paths and section links in base.njk, header, footer and section files to root-relative.
2. main.js: only set up the contact form if the page has one (form?.addEventListener).
3. Check from a temporary page in a subfolder (deleted afterwards): no errors or 404s, styles/fonts/images load, nav links land on the home page sections, mobile menu works.
4. Compare home page screenshots before and after; run npm test; diff sitemap.xml and robots.txt.
5. Update CLAUDE.md's asset-links line to the root-relative rule.

First try (discarded): a computed {{ root }} prefix to keep links relative, built around a CLAUDE.md convention that no longer had a reason.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Done with root-relative links. Checked:
- Mock page at /mock/ (deleted afterwards), at 1280px and 390px: no errors or 404s; styles, fonts, images, favicons and the footer year load; the mobile menu opens; Home, About, Services, Client Reviews and Contact land on the home page sections, as do the header and footer Book a consultation buttons (the footer button is hidden on phones by design).
- Home page screenshots: desktop and mobile pixel-identical to before; the open mobile menu differs by a few pixels around the hamburger icon (animation timing).
- npm test passes (9); the nav-link test now reads the section id from the link's hash.
- sitemap.xml and robots.txt unchanged.
<!-- SECTION:NOTES:END -->
