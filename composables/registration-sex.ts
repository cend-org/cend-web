import { defineStore } from 'pinia';
export const useRegistrationSexStore = defineStore('sex', () => {
    const sex = ref({ label: 'register_gender_label', value: '' })
    function set(_sex: any) {
        sex.value = _sex;
    }
    return { sex, set}
  })