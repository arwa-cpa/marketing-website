---
id: TASK-18
title: Connect the partner-flyer workflow to Google Cloud for email
status: To Do
assignee: []
created_date: '2026-11-21T17:29:00Z'
updated_date: '2026-11-21T17:50:00Z'
labels:
  - repo
  - email
dependencies: []
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The partner-doc workflow (.github/workflows/partner-doc.yml) emails the built flyer PDF through the Gmail API, signed in to Google Cloud with Workload Identity Federation: GitHub's signed token is traded for short-lived Google credentials, so no key or password is stored anywhere. It needs a one-time setup in Google Cloud (a project under the organization tied to the Workspace domain), the Workspace admin console and GitHub.

Run in Cloud Shell, as an organization admin. Set ORG_ID first (gcloud organizations list):

```
ORG_ID=<organization id>
PROJECT=arbur-cpa-automation
gcloud projects create $PROJECT --organization=$ORG_ID
gcloud config set project $PROJECT
PROJECT_NUMBER=$(gcloud projects describe $PROJECT --format='value(projectNumber)')

# Organization policies that could block the steps below
gcloud resource-manager org-policies list --project=$PROJECT

gcloud services enable iamcredentials.googleapis.com sts.googleapis.com gmail.googleapis.com
gcloud iam service-accounts create partner-flyer-mailer --display-name="Partner flyer mailer"
SA=partner-flyer-mailer@$PROJECT.iam.gserviceaccount.com

gcloud iam workload-identity-pools create github --location=global --display-name="GitHub Actions"
gcloud iam workload-identity-pools providers create-oidc marketing-website \
  --location=global --workload-identity-pool=github \
  --issuer-uri=https://token.actions.githubusercontent.com \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
  --attribute-condition="assertion.repository == 'arwa-cpa/marketing-website' && assertion.ref == 'refs/heads/main'"

gcloud iam service-accounts add-iam-policy-binding $SA \
  --role=roles/iam.serviceAccountTokenCreator \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/attribute.repository/arwa-cpa/marketing-website"

# Values for the next two steps
gcloud iam service-accounts describe $SA --format='value(oauth2ClientId)'
echo "projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github/providers/marketing-website"
echo $SA
```

If the org-policies list shows them: constraints/iam.workloadIdentityPoolProviders must allow https://token.actions.githubusercontent.com, and constraints/iam.allowedPolicyMemberDomains (domain restricted sharing) may refuse the add-iam-policy-binding step; override it for this project. constraints/iam.disableServiceAccountKeyCreation doesn't matter (no key is created).

Workspace admin console → Security → Access and data control → API controls → Manage domain-wide delegation → Add new: the service account's client ID, scope https://www.googleapis.com/auth/gmail.send only. This lets the service account send mail as any user in the domain, which is why the identity provider above only trusts this repo's main branch.

GitHub → Settings → Secrets and variables → Actions → Variables (not secrets; none of these are secret):
- GCP_WORKLOAD_IDENTITY_PROVIDER: the projects/…/providers/marketing-website name printed above
- GCP_SERVICE_ACCOUNT: the service account email
- PARTNER_DOC_SENDER: the Workspace user the email comes from (e.g. Arwa's address; it lands in that user's Sent folder)

Then run the workflow by hand from the Actions tab (Email the partner flyer → Run workflow, on main) and check the email arrives with the PDF attached.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Google Cloud project, service account and workload identity provider set up under the organization
- [ ] #2 Domain-wide delegation granted for the gmail.send scope only
- [ ] #3 The three repo variables set in GitHub
- [ ] #4 A manual run of the partner-doc workflow delivers the PDF to arwa@arburcpa.com
<!-- AC:END -->
