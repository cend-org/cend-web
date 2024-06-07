import { defineStore } from 'pinia';
export const useSelectionMultipleStore = defineStore('selectionMultiple', () => {
    const selectedItems = ref([]);
    let list = ref([]);
    function add(item: never) {
        selectedItems.value.push(item)
    }
    function remove(item: never) {
        selectedItems.value = selectedItems.value.filter(x => x["Id"] != item["Id"]);
    }
    function clear() {
        selectedItems.value = [];
        list.value = [];
    }
    return { selectedItems, list, add, remove, clear }
})