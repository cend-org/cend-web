import { defineStore } from 'pinia';
export const useSelectionSingleStore = defineStore('selectionSingle', () => {
    const selectedItem = ref({ Id: '' });
    function set(item: any) {
        selectedItem.value = item;
    }
    return { selectedItem, set}
  })