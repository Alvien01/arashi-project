// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      title: 'ARATU NO MATSURI | The Biggest Pop Culture Event in Tulungagung',
      htmlAttrs: {
        lang: 'id'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Aratu No Matsuri adalah festival pop culture (jejepangan) terbesar di Tulungagung. Nikmati lomba cosplay, konser musik, booth komunitas, dan masih banyak lagi pada 10 Juni 2026.' },
        { name: 'keywords', content: 'Aratu No Matsuri, event jejepangan Tulungagung, cosplay Tulungagung, festival anime, festival budaya populer' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://aratunomatsuri.vercel.app/' },
        { property: 'og:title', content: 'ARATU NO MATSURI - Pop Culture Festival' },
        { property: 'og:description', content: 'Rayakan budaya populer bersama ribuan penggemar anime dan game di Aratu No Matsuri!' },
        { property: 'og:image', content: '/logo-aratu.png' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'ARATU NO MATSURI - Pop Culture Festival' },
        { name: 'twitter:description', content: 'Event jejepangan terbesar di Tulungagung kembali hadir! Dapatkan tiket Anda sekarang.' },
        { name: 'twitter:image', content: '/logo-aratu.png' }
      ],
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
