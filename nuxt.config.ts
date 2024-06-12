import { lang } from "./i18n/lang";
import { environment } from "./scripts/environment";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["shadcn-nuxt", "nuxt-graphql-client", '@pinia/nuxt', "@nuxtjs/tailwindcss"],
  css: ['~/assets/css/base.css', '~/assets/css/tailwind.css' ],
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
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
});