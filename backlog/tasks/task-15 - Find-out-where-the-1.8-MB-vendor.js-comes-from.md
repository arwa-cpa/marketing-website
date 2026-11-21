---
id: TASK-15
title: Find out where the 1.8 MB vendor.js comes from
status: To Do
assignee: []
created_date: '2026-11-21T16:17:00Z'
labels:
  - performance
dependencies: []
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Inspecting the running site in Chrome DevTools showed a 1.8 MB vendor.js file. The site itself ships no file by that name (none in src/ or _site/, and there's no bundler), so it comes from somewhere else. Likely suspects: the embedded Google Calendar appointment page in #book (Google's own scripts, loaded inside the iframe), or a Chrome extension (extensions' scripts show up in DevTools' Sources panel). Find the source, and if it's Google's embed and slows the page, look at options such as lazy-loading the iframe (loading="lazy") so it only loads near the booking section.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Source of vendor.js identified (initiator/frame in the Network panel) and noted on this task
- [ ] #2 If it comes from the site or the booking embed, decide whether to change anything (e.g. lazy-load the iframe), and do it or note why not
<!-- AC:END -->
