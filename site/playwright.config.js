import { defineConfig } from "@playwright/test";

// Keep Playwright's browser inside node_modules instead of a machine-wide
// cache, so the repo stays self-contained. `npm test` installs it first
// (see "pretest" in package.json).
process.env.PLAYWRIGHT_BROWSERS_PATH = "0";

// Tests don't start a server: run `npm start` first. BASE_URL overrides the
// default dev-server address.
//
// Two projects: "site" checks the local server (npm test, which gates pushes
// and deploys); "live" checks the real domains, DNS and email records
// (npm run test:live), so a network hiccup never blocks a deploy.
export default defineConfig({
  testDir: "tests",
  projects: [
    { name: "site", testIgnore: "live/**" },
    { name: "live", testMatch: "live/**" },
  ],
  forbidOnly: !!process.env.CI,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:8080/",
    browserName: "chromium",
  },
});
