# Project context

## Purpose

This is the source for [pratyushdas.in](https://pratyushdas.in/), a single-page
personal profile combining a concise introduction, biography and resume.

## Design direction

- Typography, color, spacing and restrained motion only.
- Inter is used across the interface, hero and resume.
- Geist is used only for the biography paragraphs.
- Dark is the first-visit default. A visitor's manual light or dark selection
  is remembered in local storage.
- The About/Resume button switches between the narrative and structured record.
- Motion respects `prefers-reduced-motion`, and all content remains available
  without JavaScript.

## Structure

- `index.html`: content, metadata and semantic structure.
- `assets/styles.css`: typography, themes, layout and responsive behavior.
- `assets/main.js`: theme, view switching and return-to-top interactions.
- `assets/fonts/`: self-hosted Inter and Geist variable fonts and licenses.
- `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` and `404.html`: GitHub Pages
  production files.

## Publishing

GitHub Pages publishes the repository root from `main`. Pushing to `main`
updates the live site, so test locally before merging or pushing.

When the hero or identity changes, regenerate `assets/social-card.jpg` at
1200 x 630 and keep the Open Graph metadata in `index.html` synchronized.
