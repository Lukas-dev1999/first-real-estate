# ZeeLy Realty

A modern, mobile-first real estate landing page built with **Next.js 14** (App Router). Luxury real estate meets modern proptech — deep green & gold palette, Playfair Display headings, smooth-scroll animations, fully responsive.

Deployed as a static site on **Cloudflare Workers** via Wrangler.

---

## Stack

- **Next.js 14** (App Router, `output: 'export'`)
- **React 18**
- **Vanilla CSS** — no Tailwind, no UI frameworks
- **Google Fonts** — Playfair Display + Inter
- **IntersectionObserver** for scroll-reveal animations
- **Cloudflare Workers** (static assets) for hosting

## Sections

1. Sticky nav with mobile hamburger menu
2. Full-viewport hero with search bar (Property Type / Purpose / Location)
3. Featured listings — 6 property cards with favorites toggle
4. Why Choose Us — 4 feature cards
5. How It Works — 3-step numbered flow with connecting line
6. Property Categories — 4 cards (Residential / Commercial / Land / Rental)
7. Testimonials — 3 client reviews
8. Contact form — Name / Email / Phone / Interest / Message
9. Footer with quick links, socials, contact details

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build (static export)

```bash
npm run build
```

Output lands in `./out`.

## Deploy to Cloudflare Workers

Requires a Cloudflare account and `wrangler` authenticated (`npx wrangler login`).

```bash
npm run deploy
```

This runs `next build` and then `wrangler deploy` using `wrangler.toml`. The site is served from Workers' static-assets layer with SPA-style fallback.

To preview locally with the Workers runtime:

```bash
npm run preview
```

## Project structure

```
.
├── app/
│   ├── globals.css     # all styling (design tokens, sections, animations)
│   ├── layout.js       # html shell, fonts, metadata
│   └── page.js         # the landing page (all sections + interactivity)
├── next.config.js      # static export config
├── wrangler.toml       # Cloudflare Workers asset config
└── package.json
```

## Customization

- **Palette** — edit the CSS variables at the top of `app/globals.css` (`--green`, `--gold`, etc.)
- **Listings / testimonials / categories** — data lives at the top of `app/page.js` as plain arrays
- **Hero image** — change the URL inside the `.hero-bg` rule in `globals.css`

## License

MIT
