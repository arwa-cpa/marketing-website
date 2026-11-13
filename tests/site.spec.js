// Checks the page in headless Chromium at desktop and phone widths.
// The contact form is never submitted: it sends a real message.
import { test, expect } from "@playwright/test";

// Load the page, recording console errors, uncaught exceptions, and failed
// requests from the site itself. Third-party ones (Google Fonts, the Google
// Calendar booking frame, which logs its own cookie-permission errors) are
// ignored: they aren't ours to fix.
async function openPage(page, baseURL) {
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && msg.location().url.startsWith(baseURL)) errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("response", (res) => {
    if (res.url().startsWith(baseURL) && res.status() >= 400) errors.push(`${res.status()} ${res.url()}`);
  });
  await page.goto("/", { waitUntil: "networkidle" });
  return errors;
}

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("has no console or network errors", async ({ page, baseURL }) => {
    expect(await openPage(page, baseURL)).toEqual([]);
  });

  test("nav links scroll to their sections", async ({ page, baseURL }) => {
    await openPage(page, baseURL);
    const headerHeight = await page.locator(".site-header").evaluate((el) => el.offsetHeight);

    for (const link of await page.locator(".main-nav a").all()) {
      const href = await link.getAttribute("href");
      await test.step(href, async () => {
        await link.click();
        // Smooth scroll: wait for the section's top to settle just under the sticky header
        await expect
          .poll(() => page.locator(href).evaluate((el) => el.getBoundingClientRect().top))
          .toBeGreaterThanOrEqual(-2);
        await expect
          .poll(() => page.locator(href).evaluate((el) => el.getBoundingClientRect().top))
          .toBeLessThanOrEqual(headerHeight + 40);
      });
    }
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("has no console or network errors", async ({ page, baseURL }) => {
    expect(await openPage(page, baseURL)).toEqual([]);
  });

  test("does not scroll horizontally", async ({ page, baseURL }) => {
    await openPage(page, baseURL);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBe(0);
  });

  test("hamburger opens the menu, and a link closes it", async ({ page, baseURL }) => {
    await openPage(page, baseURL);
    const toggle = page.locator("#nav-toggle");
    const nav = page.locator("#main-nav");

    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(nav).toBeVisible();

    await nav.getByRole("link", { name: "About" }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(nav).toBeHidden();
  });

  // Links aren't followed: tel:/sms: would try to start a call or text.
  test("header has call and text buttons", async ({ page, baseURL }) => {
    await openPage(page, baseURL);
    const header = page.locator(".site-header");
    const call = header.getByRole("link", { name: /^Call/ });
    const text = header.getByRole("link", { name: /^Text/ });

    await expect(call).toBeVisible();
    await expect(call).toHaveAttribute("href", /^tel:\+1\d{10}$/);
    await expect(text).toBeVisible();
    await expect(text).toHaveAttribute("href", /^sms:\+1\d{10}$/);
  });
});
