// Saves screenshots of the running site to screenshots/ (gitignored) for a
// person or Claude to look over after a change. Not a test: nothing is
// asserted. Browser checks live in tests/ (npm test).
//
// Usage: npm start (in another terminal), then npm run screenshots.
// BASE_URL overrides the default dev-server address.
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Same as playwright.config.js: use the browser inside node_modules.
process.env.PLAYWRIGHT_BROWSERS_PATH = "0";
const { chromium } = await import("@playwright/test");

const url = process.env.BASE_URL ?? "http://localhost:8080/";
const shotsDir = fileURLToPath(new URL("../screenshots", import.meta.url));

try {
  await fetch(url);
} catch {
  console.error(`Nothing is serving ${url}. Start the site with \`npm start\` first.`);
  process.exit(1);
}

// Full-page shot with the Google Calendar booking frame drawn. Chromium
// doesn't paint a cross-origin frame while it's off-screen, so Playwright's
// fullPage option leaves it blank. Instead, grow the window to the page's
// full height so everything is on-screen, wait for the calendar, then shoot.
async function fullPageShot(page, file) {
  const { width, height } = page.viewportSize();
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width, height: pageHeight });
  try {
    await page.frameLocator(".booking-frame").getByText("Select an appointment time").waitFor({ timeout: 15000 });
    await page.waitForTimeout(500); // let the slots finish drawing
  } catch {
    console.warn(`${file}: booking calendar didn't finish loading; it may be blank`);
  }
  await page.screenshot({ path: join(shotsDir, file) });
  await page.setViewportSize({ width, height });
}

mkdirSync(shotsDir, { recursive: true });
const browser = await chromium.launch();
try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await desktop.goto(url, { waitUntil: "networkidle" });
  await fullPageShot(desktop, "desktop.png");

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(url, { waitUntil: "networkidle" });
  await fullPageShot(mobile, "mobile.png");
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await mobile.locator("#nav-toggle").click();
  await mobile.screenshot({ path: join(shotsDir, "mobile-menu.png") });
} finally {
  await browser.close();
}

console.log("Saved screenshots/desktop.png, mobile.png, mobile-menu.png");
