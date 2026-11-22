---
id: TASK-22
title: Serve the photos at the right size for each screen
status: To Do
assignee: []
created_date: '2026-11-22T12:08:00Z'
updated_date: '2026-11-22T12:25:00Z'
labels:
  - site
  - performance
dependencies: []
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make the two photos lighter, especially on phones: crop them to the frame they're shown in, and give browsers smaller, modern-format copies to choose from. Make all of that automatic, so replacing a photo means dropping in a new original and nothing else.

Keep the photos in the repo: at 131 KB (hero.jpg) and 123 KB (headshot.jpg) they're nowhere near GitHub's limits, GitHub Pages already serves them through a CDN, and an outside image host would add a third party that sees visitors' IP addresses (the privacy notice and the no-third-party test in npm test would both have to change).

The photos: site/src/assets/images/hero.jpg (1536×1024, 3:2, in sections/hero.njk) and headshot.jpg (1200×1789 portrait, in sections/about.njk and about.njk). Both show in .split-media, where CSS crops them to 4:3 (aspect-ratio and object-fit: cover): the hero from the centre, the headshot at 50% 30% (.about .split-media img), so its top and bottom are downloaded and never shown. They're never wider than half the content column on desktop, and full width on phones.

Approach:
- Keep the uncropped originals as the source, and generate the crops from them rather than editing the files by hand. Each photo gets its crop settings in one place: the 4:3 ratio and a focal point matching today's CSS (hero centred, headshot 50% 30%), so it shows exactly what it does now.
- From each crop, generate copies at a few widths (about 480, 800 and 1200px) as AVIF and WebP, with a JPEG fallback, served through <picture> with srcset and sizes so each device downloads only the copy it needs.
- Every <img> gets width and height so the layout doesn't jump while the photos load. The hero keeps loading eagerly and the home-page headshot lazily, as now.
- Automating the crop needs an image library (sharp). Two ways, and either one adds a dependency, so check first: (1) Eleventy's image plugin (@11ty/eleventy-img), which already uses sharp: check that its options can apply a per-photo crop before resizing. It runs on every build, so it also does the srcset, formats and width/height. (2) A small script in site/scripts/ using sharp, run by hand when a photo changes, with the generated files committed: no change to the build, but someone has to remember to run it.
- Once the files are cropped, the CSS crop (aspect-ratio, object-fit, object-position) can stay as a safety net, or be removed if it's no longer needed. Update CLAUDE.md's notes on the images (Source vs. site assets) to match.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Each photo is cropped to 4:3 automatically from its uncropped original, using a focal point set in one place, so the site shows the same framing as now
- [ ] #2 Each photo is served through <picture> with AVIF and WebP sources, a JPEG fallback, srcset and sizes
- [ ] #3 A phone-width visit downloads well under the current ~130 KB for each photo
- [ ] #4 Every photo <img> has width and height, and nothing shifts while the photos load
- [ ] #5 Replacing a photo needs only a new original (plus re-running the script, if that's the approach), and CLAUDE.md says how
- [ ] #6 The photos look the same as before at every width (npm run screenshots), and npm test passes
<!-- AC:END -->
