import fs from "node:fs";

export default function (eleventyConfig) {
  // Static files copied to the output as-is
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/.nojekyll");

  // The tree mark, inlined into the page so CSS can color it: the SVG fills
  // with currentColor, so `color` on the class sets it. {% logoMark "class" %}
  const logoMark = "src/assets/images/logo-mark.svg";
  eleventyConfig.addWatchTarget(logoMark);
  eleventyConfig.addShortcode("logoMark", (className) =>
    fs
      .readFileSync(logoMark, "utf8")
      .trim()
      .replace("<svg ", `<svg class="${className}" aria-hidden="true" focusable="false" `),
  );
}

export const config = {
  dir: {
    input: "src",
    includes: "_includes",
    data: "_data",
    output: "_site",
  },
  htmlTemplateEngine: "njk",
};
