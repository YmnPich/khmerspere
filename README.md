# KhmerSpere — Nuxt 4

All pages are prerendered to static HTML at build time.

## Run locally
    npm install
    npm run dev          # http://localhost:3000
    npm run build        # production build
    npm run preview

## Deploy to Vercel (no local install needed)
1. Push this folder to a GitHub repository (the folder contents at the repo root, so `package.json` is at the top).
2. vercel.com → Add New → Project → import the repo.
3. Framework Preset is detected as **Nuxt**. Leave the build settings as they are and click Deploy.

## Navigation
- **Art Gallery** (dropdown): Art for Sale `/art-for-sale`, New Media Art `/new-media-art`, Exhibited Art `/exhibited-art`
- **Exhibition** `/exhibition`, **Event** `/event`
- **Khmer Culture** — separate main item, goes to the About section on Home `/#about`
- **Contact Us** — scrolls to the footer
- Tabs are deep-linkable: `/exhibition?tab=soon`, `/event?tab=soon`, `/new-media-art?tab=multimedia`

## Where things are
- `app/utils/data.ts` — all copy, prices, filter tags and the navigation lists
- `app/assets/css/site.css` — design tokens at the top, then components and responsive rules
- `app/components/SiteHeader.vue` — header + dropdown + mobile menu
- `app/plugins/reveal.ts` — scroll-reveal directive (`v-reveal`)
- `public/img`, `public/fonts` — photos (cropped from the exported design frames) and self-hosted fonts

Not connected (no backend): login / sign-up, Google / GitHub sign-in, checkout. The UI says so.


## Detail & account pages
- `/contact` — contact form (validated; shows an honest "not connected" notice, nothing is sent)
- `/exhibition/<slug>` (18) and `/event/<slug>` (16) — ticket details with quantity stepper; events use "Pre Order"
- `/art-for-sale/<slug>` (16) — art detail with quantity, specs and a Related Art carousel
- `/khmer-culture` (12 cards) and `/khmer-culture/<slug>` — only Apsara Dance has full text; the others say a write-up is coming soon
- `/account` — sample profile, edit form (not saved anywhere) and order history

All detail routes are listed in `nuxt.config.ts` so they prerender to static HTML. Sample copy (venue, date, description, art size) lives in `app/utils/data.ts`.

## Motion layer
CSS-first (no animation library). Tokens: `--ease`, `--ease-io`, `--t-fast` 180ms, `--t-mid` 300ms, `--t-slow` 600ms.
- Header entrance, scroll-progress hairline, route loading bar, page transitions
- Sliding tab indicator (`TabList.vue`), staggered mobile menu, dropdown
- Scroll reveals with image clip-wipe + settling scale (`v-reveal`), masked title rise
- Gentle parallax on hero/about images (`v-parallax`, `app/plugins/parallax.ts`)
- Card lift, link underline draw, button shine + arrow nudge (hover-capable devices only), lightbox affordance on gallery tiles
- `prefers-reduced-motion`: reveals shown immediately, parallax/clip/progress off
