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

mkdirSync(shotsDir, { recursive: true });
const browser = await chromium.launch();
try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await desktop.goto(url, { waitUntil: "networkidle" });
  await desktop.screenshot({ path: join(shotsDir, "desktop.png"), fullPage: true });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(url, { waitUntil: "networkidle" });
  await mobile.screenshot({ path: join(shotsDir, "mobile.png"), fullPage: true });
  await mobile.locator("#nav-toggle").click();
  await mobile.screenshot({ path: join(shotsDir, "mobile-menu.png") });
} finally {
  await browser.close();
}

console.log("Saved screenshots/desktop.png, mobile.png, mobile-menu.png");
