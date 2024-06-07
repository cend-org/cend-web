import { lang } from "./i18n/lang";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fr',
  messages: lang
}))