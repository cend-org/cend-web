<script setup lang="ts">
const props = defineProps({
   imageLink: {
    required: true,
    type: String,
  },
})
</script>

<template>
    <div class="bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${props.imageLink})` }"></div>
</template>