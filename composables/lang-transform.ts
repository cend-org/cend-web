import { lang } from "~/i18n/lang";
import { LocalStorageGetItem } from "~/scripts/local-storage";


export function useLangTransform() {
    function transform(textKey: string, local: string): string {
        local = "fr"
    let _lang: any = {};
    switch (local) {
        case "ca":
            _lang = lang.ca
            break;
        case "fr":
            _lang = lang.fr
            break;
        case "en":
            _lang = lang.en
            break;
    }
       return _lang[textKey];
    }
    return {
        transform
    };

}

