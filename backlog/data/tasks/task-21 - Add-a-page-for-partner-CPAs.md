---
id: TASK-21
title: Add a page for partner CPAs
status: Done
assignee: []
created_date: '2026-11-21T20:58:00Z'
updated_date: '2026-11-23T00:33:00Z'
labels:
  - site
  - content
dependencies:
  - TASK-16
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
A page on the site for other CPA firms, with content like the partner flyer (partner-doc/): the cross-border work Arwa takes on for them, how an engagement works, and how to get in touch. The flyer is something to send; the page is something partners can find and link to.

Things to decide:
- Prices: whether partner pricing goes on a public page or stays in the flyer only (Arwa's call).
- How visitors reach it: a link in the footer, the header, the About page, or unlisted for sharing only.
- Keeping it in sync with the flyer: the flyer's words live in partner-doc/partner-services.tex, so the page would repeat them. Either accept two copies and update both together, or move the shared content into one source both read.
- How partners get in touch: the existing booking calendar or contact form, or something specific to partners (a new form field or service means updating the privacy notice).

Waits on TASK-16, so the services, process and contact details are confirmed with Arwa first. Follows the site's conventions in CLAUDE.md: its own .njk page like about.njk, the shared section and card styles, and copy written against the BrandScript.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-11-22: Built /partners/ (site/src/partners.njk), linked from the header as "For CPAs". Decisions: no prices on the page (flyer only; a test checks for no $); a header nav link (to make room, Client Reviews became Reviews, nav eyebrow too, and the nav gap went from 32px to 24px); two copies of the content, page and flyer updated together (noted in CLAUDE.md and the page's source); partners get in touch by phone or the existing booking calendar, so no new form field and no privacy notice change. Added a partner section to the BrandScript. Third person ("Arwa", "she") like the About page, unlike the flyer's first person. Still to confirm with Arwa through TASK-16 before calling this done: the service list, what she needs from the referring CPA, turnaround, and whether questions can go straight to the client (step 3 says they can, if the firm prefers). The page avoids the flyer's unconfirmed specifics otherwise.
<!-- SECTION:NOTES:END -->
