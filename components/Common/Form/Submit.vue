<template>
  <div v-if="props.position == 'absolute'" class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
    <Button type="submit" class="w-full bg-color-main text-white hover:bg-green-800 h-12">
    Continuer
  </Button>
  </div>
  <Button v-else type="submit" class="w-full bg-color-main text-white hover:bg-green-800 h-12">
    Continuer
  </Button>
</template>
<script setup lang="ts">
import {Button} from "~/components/ui/button";
const props = defineProps({
    position: {
        required: false,
        type: String
    },
});
</script>