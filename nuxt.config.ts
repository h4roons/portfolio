// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  imports: {
    dirs: ['composables'],
  },

  css: ['~/assets/css/main.scss'],

  // Avoid flash of wrong theme: set class before hydration
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Muhammad Haroon Sohail — Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Software engineer building products end to end — scalable Nuxt 3/Vue.js frontends, AI-driven Python backends, and the product thinking that ties them together. Experience across FinTech, AI, SaaS and Gaming.',
        },
        { name: 'author', content: 'Muhammad Haroon Sohail' },
        {
          name: 'keywords',
          content:
            'Software Engineer, Nuxt.js, Vue.js, Python, FastAPI, AI, MCP, Agentic Workflows, JavaScript, TypeScript, Product, Lahore Pakistan',
        },
        // Open Graph
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Muhammad Haroon Sohail — Software Engineer',
        },
        {
          property: 'og:description',
          content:
            'Software engineer building products end to end — Nuxt frontends, AI-powered Python backends, and product thinking. FinTech, AI, SaaS & Gaming.',
        },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:site_name', content: 'Haroon Sohail Portfolio' },
        { property: 'og:image', content: 'https://haroonsohail.me/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content: 'Muhammad Haroon Sohail — Software Engineer',
        },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:image',
          content: 'https://haroonsohail.me/og-image.png',
        },
        {
          name: 'twitter:title',
          content: 'Muhammad Haroon Sohail — Software Engineer',
        },
        {
          name: 'twitter:description',
          content:
            'Software engineer building products end to end — Nuxt frontends, AI-powered Python backends, and product thinking. FinTech, AI, SaaS & Gaming.',
        },
        { name: 'theme-color', content: '#08090b' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
        },
      ],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/os'],
    },
  },
})
