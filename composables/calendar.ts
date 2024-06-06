import { defineStore } from 'pinia';
export const useCalendarStore = defineStore('calendar', () => {
    const date = ref(new Date());
    const formatedDate = ref(formatDateToDDMMYYYY(new Date()))

    function set(_date: Date) {
        date.value = _date;
        formatedDate.value = formatDateToDDMMYYYY(_date);
    }
    function clear(){
      date.value = new Date();
      formatedDate.value = formatDateToDDMMYYYY(new Date());
    }
    function formatDateToDDMMYYYY(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      }

    return { formatedDate, date, set, clear}
  })