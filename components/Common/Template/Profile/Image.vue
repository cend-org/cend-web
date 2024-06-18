<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next';

const props = defineProps({
   imageLink: {
    required: true,
    type: String,
  },
})
</script>

<template>
    <div class="bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${props.imageLink})` }">
      <!-- <div class="bg-[#9e99997a]  h-full w-full flex items-center justify-center " v-if="!props.imageLink">
        <LoaderCircle class="absolute text-white animate-spin"></LoaderCircle>
      </div> -->
    </div>
</template>