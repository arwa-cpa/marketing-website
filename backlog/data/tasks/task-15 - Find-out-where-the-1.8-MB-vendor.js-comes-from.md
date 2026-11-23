---
id: TASK-15
title: Find out where the 1.8 MB vendor.js comes from
status: Done
assignee: []
created_date: '2026-11-21T16:17:00Z'
updated_date: '2026-11-23T00:35:00Z'
labels:
  - performance
dependencies: []
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Inspecting the running site in Chrome DevTools showed a 1.8 MB vendor.js file. The site itself ships no file by that name (none in site/src/ or site/_site/, and there's no bundler), so it comes from somewhere else. Likely suspects: the embedded Google Calendar appointment page in #book (Google's own scripts, loaded inside the iframe), or a Chrome extension (extensions' scripts show up in DevTools' Sources panel). Find the source, and if it's Google's embed and slows the page, look at options such as lazy-loading the iframe (loading="lazy") so it only loads near the booking section.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Source of vendor.js identified (initiator/frame in the Network panel) and noted on this task
- [x] #2 If it comes from the site or the booking embed, decide whether to change anything (e.g. lazy-load the iframe), and do it or note why not
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-11-22: vendor.js doesn't appear in the Network panel in an incognito window (where extensions are off by default), so it came from a Chrome extension, not the site or the booking embed. Nothing to change.
<!-- SECTION:NOTES:END -->
