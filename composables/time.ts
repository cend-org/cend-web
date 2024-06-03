import { defineStore } from 'pinia';
export const useTimeStore = defineStore('time', () => {
    const timeSlot0 = ref();
    const timeSlot1 = ref();

    function set(_time: any, _slot: number) {
        switch (_slot) {
            case 0:
                timeSlot0.value = _time;
                break;

            case 1:
                timeSlot1.value = _time;
                break;
        }
    }
    function get(_slot: number) {
        switch (_slot) {
            case 0:
                return timeSlot0;
            case 1:
                return timeSlot1;
        }
    }
    return { get, set }
})