<script setup lang="ts">
import {Input} from "~/components/ui/input";
import {LoaderCircle } from 'lucide-vue-next';

const loadingStore = useLoadingStore();
const props = defineProps({
  placeholder: {
    required: true,
    type: String,
  }, 
  type: {
    required: true,
    type: String,
  }, 
})

</script>
<template>
  <div class="px-5">
    <Button :type="props.type" class="w-full h-16 text-lg rounded-none" :disabled="loadingStore.loadingState">
    {{ props.placeholder }}
    <LoaderCircle v-if="loadingStore.loadingState"   class="mr-2 animate-spin"/>
  </Button>
  </div>
</template>