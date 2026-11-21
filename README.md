# Arbur CPA marketing website

Single-page site built with [Eleventy](https://www.11ty.dev/), deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

The repo is a set of npm workspaces: `site/` (the website), `partner-doc/` (a one-page PDF flyer for partner CPA firms, written in LaTeX) and `backlog/` (the task tracker, with its tasks in `backlog/data/`). Run everything from the top folder:

```
nvm use        # Node version from .nvmrc
npm install    # installs every workspace
npm start      # dev server at http://localhost:8080
npm run build  # one-off build into site/_site/
npm test             # browser checks (Playwright); needs npm start running
npm run screenshots  # save screenshots to site/screenshots/; needs npm start running
npm run test:live    # check the real domains, redirects and email DNS; no server needed
npm run partner-doc  # build the partner flyer into partner-doc/build/partner-services.pdf
npm run backlog -- board    # pending tasks (Backlog.md); npm run backlog -- browser for the web view

# git push runs the tests first (.githooks/pre-push); skip with --no-verify
```

Contact details, links and testimonials live in `site/src/_data/`. Each page section has its own file in `site/src/_includes/sections/`, and `site/src/index.njk` includes them in order. The shared layout, header and footer are also in `site/src/_includes/`.

The partner flyer's words are in `partner-doc/partner-services.tex` and its look in `partner-doc/arbur-brand.sty`. Anything still to confirm is wrapped in `\tbd{…}`, which prints highlighted and puts a DRAFT watermark on the page. When `partner-doc/` changes on `main`, `.github/workflows/partner-doc.yml` builds the PDF and emails it to Arwa.
