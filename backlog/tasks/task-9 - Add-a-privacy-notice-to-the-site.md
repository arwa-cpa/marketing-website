---
id: TASK-9
title: Add a privacy notice to the site
status: In Progress
assignee: []
created_date: '2026-11-19T05:45:00Z'
updated_date: '2026-11-19T16:02:00Z'
labels:
  - content
dependencies: []
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The contact form and the booking calendar collect names, emails and phone numbers. Canada's PIPEDA expects visitors to be told what's collected and why, and Quebec's Law 25 expects a published privacy policy from businesses that collect personal information online. Add a short privacy section or page (what's collected, why, which services handle it: Google Calendar, Formspree, Google Voice; how to ask for it to be deleted), linked from the footer. Arwa should confirm what applies to her practice. The site sets no tracking cookies (a test enforces it), so no cookie banner is needed.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 privacy@arburcpa.com exists (Google Group in Workspace, arburcpa.com added to Workspace with MX records at Squarespace Domains) and a test email sent to it from an outside address arrives, before the privacy page is pushed
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Decisions (2026-11-19):
- A separate /privacy/ page linked from the footer, not a home-page section. The multi-page plumbing it needs is reused by TASK-10.
- No retention period: the notice says where the information is stored and that visitors can ask for it to be deleted, without promising a timeline nobody maintains.
- Privacy requests go to privacy@arburcpa.com (a Google Group), shown on the privacy page only, as the one exception to the no-email rule. It must work before pushing (AC #1).
- Arwa is named as the person responsible for privacy (Quebec's Law 25; good practice under PIPEDA too).
- Self-host the fonts so Google Fonts no longer sees visitors' IP addresses and drops out of the notice.
- One line saying the notice covers the website only; client files fall under her professional confidentiality obligations and engagement letters.
- Publish, then Arwa reviews: add the privacy page to TASK-5.

Steps (separate commits):
1. Self-host the fonts: Cormorant Garamond and Roboto (the weights in use) into src/assets/fonts/, @font-face rules in styles.css, and remove the Google Fonts <link> tags from base.njk. Check screenshots for layout shifts. Update CLAUDE.md's font note.
2. Multi-page plumbing: asset paths that work from any page depth (a path prefix in the layout, keeping links relative); header and footer nav links go to /#about etc. when not on the home page; each page has its own title and description front matter.
3. Privacy page (src/privacy.njk), in plain language:
   - Who we are: Arbur CPA, Arwa Naalwala, and how to reach her
   - What we collect and why: contact form (name, email, message), booking calendar (what Google's booking form asks for), calls and texts, and on every page load the IP address and browser details seen by the host. Used only to respond and schedule; never sold or used for marketing.
   - Services that handle it, with links to their privacy policies: Formspree, Google (Calendar, Voice), GitHub Pages. Data may be stored in the U.S.
   - Cookies and tracking: none, no analytics
   - Your rights: ask what we hold, correct it, or have it deleted, at privacy@arburcpa.com
   - Person responsible for privacy: Arwa Naalwala
   - Scope: website only (the one line above)
   - Last updated date
   Add a footer link, extend npm test to cover the page (loads, nav links reach the home page sections, no cookies or storage), check screenshots, and update CLAUDE.md (multiple pages, the privacy email exception, self-hosted fonts).
4. Off-site (Murtuza): add arburcpa.com to Google Workspace, add its MX records at Squarespace Domains, create the privacy@ group, and send a test email from an outside address.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Step 1 (fonts) done: self-hosted in src/assets/fonts/, no visual change (same page heights, only anti-aliasing differences). A new test fails if the page loads anything from a third party outside the booking frame.

For the notice: the Google Calendar booking frame loads as the visitor scrolls near it (loading=lazy), whether or not they book, and loads Google's own fonts and a reCAPTCHA inside it. So Google sees the IP address of anyone who scrolls toward #book, and the Google Calendar entry should say so.
<!-- SECTION:NOTES:END -->
