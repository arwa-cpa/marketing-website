// Checks the pages in headless Chromium at desktop and phone widths.
// The contact form is never submitted: it sends a real message.
import { test, expect } from "@playwright/test";

// Load the page, recording console errors, uncaught exceptions, and failed
// requests from the site itself. Third-party ones (the Google Calendar booking
// frame, which logs its own cookie-permission errors) are ignored: they aren't
// ours to fix.
async function openPage(page, baseURL, path = "/") {
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && msg.location().url.startsWith(baseURL)) errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("response", (res) => {
    if (res.url().startsWith(baseURL) && res.status() >= 400) errors.push(`${res.status()} ${res.url()}`);
  });
  await page.goto(path, { waitUntil: "networkidle" });
  return errors;
}

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("has no console or network errors", async ({ page, baseURL }) => {
    expect(await openPage(page, baseURL)).toEqual([]);
  });

  test("top bar shows the phone and one seasonal message, with its marquee copy hidden", async ({ page, baseURL }) => {
    await openPage(page, baseURL);
    const groups = page.locator(".top-bar-group");
    await expect(groups).toHaveCount(2);
    await expect(groups.nth(0).locator(".season:visible")).toHaveCount(1);
    await expect(groups.nth(0).locator("a[href^='tel:']")).toBeVisible();
    await expect(groups.nth(1)).toHaveAttribute("aria-hidden", "true");
    await expect(groups.nth(1).locator("a")).toHaveAttribute("tabindex", "-1");
  });

  test("nav links scroll to their sections", async ({ page, baseURL }) => {
    await openPage(page, baseURL);
    const headerHeight = await page.locator(".site-header").evaluate((el) => el.offsetHeight);

    // Only links to home-page sections ("/#…"); About goes to its own page
    for (const link of await page.locator('.main-nav a[href^="/#"]').all()) {
      const href = await link.getAttribute("href");
      const section = page.locator(new URL(href, baseURL).hash); // "/#about" → "#about"
      await test.step(href, async () => {
        await link.click();
        // Smooth scroll: wait for the section's top to settle just under the sticky header
        await expect
          .poll(() => section.evaluate((el) => el.getBoundingClientRect().top))
          .toBeGreaterThanOrEqual(-2);
        await expect
          .poll(() => section.evaluate((el) => el.getBoundingClientRect().top))
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

    await nav.getByRole("link", { name: "Contact" }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(nav).toBeHidden();
  });

  // Links aren't followed: tel:/sms: would try to start a call or text.
  test("top bar shows the seasonal message without the phone number", async ({ page, baseURL }) => {
    await openPage(page, baseURL);
    const group = page.locator(".top-bar-group").first();
    await expect(group.locator(".season:visible")).toHaveCount(1);
    await expect(group.locator(".top-bar-phone")).toBeHidden();
  });

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

// The site needs no cookie banner because nothing on it tracks visitors.
// Analytics and ad scripts store their IDs on the site's own domain, so any
// cookie or storage here means one crept in. The embedded Google Calendar
// sets its own cookies on google.com (e.g. reCAPTCHA); those aren't ours.
test("stores no cookies or browser storage of its own", async ({ page, context, baseURL }) => {
  await openPage(page, baseURL);
  // The booking frame loads lazily: scroll to it so its cookies are set too
  await page.locator(".booking-frame").scrollIntoViewIfNeeded();
  await page.frameLocator(".booking-frame").locator("body").waitFor();
  await page.waitForLoadState("networkidle");

  const cookies = (await context.cookies())
    .filter((c) => !/(^|\.)google\.com$/.test(c.domain))
    .map((c) => `${c.domain} ${c.name}`);
  expect(cookies).toEqual([]);

  const storage = await page.evaluate(() => [...Object.keys(localStorage), ...Object.keys(sessionStorage)]);
  expect(storage).toEqual([]);
});

// The privacy notice lists every service that sees visitors' details, so the
// page itself must load nothing from anywhere else (which is why it uses the
// device's own fonts rather than Google Fonts). The booking frame's own page
// is allowed, and whatever it loads inside itself is Google's, covered in the
// notice under Google Calendar.
test("loads nothing from third parties outside the booking frame", async ({ page, baseURL }) => {
  const requests = [];
  page.on("request", (req) => {
    if (req.frame() === page.mainFrame()) requests.push(req.url());
  });
  await openPage(page, baseURL);
  await page.locator(".booking-frame").scrollIntoViewIfNeeded();
  await page.waitForLoadState("networkidle");

  const bookingUrl = await page.locator(".booking-frame").getAttribute("src");
  const thirdParty = requests.filter((url) => !url.startsWith(baseURL) && url !== bookingUrl && !url.startsWith("data:"));
  expect(thirdParty).toEqual([]);
});

// Checks shared by every page other than the home page
for (const { path, title } of [
  { path: "/about/", title: "Arwa Naalwala, CPA" },
  { path: "/privacy/", title: "Privacy notice" },
  { path: "/partners/", title: "Your client stays yours" },
]) {
  test.describe(`${path} page`, () => {
    for (const viewport of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
      test(`has no console or network errors at ${viewport.width}px`, async ({ page, baseURL }) => {
        await page.setViewportSize(viewport);
        expect(await openPage(page, baseURL, path)).toEqual([]);
        await expect(page.locator("h1")).toHaveText(title);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBe(0);
      });
    }

    test("nav links go back to the home page sections", async ({ page, baseURL }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      for (const name of ["Services", "Contact"]) {
        await test.step(name, async () => {
          await openPage(page, baseURL, path);
          const href = await page.locator(".main-nav").getByRole("link", { name }).getAttribute("href");
          await page.locator(".main-nav").getByRole("link", { name }).click();
          await expect(page).toHaveURL(new URL(href, baseURL).href);
          await expect(page.locator(new URL(href, baseURL).hash)).toBeInViewport();
        });
      }
    });

    test("loads nothing from third parties", async ({ page, baseURL }) => {
      const requests = [];
      page.on("request", (req) => requests.push(req.url()));
      await openPage(page, baseURL, path);
      expect(requests.filter((url) => !url.startsWith(baseURL) && !url.startsWith("data:"))).toEqual([]);
    });
  });
}

test("privacy page is linked from the footer", async ({ page, baseURL }) => {
  await openPage(page, baseURL);
  await page.locator(".site-footer").getByRole("link", { name: "Privacy" }).click();
  await expect(page).toHaveURL(/\/privacy\/$/);
});

test("About page is linked from the nav and from beside Arwa's photo on the home page", async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openPage(page, baseURL);
  await page.locator(".main-nav").getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about\/$/);

  await openPage(page, baseURL);
  await page.locator(".highlights").getByRole("link", { name: "Read Arwa’s story" }).click();
  await expect(page).toHaveURL(/\/about\/$/);
});

test("partners page is linked from the nav, and its buttons go to booking and the phone", async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openPage(page, baseURL);
  await page.locator(".main-nav").getByRole("link", { name: "For CPAs" }).click();
  await expect(page).toHaveURL(/\/partners\/$/);

  // No partner prices on the public page: they stay in the flyer
  await expect(page.locator("main")).not.toContainText("$");

  const cta = page.locator(".partner-cta");
  await expect(cta.getByRole("link", { name: "Call", exact: true })).toHaveAttribute("href", /^tel:\+/);
  await expect(cta.getByRole("link", { name: "text", exact: true })).toHaveAttribute("href", /^sms:\+/);
  await cta.getByRole("link", { name: "Book a call" }).click();
  await expect(page).toHaveURL(/\/#book$/);
  await expect(page.locator("#book")).toBeInViewport();
});

// Step cards (.steps) sit in one row on desktop, however many there are:
// three on the home page, four on the partners page.
for (const [path, count] of [["/", 3], ["/partners/", 4]]) {
  test(`${path} steps sit in one row on desktop`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openPage(page, baseURL, path);
    const steps = page.locator("ol.steps > li");
    await expect(steps).toHaveCount(count);
    const tops = await steps.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top));
    expect(new Set(tops).size).toBe(1);
  });
}

test("About page's Book a consultation button goes to the booking section", async ({ page, baseURL }) => {
  await openPage(page, baseURL, "/about/");
  await page.locator(".philosophy-cta").getByRole("link", { name: "Book a consultation" }).click();
  await expect(page).toHaveURL(/\/#book$/);
  await expect(page.locator("#book")).toBeInViewport();
});

test("robots.txt points to the sitemap, which lists the homepage", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  const sitemapUrl = robots.match(/^Sitemap: (.+)$/m)?.[1];
  expect(sitemapUrl).toMatch(/^https:\/\/[^/]+\/sitemap\.xml$/);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain(`<loc>${new URL("/", sitemapUrl)}</loc>`);
});

// The photos go through the {% photo %} shortcode (eleventy.config.js), so
// phones get a small modern-format copy and the layout doesn't jump while
// they load. A plain <img> pointing at the full JPEG means one slipped back.
for (const path of ["/", "/about/"]) {
  test(`${path} photos are sized copies with width and height`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openPage(page, baseURL, path);
    const photos = page.locator(".split-media img");
    expect(await photos.count()).toBeGreaterThan(0);
    for (const img of await photos.all()) {
      await expect(img.locator("xpath=..")).toHaveJSProperty("tagName", "PICTURE");
      await expect(img.locator("xpath=../source[@type='image/avif']")).toHaveCount(1);
      await expect(img).toHaveAttribute("width", /^\d+$/);
      await expect(img).toHaveAttribute("height", /^\d+$/);
      await expect(img).toHaveAttribute("sizes", /.+/);
    }
  });
}
