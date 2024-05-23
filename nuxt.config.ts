// https://nuxt.com/docs/configuration-glossary/configuration-router

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  plugins: [
    { src: '~/plugins/fontawesome.js', mode: 'client' },
    '~/plugins/tippy.js', 
  ],
});
