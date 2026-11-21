---
id: TASK-20
title: Turn the PNG logos into SVGs
status: Done
assignee: []
created_date: '2026-11-21T20:58:00Z'
updated_date: '2026-11-21T21:50:00Z'
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

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
The tree mark is now one SVG, site/src/assets/images/logo-mark.svg (896 bytes, replacing logo-mark-sage.png and logo-mark-white.png, 18 KB and 74 KB), drawn in currentColor so the page colors it. No vector original was available, so it was redrawn as clean geometry (an arc, two chevrons, a stem with a flared foot) and fitted to the PNG by pixel comparison, to within antialiasing; viewBox cropped to content bounds. If the designer supplies a vector original, its paths can replace these, keeping fill="currentColor".

Site: a {% logoMark "class" %} shortcode in eleventy.config.js inlines the SVG; .brand-mark colors it sage, .footer-logo-mark white.

Flyer: partner-doc/logo-mark.mjs (run by npm run partner-doc) turns the SVG's paths into a TikZ drawing (svg.path library), \arburmark{height}{color}, so partner-doc/assets/ is gone. A logo change alone doesn't start the flyer workflow; the new mark goes out with the next flyer build.

Kept as PNG: logo-stacked-sage.png (structured data logo, includes the name), logo-horizontal-sage.png (unused), and the favicons/apple-touch-icon.
<!-- SECTION:FINAL_SUMMARY:END -->
