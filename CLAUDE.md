# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Next.js dev server at localhost:3000
npm run build     # static export to ./out
npm run lint      # ESLint via next lint
npm run preview   # build + run Cloudflare Workers runtime locally
npm run deploy    # build + deploy to Cloudflare Workers (requires wrangler auth)
```

No test suite is configured.

## Architecture

This is a **single-page marketing site** — all content lives in two files:

- [app/page.js](app/page.js) — the entire page as one `'use client'` component. All section markup, interactivity (hamburger menu, favorites toggle, scroll-reveal via `IntersectionObserver`, contact form state), inline SVG icons (`I` object), and all mock data arrays (`LISTINGS`, `FEATURES`, `STEPS`, `CATEGORIES`, `TESTIMONIALS`) are defined here.
- [app/globals.css](app/globals.css) — all styling. Design tokens (CSS variables `--green`, `--gold`, etc.) are at the top. Hero background image is set in the `.hero-bg` rule.
- [app/layout.js](app/layout.js) — HTML shell, Google Fonts (Playfair Display + Inter), and `<meta>` tags.

Next.js is configured with `output: 'export'` (`next.config.js`), producing a fully static `./out` directory. Images are unoptimized. The Cloudflare Workers deployment (`wrangler.toml`) serves `./out` as static assets with SPA-style fallback.

## Customization quick-reference

- **Color palette** — edit CSS variables at the top of `app/globals.css`
- **Listing cards / testimonials / categories / steps** — edit the data arrays near the top of `app/page.js`
- **Hero background** — change the URL in the `.hero-bg` rule in `globals.css`
