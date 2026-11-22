import Image, { generateHTML } from "@11ty/eleventy-img";

// The photos' frame (.split-media in styles.css): half the 1040px content
// column minus its 24px gutters and the 64px gap between the columns (464px
// at most), or the full width less the gutters once .split stacks at 920px.
const splitMediaSizes = "(max-width: 920px) calc(100vw - 48px), (max-width: 1040px) calc(50vw - 56px), 464px";

export default function (eleventyConfig) {
  // Static files copied to the output as-is
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/.nojekyll");

  // {% photo "hero.jpg", "Alt text", "eager" %}: a photo from
  // src/assets/images/ as a <picture> with AVIF, WebP and JPEG copies at
  // a few widths, sized for the .split-media frame, with width and height
  // set from the file. The copies are generated into the build output.
  eleventyConfig.addAsyncShortcode("photo", async function (file, alt, loading = "lazy", sizes = splitMediaSizes) {
    const metadata = await Image(`src/assets/images/${file}`, {
      widths: [480, 800, 1200],
      formats: ["avif", "webp", "jpeg"],
      urlPath: "/assets/images/photos/",
      outputDir: `${eleventyConfig.directories.output}assets/images/photos/`,
      sharpJpegOptions: { quality: 82, mozjpeg: true },
      eleventyConfig,
    });
    return generateHTML(metadata, { alt, sizes, loading, decoding: "async" });
  });
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
