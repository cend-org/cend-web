<template>
    <div class="text-3xl">
        HELP PAGE
    </div>
 </template>
 <script setup lang="ts">
 const loading = useLoadingStore();
 loading.hide();
 definePageMeta({
    layout: 'onboarding'
 });
</script>