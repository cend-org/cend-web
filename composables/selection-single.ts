import { defineStore } from 'pinia';
export const useSelectionSingleStore = defineStore('selectionSingle', () => {
  const selectedItem = ref({
    "Id": "",
    "CreatedAt": "",
    "UpdatedAt": "",
    "DeletedAt": "",
    "AcademicLevelId": "",
    "Name": "",
    "__typename": ""
  },);
  let list = ref([]);
  function set(item: any) {
    selectedItem.value = item;
  }
  return { selectedItem, list, set }
})