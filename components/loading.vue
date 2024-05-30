<script setup lang="ts">
import { useLoadingStore } from '~/composables/loading';

const loadingStore = useLoadingStore();
</script>

<template>
  <div v-if="loadingStore.loadingState" class="absolute top-0 left-0 h-full w-full" style="z-index: 1001 !important; background-color: rgb(200 200 200 / 66%);">
    <div class="h-full w-full flex justify-center items-center">
        <div class="shadow-lg rounded-lg p-3 bg-white text-md">
            <div class="flex flex-col w-full items-center">
                <div class="w-[90px] h-[90px] bg-color-main -mt-12 rounded-full p-4">
                    <img class="h-full w-full rounded-full animate-spin" alt="img" src="/public/image/loading.svg" >
                </div>
                <div class="p-2 text-center text-xl"> <span class="text-color-main poppins-bold text-xl">CEND</span> {{$t('is_loading')}}</div> 
            </div>
         </div>
    </div>
  </div>
</template>

