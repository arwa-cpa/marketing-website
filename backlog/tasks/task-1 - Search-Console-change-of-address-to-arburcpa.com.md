---
id: TASK-1
title: 'Search Console: change of address to arburcpa.com'
status: In Progress
assignee: []
created_date: '2026-11-18T18:59:00Z'
updated_date: '2026-11-18T19:53:00Z'
due_date: '2026-11-19'
labels:
  - domain
dependencies: []
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
File a Change of Address in Google Search Console from arwacpa.com to arburcpa.com, so Google moves search results to the new domain sooner.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-11-18: Added and verified Domain properties for arwacpa.com and arburcpa.com in the same account. Change of Address (run from arwacpa.com) fails the '301-redirect from homepage' check with 'Couldn't fetch the page http://arwacpa.com/', though the redirect works (301 to https://arburcpa.com/, npm run test:live passes) and URL Inspection's live test says the URL is available to Google. Likely a delay after verifying the new properties: retry Settings → Change of address from arwacpa.com on 2026-11-19, and if it keeps failing for a few days, look at Squarespace's forwarding.
<!-- SECTION:NOTES:END -->
