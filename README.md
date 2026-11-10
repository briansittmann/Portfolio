# briansittmann.dev

Personal portfolio of Brian Sittmann, backend developer in Java and TypeScript, based in Dublin.

Live at [briansittmann.dev](https://briansittmann.dev), in English at `/` and in Spanish at `/es/`.

## Stack

- [Astro](https://astro.build) 7, static output, no client framework: two small scripts for the theme, menu and entrances.
- Tailwind CSS 4, with the design tokens as CSS variables in `src/styles/global.css`.
- Images through `astro:assets` (responsive WebP), Geist and Geist Mono self-hosted, Phosphor icons inlined as SVG.
- Motion in CSS only: scroll-driven animations, time-based entrances, and view transitions for the theme and language switches. Everything respects `prefers-reduced-motion`.
- i18n with Astro's routing, `hreflang`, a localized sitemap and Open Graph images per language.

## Structure

```
src/
  components/Home.astro   the page, with its copy in both languages
  components/             hero API card, Mango flow, timeline, language switch, ...
  layouts/Base.astro      head, SEO, theme and language-switch scripts
  pages/                  `/` and `/es/`, both rendering Home
  i18n.ts                 languages and the locale helper
cv/                       CV source (HTML) and the script that prints both PDFs
design/                   sources for the CalorIA banner, the Open Graph images, the favicon and the LinkedIn banner
public/                   CVs, favicon, Open Graph images, robots.txt
```

## Commands

Requires Node 22.12 or later.

| Command           | Action                                  |
| :---------------- | :-------------------------------------- |
| `npm install`     | Install dependencies                    |
| `npm run dev`     | Dev server at `localhost:4321`          |
| `npm run build`   | Build the site to `./dist/`             |
| `npm run preview` | Preview the build locally               |
| `sh cv/build.sh`  | Print the CVs to `public/` (Chrome)     |
