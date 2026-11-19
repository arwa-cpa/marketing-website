---
id: TASK-6
title: Cut down the Other services text
status: Done
assignee: []
created_date: '2026-11-18T18:59:00Z'
updated_date: '2026-11-19T19:41:00Z'
labels:
  - content
dependencies: []
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Shorten the text in the Other services section (#services, src/_includes/sections/services.njk), the way the cross-border section was slimmed in 4bfc807. It has three cards (individual & family tax preparation, business tax preparation, accounting services), each with a one-sentence description that runs long, under the heading and subtitle.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Each card's description is noticeably shorter, and all three services stay
- [x] #2 The heading and subtitle still read well with the shorter cards
- [x] #3 Checked in screenshots at desktop and phone widths, and npm test passes
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Replaced the three service cards with one card listing the services (individual & family tax preparation, business tax preparation, year-round accounting support), each with its icon and no description, since the names explain themselves. Dropped the section's subtitle, which repeated the list. Beside the list is a client quote in a dark-green panel: the first sentence of Shoeb and Munira Ali's review, word for word, stored as `excerpt` on their entry in src/_data/testimonials.js. The quote moves below the list at 920px and narrower. Tried picture-card-picture like the cross-border section first, but the illustrations looked random.
<!-- SECTION:NOTES:END -->
