<script setup lang="ts">
import {Input} from "~/components/ui/input";
const props = defineProps({
  type: {
    required: true,
    type: String,
  },
  placeholder: {
    required: true,
    type: String,
  }
})
</script>
<template>
  <Input
      :type="props.type"
      :placeholder="props.placeholder"
      class="w-full h-12"
  />
</template>