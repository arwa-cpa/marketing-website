---
id: TASK-22
title: Serve the photos at the right size for each screen
status: To Do
assignee: []
created_date: '2026-11-22T12:08:00Z'
labels:
  - site
  - performance
dependencies: []
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make the two photos lighter, especially on phones, by giving browsers smaller, modern-format copies to choose from. Keep them in the repo: at 131 KB (hero.jpg) and 123 KB (headshot.jpg) they're nowhere near GitHub's limits, GitHub Pages already serves them through a CDN, and an outside image host would add a third party that sees visitors' IP addresses (the privacy notice and the no-third-party test in npm test would both have to change).

The photos: site/src/assets/images/hero.jpg (1536×1024, in sections/hero.njk) and headshot.jpg (1200×1789 portrait, in sections/about.njk and about.njk). Both show in .split-media, cropped to 4:3 by CSS and never wider than half the content column on desktop, full width on phones.

Approach:
- Export each photo by hand at a few widths (about 480, 800 and 1200px) as AVIF and WebP, keeping a JPEG fallback, and use <picture> with srcset and sizes so each device downloads only the copy it needs. Two photos don't justify a build step; Eleventy's image plugin would automate this, but it's an extra plugin, so check first if it's wanted.
- Consider cropping the headshot to the 4:3 frame it's shown in (centred near 30% from the top, as .about .split-media img sets), so the cut-off part isn't downloaded.
- Add width and height to each <img> so the layout doesn't jump while the photos load.
- Keep the hero loading eagerly and the home-page headshot lazily, as now.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Each photo is served through <picture> with AVIF and WebP sources, a JPEG fallback, srcset and sizes
- [ ] #2 A phone-width visit downloads well under the current ~130 KB for each photo
- [ ] #3 Every photo <img> has width and height, and nothing shifts while the photos load
- [ ] #4 The photos look the same as before at every width (npm run screenshots), and npm test passes
<!-- AC:END -->
