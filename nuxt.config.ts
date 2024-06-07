import { lang } from "./i18n/lang";
import { environment } from "./scripts/environment";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-graphql-client", '@nuxtjs/i18n', '@pinia/nuxt', '@samk-dev/nuxt-vcalendar'],
  css: ['~/assets/css/base.css', '~/assets/css/poppins.css'],
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  runtimeConfig: {
    public: {
      GQL_HOST: `${environment.api}${environment.query}`,
      'graphql-client': {

      }
    }
  },
  app: {
    head: {
      title: "CEND | APP",
    }
  }
}); 