---
id: TASK-3
title: Rename Workspace email to @arburcpa.com
status: Done
assignee:
  - '@murtuza'
created_date: '2026-11-18T18:59:00Z'
updated_date: '2026-11-19T05:13:00Z'
labels:
  - domain
  - email
dependencies: []
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Rename Arwa's Google Workspace address to @arburcpa.com, then check that SPF, DKIM and DMARC pass for the new domain.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Done differently from the plan: instead of renaming Arwa's user, arburcpa.com was added as a secondary domain in Google Workspace, so mail to either domain reaches her, and her @arburcpa.com address is the default in Gmail's Send mail as. Her Workspace user is still @arwacpa.com underneath.

Final email DNS, the same on both domains (checked 2026-11-19):
- SPF: v=spf1 include:_spf.google.com ~all (~all rather than -all so forwarded mail isn't rejected before DKIM is checked; DMARC blocks spoofing)
- DKIM: Google signing with each domain's own key (google._domainkey)
- DMARC: v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s
- MX: Google

Fixes along the way:
- arwacpa.com: Google wasn't signing with its own DKIM key (mail was signed for arwacpa-com.20260707.gappssmtp.com, so DMARC would have failed). Turned on authentication in the Admin console (Apps → Gmail → Authenticate email), then added the DMARC record, which it never had.
- arburcpa.com: the Google records came from Squarespace's 'Domain Connect to Entri' preset. A second Squarespace 'Email Security' preset (meant for domains with no email) added v=spf1 -all, the DMARC record and an empty _domainkey record, and Squarespace merged the two SPF records into one. Removed the Email Security preset and re-added the same DMARC record as a custom record.

Test messages from both addresses to an outside Gmail account show SPF, DKIM (matching domain) and DMARC all PASS.
<!-- SECTION:NOTES:END -->
