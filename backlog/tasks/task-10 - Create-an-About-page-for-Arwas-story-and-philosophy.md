---
id: TASK-10
title: Create an About page for Arwa's story and philosophy
status: To Do
assignee:
  - '@murtuza'
created_date: '2026-11-19T06:18:00Z'
updated_date: '2026-11-19T16:16:00Z'
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
