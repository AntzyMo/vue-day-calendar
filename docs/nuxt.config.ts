// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/i18n'
  ],
  css: ['@unocss/reset/tailwind.css'],
  content: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    highlight: {
      theme: 'vitesse-light'
    }
  },
  components: [
    {
      path: '~/components/demo',
      pathPrefix: false,
      global: true
    },
    '~/components'
  ]
})
