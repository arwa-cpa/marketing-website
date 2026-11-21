---
id: TASK-20
title: Turn the PNG logos into SVGs
status: To Do
assignee: []
created_date: '2026-11-21T20:58:00Z'
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
