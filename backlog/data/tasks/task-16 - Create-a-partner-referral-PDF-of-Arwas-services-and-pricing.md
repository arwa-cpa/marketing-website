---
id: TASK-16
title: Create a partner referral PDF of Arwa's services and pricing
status: In Progress
assignee: []
created_date: '2026-11-21T16:21:00Z'
updated_date: '2026-11-21T17:29:00Z'
labels:
  - content
dependencies:
  - TASK-14
ordinal: 16000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Arbur CPA has two kinds of clients: individuals and businesses who hire Arwa directly to do their taxes, and other CPA firms who need a specialist. Those firms keep their client but contract with Arwa to complete part of a return (e.g. the cross-border pieces). This task is for the second kind: a PDF to send to partner CPAs that describes the services Arwa offers them and the pricing for each.

Lives in partner-doc/ (set up by TASK-14), as its own project independent of the site. Tooling is open: e.g. write it in HTML/CSS using the brand fonts and colors and print it to PDF with a headless browser, or another approach if it's simpler to keep up to date.

Needs from Arwa: the list of partner services (which forms or parts of a return she takes on), her pricing for each, how partner engagements work (turnaround, what she needs from the referring CPA, who talks to the client), and how partners should get in touch.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Partner services, pricing and engagement process confirmed with Arwa
- [x] #2 PDF source lives in partner-doc/ with a documented command to regenerate it
- [ ] #3 PDF uses the brand fonts, colors and logo and reads well printed and on screen
- [ ] #4 Arwa approves the final PDF
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
2026-11-21: Built as LaTeX, by choice: partner-doc/partner-services.tex holds every word and partner-doc/arbur-brand.sty the look (brand colors, Cormorant Garamond and Roboto at the site's weights, white tree mark in a dark-green header band). npm run partner-doc builds partner-doc/build/partner-services.pdf with Tectonic from the npm package node-tectonic (its Linux binary is byte-identical to the official 0.16.9 release), so there's no TeX install. The PDF is never committed: .github/workflows/partner-doc.yml builds it on pushes to main that touch partner-doc/ and emails it to arwa@arburcpa.com, through the Gmail API once it's connected to Google Cloud (TASK-18).

The copy is a one-page draft written from the site's cross-border copy: services (Canadian T1, U.S. return for Canadian residents, foreign tax credits and treaty positions, FBAR/8938/T1135, cross-border review), a four-step 'how it works', and a contact strip. Everything still to confirm with Arwa (all prices, the service list, what she needs from the referring CPA, turnaround, who talks to the client, the contact email) is in \tbd{...}, which prints highlighted and puts a DRAFT watermark on the page until none are left. Written in Arwa's first person, unlike the site's 'we'; switch if she prefers. AC #3 waits on a review of the PDF.
<!-- SECTION:NOTES:END -->
