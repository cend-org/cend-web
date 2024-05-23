import { lang } from "./i18n/lang";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-graphql-client",  '@nuxtjs/i18n'
  // [
  //   '@nuxtjs/i18n',
  //   {
  //     legacy: false,
  //     locale: 'fr',
  //     messages: lang
  //   }
  // ]
],
  css: ['~/assets/css/poppins.css'],
  runtimeConfig: {
    public: {
      GQL_HOST: 'http://cendapp.ca:8087/query' // overwritten by process.env.GQL_HOST
    }
  },

  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  }
  
})