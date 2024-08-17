<!-- <template>
  <Button type="submit"
      class="cursor-pointer flex justify-content-between align-items-center w-full px-3 py-4 h-12 shadow">
    <div class="w-full text-center">Continuer</div>
  </Button>
</template> -->
<template>
  <div v-if="props.position == 'bottom'"
    class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
    <Button :disabled="loadingStore.loadingState" type="submit" :class="['w-full bg-color-main text-white hover:bg-green-800  w-full h-16 text-lg rounded-none', props.classList]">
      {{ props.title? props.title : 'Continuer'}} 
      <LoaderCircle v-if="loadingStore.loadingState"   class="ml-4 animate-spin"/> 
    </Button>
    
  </div>
  <div v-else class="">
    <Button :disabled="loadingStore.loadingState" type="submit" :class="['w-full bg-color-main text-white hover:bg-green-800 w-full h-16 text-lg rounded-none', props.classList]">
      {{ props.title? props.title : 'Continuer'}}
      <LoaderCircle v-if="loadingStore.loadingState"   class="ml-4 animate-spin"/>
  </Button>

  </div>
</template>
<script setup lang="ts">
import{LoaderCircle} from 'lucide-vue-next';
const loadingStore = useLoadingStore();
const props = defineProps({
  position: {
    required: false,
    type: String
  },
  title: {
    required: false, 
    type: String,
  },
  classList: {
    required: false, 
    type: String,
  }
});
</script>