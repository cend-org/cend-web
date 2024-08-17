<script setup lang="ts">
import { useLoadingStore } from '~/composables/loading';

const loadingStore = useLoadingStore();
const router = useRouter();
const route = useRoute()
function simulateLoading(){
  setTimeout(() => {
      loadingStore.hide()
    }, 1000);
}

router.beforeEach((to, from) => {
  loadingStore.show();
  simulateLoading();
})
// watch(() => route.path, () => {
//     simulateLoading();
//   }, {immediate: true, deep: true})
</script>

<template>
  <!-- <div v-if="loadingStore.loadingState" class="absolute top-0 left-0 h-full w-full overflow-hidden"
    style="z-index: 1001 !important; background-color: rgb(200 200 200 / 66%); position: fixed;  width: 100%; height: 100%;">
    <div class="h-full w-full flex justify-center items-center">
      <div class="shadow-lg rounded-lg p-3 bg-white text-md">
        <div class="flex flex-col w-full items-center relative">
          <div class="absolute  w-[60px] h-[60px] bg-color-main -mt-10 rounded-full p-4">
            <img class="h-full w-full rounded-full animate-spin" alt="img" src="/public/image/loading.svg">
          </div>
          <div class="p-2 text-center text-md pt-6"> 
            <span class="text-color-main poppins-bold text-xl ">CEND</span> est en chargement</div>
        </div>
      </div>
    </div>
  </div> -->
</template>
