import { ca } from "./ca";
import { en } from "./en";
import { fr } from "./fr";

export const lang = {
    en: en,
    fr: fr,
    ca: ca
  }

export function setLang(lang_value: string){
    const { locale, setLocale } = useI18n()
    const _lang = locale.value;
    if(_lang == "fr"){
        return "qui nous sommes?"
    }

}