import { environment } from "./scripts/environment";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["shadcn-nuxt", '@pinia/nuxt', "@nuxtjs/tailwindcss"],
  css: ['~/assets/css/base.css', '~/assets/css/tailwind.css' ],
  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.API_ENDPOINT,
    }
  },
  app: {
    head: {
      meta: [
        {charset: "utf-8"},
        {name: "viewport", content: "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"},
        {"http-equiv" : "X-UA-Compatible", content:"ie=edge"},
      ]
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