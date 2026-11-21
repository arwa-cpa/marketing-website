// Turns the site's tree mark (site/src/assets/images/logo-mark.svg) into a
// TikZ drawing for the flyer, so the site and the flyer share one logo file.
// XeTeX can't include an SVG, but TikZ's svg.path library draws SVG path
// data, so this copies the paths across. Writes build/logo-mark.tex, which
// defines \arburmark{<height>}{<color>}. Run by `npm run build`.
import fs from "node:fs";

const svg = fs.readFileSync("../site/src/assets/images/logo-mark.svg", "utf8");
const [, width, height] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);

const paths = [...svg.matchAll(/<path ([^>]*?)\/>/g)].map(([, attrs]) => {
  const attr = (name) => attrs.match(new RegExp(`${name}="([^"]*)"`))?.[1];
  const d = attr("d");
  const stroke = attr("stroke-width");
  if (!stroke) return `    \\fill[#2] svg "${d}";`;
  const cap = attr("stroke-linecap") ?? "butt";
  return `    \\draw[#2, line width=${stroke}pt, line cap=${cap}] svg "${d}";`;
});

const tex = `% Generated from site/src/assets/images/logo-mark.svg by logo-mark.mjs.
% Don't edit: change the SVG and rebuild.
% \\arburmark{<height>}{<color>}: the tree mark, scaled to the given height.
% Use it outside other tikzpictures (e.g. save it in a box first).
\\newcommand{\\arburmark}[2]{%
  \\resizebox{!}{#1}{\\begin{tikzpicture}[yscale=-1] % SVG y points down; svg.path units are pt
    \\useasboundingbox (0pt,0pt) rectangle (${width}pt,${height}pt);
${paths.join("\n")}
  \\end{tikzpicture}}}
`;

fs.mkdirSync("build", { recursive: true });
fs.writeFileSync("build/logo-mark.tex", tex);
