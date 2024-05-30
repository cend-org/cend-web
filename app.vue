<template>
  <NuxtLayout :name="navigation">
    <NuxtPage />
  </NuxtLayout>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  
  <UNotifications />
  <UModals />
  <loading />
 
</template>
<script setup lang="ts">
// You might choose this based on an API call or logged-in status
const navigation = "navigation";
</script>
