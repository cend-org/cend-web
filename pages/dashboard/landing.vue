<template>
    <div class="text-center py-8 text-3xl text-color-main">
      Tableau de bord
    </div>
  </template>
<script setup lang="ts">
import { useAuthStore } from '#imports';
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
loadingStore.hide();
if (!authStore.connected) {
    navigateTo('/');
}
</script>