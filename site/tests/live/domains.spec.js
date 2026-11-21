// Checks the live domains: the site is served over HTTPS at the domain in
// src/CNAME, the pre-rebrand domain permanently redirects to it, and email
// for both still goes to Google Workspace. These hit the real internet, so
// they're kept out of `npm test` (which gates pushes and deploys). Run them
// with `npm run test:live` after any DNS, forwarding or hosting change.
import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolveMx } from "node:dns/promises";

const domain = readFileSync(new URL("../../src/CNAME", import.meta.url), "utf8").trim();
// Pre-rebrand domain: forwarded from Squarespace Domains, still carries email
const oldDomain = "arwacpa.com";

test("site is served over HTTPS at the CNAME domain", async ({ request }) => {
  for (const url of [`https://${domain}/`, `https://www.${domain}/`]) {
    await test.step(url, async () => {
      const res = await request.get(url);
      expect(res.status()).toBe(200);
      expect(await res.text()).toContain(`"url":"https://${domain}/"`);
    });
  }
});

test("plain HTTP redirects to HTTPS", async ({ request }) => {
  for (const host of [domain, `www.${domain}`]) {
    await test.step(host, async () => {
      const res = await request.get(`http://${host}/`, { maxRedirects: 0 });
      expect(res.status()).toBe(301);
      // GitHub may also move www to the bare domain in the same hop
      expect([`https://${host}/`, `https://${domain}/`]).toContain(res.headers().location);
    });
  }
});

test("old domain permanently redirects, keeping the path", async ({ request }) => {
  for (const host of [oldDomain, `www.${oldDomain}`]) {
    for (const scheme of ["https", "http"]) {
      const url = `${scheme}://${host}/some/page`;
      await test.step(url, async () => {
        const res = await request.get(url, { maxRedirects: 0 });
        expect(res.status()).toBe(301);
        expect(res.headers().location).toBe(`https://${domain}/some/page`);
      });
    }
  }
});

test("email for both domains goes to Google Workspace", async () => {
  for (const host of [domain, oldDomain]) {
    await test.step(host, async () => {
      const mx = await resolveMx(host);
      expect(mx.map((r) => r.exchange)).toContainEqual(expect.stringMatching(/google\.com$/));
    });
  }
});
