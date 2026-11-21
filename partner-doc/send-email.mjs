// Emails the built partner flyer through the Gmail API.
//
// Run by .github/workflows/partner-doc.yml after google-github-actions/auth
// has signed in to the Google Cloud service account (no stored key). The
// service account sends as a Workspace user through domain-wide delegation,
// limited to the gmail.send scope.
//
// Environment (set by the workflow):
//   GCP_ACCESS_TOKEN     the auth action's access token for the service account
//   GCP_SERVICE_ACCOUNT  the service account's email
//   PARTNER_DOC_SENDER   the Workspace user the email comes from
//   PARTNER_DOC_RECIPIENT  who gets the email
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const PDF = "build/partner-services.pdf";
const ATTACHMENT_NAME = "Arbur-CPA-partner-services.pdf";

// Any failure (a missing variable, Google refusing a request) ends the run
// with one readable line, shown as an error annotation in GitHub Actions.
process.on("uncaughtException", (error) => {
  console.error(`::error::${error.message}`);
  process.exit(1);
});

function env(name) {
  const value = process.env[name];
  if (value) return value;
  throw new Error(
    `${name} isn't set. The workflow sets it from the repo variables ` +
      "(Settings > Secrets and variables > Actions > Variables).",
  );
}

// Keeps a value out of the GitHub Actions log.
function mask(value) {
  if (process.env.GITHUB_ACTIONS) console.log(`::add-mask::${value}`);
}

// Each call reports itself and gives up after a minute rather than hanging.
async function callGoogle(step, url, options) {
  console.log(`${step}...`);
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(60_000) }).catch((error) => {
    throw new Error(`${step} failed: ${error.message} (${url})`);
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`${url} answered ${response.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

// --- The message -----------------------------------------------------------

// \tbd{...} marks what Arwa still has to confirm (comment lines don't count).
const tex = await readFile("partner-services.tex", "utf8");
const tbds = tex
  .split("\n")
  .filter((line) => !line.trimStart().startsWith("%"))
  .join("\n")
  .split("\\tbd{").length - 1;

const commitSubject = execFileSync("git", ["log", "-1", "--format=%s"], { encoding: "utf8" }).trim();
const { GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_SHA } = process.env;
const commitUrl = GITHUB_SHA && `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/commit/${GITHUB_SHA}`;

const sender = env("PARTNER_DOC_SENDER");
const recipient = env("PARTNER_DOC_RECIPIENT");
const subject = `${tbds ? "[DRAFT] " : ""}Partner flyer updated: ${commitSubject}`;
const body = [
  "Hi,",
  "",
  "The partner flyer changed, so here's the new PDF.",
  tbds
    ? `It's still a draft: ${tbds} item(s) are highlighted for you to confirm.`
    : "Nothing is left to confirm, so this version is ready to send to partners.",
  ...(commitUrl ? ["", `What changed: ${commitUrl}`] : []),
].join("\r\n");

const pdf = await readFile(PDF);
const boundary = `flyer-${Date.now()}`;
const message = [
  `From: ${sender}`,
  `To: ${recipient}`,
  // Encoded so any character in the commit subject is safe in a header.
  `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
  "MIME-Version: 1.0",
  `Content-Type: multipart/mixed; boundary="${boundary}"`,
  "",
  `--${boundary}`,
  "Content-Type: text/plain; charset=utf-8",
  "",
  body,
  `--${boundary}`,
  `Content-Type: application/pdf; name="${ATTACHMENT_NAME}"`,
  `Content-Disposition: attachment; filename="${ATTACHMENT_NAME}"`,
  "Content-Transfer-Encoding: base64",
  "",
  ...pdf.toString("base64").match(/.{1,76}/g),
  `--${boundary}--`,
  "",
].join("\r\n");

// --- Send it -----------------------------------------------------------------

const serviceAccount = env("GCP_SERVICE_ACCOUNT");

// 1. A JWT naming the user to send as, signed by the service account.
const now = Math.floor(Date.now() / 1000);
const { signedJwt } = await callGoogle(
  "Signing the request to send as the sender",
  `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${serviceAccount}:signJwt`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${env("GCP_ACCESS_TOKEN")}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      payload: JSON.stringify({
        iss: serviceAccount,
        sub: sender,
        scope: "https://www.googleapis.com/auth/gmail.send",
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 600,
      }),
    }),
  },
);
mask(signedJwt);

// 2. Traded for a token that can only send mail as that user.
const { access_token: gmailToken } = await callGoogle("Getting a Gmail token", "https://oauth2.googleapis.com/token", {
  method: "POST",
  body: new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: signedJwt,
  }),
});
mask(gmailToken);

// 3. Send. Gmail also keeps a copy in the sender's Sent folder.
await callGoogle("Sending the email", "https://gmail.googleapis.com/upload/gmail/v1/users/me/messages/send?uploadType=media", {
  method: "POST",
  headers: { Authorization: `Bearer ${gmailToken}`, "Content-Type": "message/rfc822" },
  body: message,
});
console.log(`Emailed the flyer to ${recipient} (subject: ${subject})`);
// Don't wait for idle connections to close.
process.exit(0);
