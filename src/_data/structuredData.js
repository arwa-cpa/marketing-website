// JSON-LD for search engines, rendered into <head> by base.njk.
// The site URL comes from src/CNAME so the domain lives in one place.
// Reviews/ratings are deliberately left out: Google doesn't allow marking up
// reviews copied from another site, and ignores self-published business ratings.
import { readFileSync } from "node:fs";
import site from "./site.js";

const domain = readFileSync(new URL("../CNAME", import.meta.url), "utf8").trim();
const url = `https://${domain}/`;

export default {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AccountingService",
      "@id": `${url}#business`,
      name: "Arbur CPA",
      url,
      telephone: site.phoneLink,
      logo: `${url}assets/images/logo-stacked-sage.png`,
      image: `${url}assets/images/hero.jpg`,
      description:
        "U.S.–Canada cross-border tax specialist, plus individual and business tax preparation and small business accounting.",
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
      ],
      knowsAbout: [
        "U.S.–Canada cross-border tax",
        "Business tax preparation",
        "Individual tax preparation",
        "Small business accounting",
      ],
      founder: { "@id": `${url}#arwa` },
      sameAs: [site.googleProfileUrl],
    },
    {
      "@type": "Person",
      "@id": `${url}#arwa`,
      name: "Arwa Naalwala",
      jobTitle: "CPA",
      image: `${url}assets/images/headshot.jpg`,
      worksFor: { "@id": `${url}#business` },
      sameAs: [site.linkedinUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${url}#website`,
      name: "Arbur CPA",
      url,
      publisher: { "@id": `${url}#business` },
    },
  ],
};
