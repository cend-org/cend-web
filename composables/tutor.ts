import { defineStore } from 'pinia';
export const useTutorStore = defineStore('tutor', () => {
    let tutor = ref({} as any);
    let profileImage = ref("/image/avatar-white.svg");
    let video = ref("");
    function set(item: any) {
        tutor.value = item;
    }

    function remove() {
        tutor = ref({} as any);
        profileImage = ref("/image/avatar-white.svg");
        video = ref("")
    }
    return { tutor, profileImage, video,  set, remove}
  })