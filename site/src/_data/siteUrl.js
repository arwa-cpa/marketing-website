// The site's address, with no trailing slash (https://example.com), for the
// absolute URLs in the structured data, sitemap and robots.txt.
// It comes from src/CNAME so the domain lives in one place.
import { readFileSync } from "node:fs";

const domain = readFileSync(new URL("../CNAME", import.meta.url), "utf8").trim();

export default `https://${domain}`;
