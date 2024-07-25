<template>
    <NuxtLink v-if="!buttonManager.isAuthRoute"  to="/static/help"
        class="py-2 px-3 rounded-full cursor-pointer hover:bg-green-700 hidden lg:block">
        <span>Aide</span>
    </NuxtLink>
</template>
<script setup lang="ts">
    const buttonManager = buttonManagerStore();
</script>