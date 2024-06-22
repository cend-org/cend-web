import { defineStore } from 'pinia';
export const useLoadingStore = defineStore('loading', () => {
    const loadingState = ref(false)

    function show() {
      loadingState.value = true;
    }

    function hide(){
        loadingState.value = false;
    }
  
    return { loadingState, show, hide }
  })