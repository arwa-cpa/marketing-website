---
id: TASK-19
title: Make the cross-border flags brighter and bolder
status: Done
assignee: []
created_date: '2026-11-20T19:44:00Z'
updated_date: '2026-11-21T19:59:00Z'
labels:
  - design
dependencies: []
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The U.S. and Canadian flags in the cross-border section (site/src/assets/images/flag-us.svg, flag-ca.svg) look drab and washed out. Keep them in the brand palette (not the official red, white and blue), but make them brighter or bolder: e.g. richer or more saturated versions of the sage, dark green and cream, or stronger contrast between the stripes and the field.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Flags still use brand-derived colors, not the official red, white and blue
- [x] #2 Flags read as noticeably brighter or bolder than before in screenshots, on desktop and phone
- [x] #3 CLAUDE.md's note on the flag colors updated if the palette they use changes
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Richer sage (#5d7a3c), brighter cream (#fcfbf8) and deeper dark green (#16302a), merged in PR #2; then an 8px white mat (6px on phones) around each flag in styles.css. Checked in screenshots at desktop and phone widths.
<!-- SECTION:NOTES:END -->
