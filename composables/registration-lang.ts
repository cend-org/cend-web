import { defineStore } from 'pinia';
export const useRegistrationLangStore = defineStore('lang', () => {
    const lang = ref({ label: 'register_lang_label', value: '', code: "" })
    function set(_lang: any) {
        lang.value = _lang;
    }
    return { lang, set }
})