# Arbur CPA marketing website

Single-page site built with [Eleventy](https://www.11ty.dev/), deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```
nvm use        # Node version from .nvmrc
npm install
npm start      # dev server at http://localhost:8080
npm run build  # one-off build into _site/
```

Contact details, links and testimonials live in `src/_data/`. Each page section has its own file in `src/_includes/sections/`, and `src/index.njk` includes them in order. The shared layout, header and footer are also in `src/_includes/`.
