---
id: TASK-12
title: Make the layout, header and footer work on pages other than the home page
status: To Do
assignee:
  - '@murtuza'
created_date: '2026-11-19T16:15:00Z'
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
- [ ] #1 A page in a subfolder (e.g. /privacy/) loads its styles, fonts, images and favicon with no 404s, at desktop and phone widths
- [ ] #2 From that page, the header and footer nav links and the Book a consultation buttons go to the matching section of the home page
- [ ] #3 main.js runs without errors on a page without the contact form, and the mobile menu works there
- [ ] #4 The home page, sitemap and robots.txt build exactly the same as before (compare the build output)
- [ ] #5 CLAUDE.md explains how shared files link so that it works from any page
<!-- AC:END -->
