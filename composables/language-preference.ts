import { defineStore } from 'pinia';
export const useLanguagePreferenceStore = defineStore('languagePreference', () => {
    const selectedItem = ref({
        "Id": "",
        "label" : "",
        "description": "", 
        "value": 0,
      });
    
    function set(item: any) {
        selectedItem.value = item;
    }
    return { selectedItem, set}
  })