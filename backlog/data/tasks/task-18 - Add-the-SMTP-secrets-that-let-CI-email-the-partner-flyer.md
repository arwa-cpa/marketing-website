---
id: TASK-18
title: Add the SMTP secrets that let CI email the partner flyer
status: To Do
assignee: []
created_date: '2026-11-21T17:29:00Z'
labels:
  - repo
  - email
dependencies: []
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The partner-doc workflow (.github/workflows/partner-doc.yml) emails the built flyer PDF to arwa@arburcpa.com through Gmail's SMTP server. It needs two repository secrets (GitHub: Settings → Secrets and variables → Actions):

- PARTNER_DOC_SMTP_USER: the Workspace address to send from (e.g. Arwa's own; the email goes to her)
- PARTNER_DOC_SMTP_PASSWORD: a Google app password for that account (myaccount.google.com → Security → App passwords). It needs 2-Step Verification on the account, and app passwords allowed in the Workspace admin console if they're restricted.

Then run the workflow by hand from the Actions tab (Email the partner flyer → Run workflow) and check the email arrives with the PDF attached.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Both secrets added to the repo
- [ ] #2 A manual run of the partner-doc workflow delivers the PDF to arwa@arburcpa.com
<!-- AC:END -->
