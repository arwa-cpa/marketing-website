---
id: TASK-20
title: Turn the PNG logos into SVGs
status: In Progress
assignee: []
created_date: '2026-11-21T20:58:00Z'
updated_date: '2026-11-21T23:06:00Z'
labels:
  - site
  - brand
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Replace the PNG logo files with SVGs, so the logo stays sharp at any size and the files get smaller.

The logos in use: site/src/assets/images/logo-mark-sage.png (header), logo-mark-white.png (footer), logo-stacked-sage.png (the logo in the structured data), and logo-horizontal-sage.png (kept, not used). partner-doc/assets/ has copies of the two marks for the flyer.

Things to check:
- Source: start from vector originals if any exist (the brand guidelines and raw files in the local-only Website - Arbur CPA/ folder, or from the designer) rather than tracing the PNGs, which loses detail.
- The partner flyer: XeTeX can't include an SVG directly, so the flyer would need a PDF copy of each mark or a conversion step in the build.
- The favicons and apple-touch-icon (favicon-192.png, favicon-512.png, apple-touch-icon.png, icon-sage.png) stay PNG, since browsers and phones expect them that way.
- Re-crop to the content bounds, as CLAUDE.md notes for the PNGs, and update CLAUDE.md's logo notes.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Step 1: site/src/assets/images/logo-mark.svg exists: the tree mark redrawn as clean geometry (an arc, two chevrons, a stem with a flared foot), fitted to logo-mark-sage.png to within antialiasing, since no vector original was available. It fills with currentColor, so it can be colored as needed. Nothing uses it yet; the site and flyer still use the PNGs. Next steps to be taken one at a time.

Step 2: the header's mark uses logo-mark.svg, inlined by a {% logoMark "class" %} shortcode in eleventy.config.js and colored sage by .brand-mark's color. logo-mark-sage.png is no longer used by the site but is kept for now. The footer (logo-mark-white.png) and the flyer still use PNGs.
<!-- SECTION:NOTES:END -->
