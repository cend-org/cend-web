<script setup lang="ts">
  import { buttonManagerStore } from '~/stores/buttons.manager.store';
  const buttonManager = buttonManagerStore()
</script>
<template>
  <NuxtLink v-if="!buttonManager.isAuthRoute"  class="py-2 px-3 rounded-full cursor-pointer hover:bg-green-700 hidden lg:block" to="/static/tutoring">
    <span>Tutorat</span>
  </NuxtLink>
</template>
