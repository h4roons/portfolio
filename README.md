# Muhammad Haroon Sohail — Portfolio

A fully responsive, production-ready portfolio website built with **Nuxt 3 + Vue 3 (Composition API)**, **TypeScript**, **Tailwind CSS + SCSS**, and **Pinia**. Content is driven entirely from a single data source derived from the resume.

## Tech stack

- **Nuxt 3** (Vue 3 Composition API)
- **TypeScript** (strict mode)
- **Tailwind CSS** with custom design tokens + **SCSS** for theming
- **Pinia** (available for state if needed)

## Features

- Dark / light mode toggle — system-preference aware, persisted to `localStorage`, no flash of incorrect theme
- Sticky navigation with scroll-based active-section highlighting
- Scroll-reveal animations via `IntersectionObserver` (respects `prefers-reduced-motion`)
- Smooth page / layout transitions
- Mobile-first responsive layout, accessible focus states
- SEO meta tags, Open Graph + Twitter cards, and JSON-LD structured data
- Downloadable resume (PDF)

## Project structure

```
components/      Reusable section + UI components
composables/     useTheme, usePortfolio, useReveal, useActiveSection
data/            portfolio.ts — single source of truth (resume content)
types/           TypeScript interfaces for the data
layouts/         default.vue (nav + footer shell)
pages/           index.vue (assembles all sections)
plugins/         theme.client.ts, reveal.ts (v-reveal directive)
assets/css/      main.scss (design tokens + animations)
public/          favicon, robots.txt, resume PDF
```

## Editing content

All content lives in `data/portfolio.ts`. Update profile, skills, experience,
projects, education, and languages there — no template edits needed.

To add project links, fill the optional `demo` and `repo` fields on any project.
To add a GitHub/portfolio URL, add an entry to `profile.socials`.

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:3000)
npm run build      # production build
npm run generate   # static site -> .output/public (deploy anywhere)
npm run preview    # preview the production build
```

## Deployment

`npm run generate` produces a fully static site in `.output/public` that can be
deployed to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static host.

## Contact form

The contact form uses a `mailto:` handoff (no backend required). To collect
submissions server-side, point it at a service like Formspree or a Nuxt
server route in `server/api/`.
