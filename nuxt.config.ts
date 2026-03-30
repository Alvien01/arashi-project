// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      title: 'ARATU NO MATSURI',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;700&display=swap' },
        { rel: 'stylesheet', href: '/main.css' },
        { rel: 'icon', type: 'image/png', href: '/logo-aratu.png' }
      ]
    }
  }
})
