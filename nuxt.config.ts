// https://nuxt.com/docs/api/configuration/nuxt-config
import { EXHIBITIONS, EVENTS, SALE, KHMER_CULTURE, slugify } from './app/utils/data'

// every detail page is listed so it is prerendered to static HTML
const detailRoutes = [
  ...Object.values(EXHIBITIONS).flat().map(([n]) => `/exhibition/${slugify(n)}`),
  ...Object.values(EVENTS).flat().map(([n]) => `/event/${slugify(n)}`),
  ...SALE.map(s => `/art-for-sale/${slugify(s.title)}`),
  ...KHMER_CULTURE.map(c => `/khmer-culture/${c.slug}`)
]

export default defineNuxtConfig({
  nitro: { prerender: { routes: detailRoutes, crawlLinks: true } },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/site.css'],

  // every page is prerendered to static HTML at build time
  routeRules: { '/**': { prerender: true } },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s — KhmerSpere',
      meta: [
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preload', href: '/fonts/playfair-display-latin-700-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        { rel: 'preload', href: '/fonts/montserrat-latin-500-normal.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }
      ],
      // lets CSS hide .reveal elements only when JS is available
      script: [{ innerHTML: "document.documentElement.classList.add('js')", tagPosition: 'head' }]
    }
  }
})
