---
id: TASK-10
title: Create an About page for Arwa's story and philosophy
status: Done
assignee:
  - '@murtuza'
created_date: '2026-11-19T06:18:00Z'
updated_date: '2026-11-19T17:02:00Z'
labels:
  - content
dependencies:
  - TASK-12
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The home page has a lot of text explaining Arwa. Move it to its own page with two parts:
1. Arwa: her personal and professional history.
2. Her philosophy: to simplify (taxes explained plainly, so clients can make confident decisions).

Today this lives in the About section (src/_includes/sections/about.njk) and the 'Our approach' intro in src/_includes/sections/highlights.njk. On the home page, replace it with a short teaser that links to the new page. Her personal history will need details from Arwa.

Things to settle: the site is single-page today, so the header and footer nav links (#about etc.) need to work from both pages; asset links are relative; the sitemap picks up new pages on its own.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Decisions (2026-11-19): draft Arwa's story now from what we know and add questions for her to TASK-5; the header's About link goes to /about/; the three stats stay on the home page.

1. New /about/ page (src/about.njk): her story beside the headshot (.split, like the About section), then her philosophy (the Our approach text, expanded), ending with a Book a consultation button to /#book.
2. Home page: the About section becomes a short teaser with a link to /about/ (keeps #about); the Our approach intro moves off the home page; the stats stay.
3. Header About link to /about/; tests updated (home nav test skips links to other pages; About page loads, is linked from the nav and teaser).
4. Screenshots of both pages; CLAUDE.md updated (file layout, nav note).
5. TASK-5: questions for Arwa about her history, plus a request for one more photo.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Drafted 2026-11-19: /about/ (src/about.njk) with her story beside the headshot, then Our approach with three principles and a Book a consultation button. The home page's About section is now a short teaser linking to /about/; Our approach moved off the home page; the stats stay as a slim band (exempt from the section minimum height). Header About link goes to /about/. Tests: the non-home-page checks run for /about/ and /privacy/, plus the About links and its booking button (20 pass). Questions for Arwa and a photo request added to TASK-5.
<!-- SECTION:NOTES:END -->
