import { defineStore } from 'pinia';
export const useSelectionStudentStore = defineStore('selectionStudent', () => {
    const selectedItem = ref({
        "Id": "",
        "Name": "",
        "FamilyName": "",
        "Matricule": "",
        "Age": 0,
        "BirthDate": "",
        "Sex": 0,
        "Lang": 0,
        "Status": 0,
        "ProfileImageXid": "",
        "Description": "",
        "CoverText": "",
        "Profile": "",
        "ExperienceDetail": "",
        "AdditionalDescription": "",
        "AddOnTitle": ""
    },);
    let list = ref([]);
    function set(item: any) {
        selectedItem.value = item;
    }
    return { selectedItem, list, set }
})