---
id: TASK-20
title: Turn the PNG logos into SVGs
status: In Progress
assignee: []
created_date: '2026-11-21T20:58:00Z'
updated_date: '2026-11-22T04:08:00Z'
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
Step 1: site/src/assets/images/logo-mark.svg exists: the tree mark redrawn as clean geometry (an arc, two chevrons, a stem with a flared foot), fitted to logo-mark-sage.png to within antialiasing, since no vector original was available. Its paths sit in <g id="mark" fill="currentColor">, so a page can draw it with <use> and color it with CSS.

Step 2: the header's mark uses it: <svg class="brand-mark" viewBox="0 0 346.88 439.25"><use href="/assets/images/logo-mark.svg#mark"/></svg>, colored sage by .brand-mark's color. The viewBox has to match the file's. logo-mark-sage.png is no longer used by the site but is kept for now. The footer (logo-mark-white.png) and the flyer still use PNGs.

Step 3: the footer's mark uses it the same way, colored white by .footer-logo-mark to match the wordmark. logo-mark-white.png is no longer used by the site but is kept for now. The flyer still uses its PNG copies.
<!-- SECTION:NOTES:END -->
