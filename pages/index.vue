<script setup lang="ts">
const loading = useLoadingStore();
loading.hide();
definePageMeta({
  layout: 'onboarding'
})
</script>
<template>
  <StaticHome />
</template>