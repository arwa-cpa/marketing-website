# Arbur CPA marketing website

Single-page site built with [Eleventy](https://www.11ty.dev/), deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```
nvm use        # Node version from .nvmrc
npm install
npm start      # dev server at http://localhost:8080
npm run build  # one-off build into _site/
```

Contact details, links and testimonials live in `src/_data/`. Page markup is in `src/index.njk`, with the shared layout and partials in `src/_includes/`.
