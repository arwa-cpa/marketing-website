---
id: TASK-16
title: Create a partner referral PDF of Arwa's services and pricing
status: To Do
assignee: []
created_date: '2026-11-21T16:21:00Z'
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
- [ ] #2 PDF source lives in partner-doc/ with a documented command to regenerate it
- [ ] #3 PDF uses the brand fonts, colors and logo and reads well printed and on screen
- [ ] #4 Arwa approves the final PDF
<!-- AC:END -->
