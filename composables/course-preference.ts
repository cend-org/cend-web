import { defineStore } from 'pinia';
export const useCoursePreferenceStore = defineStore('coursePreference', () => {
    const selectedItem = ref({ Id: '' });
    
    function set(item: any) {
        selectedItem.value = item;
    }
    return { selectedItem, set}
  })