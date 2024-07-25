<script lang="ts" setup>
import { MessagesSquare } from 'lucide-vue-next'
</script>
<template>
  <div class="w-full flex items-center justify-between px-4 py-4 border-b-2">
    <NuxtLink  to="/">
      <span class="text-4xl font-bold text-primary">CEND</span>
    </NuxtLink>
    
    <div class="w-full flex flex-row items-center justify-end gap-2">
      <NavigationItemTheme />
      <MessagePin />
      <NavigationItemDownload />
      <NavigationItemNotification />
      <NavigationItemAvatar />
    </div>
  </div>
  <!-- <div class="py-1 flex items-center px-4 border-b-2">
    <span class="text-4xl font-bold text-primary">CEND</span>
    <div class="ml-auto flex flex-row gap-x-6">
      <MessagePin />
      <div class="flex flex-col justify-center items-center bg-transparent cursor-pointer relative px-3 py-3">
        <NavigationItemAvatar />
      </div>
    </div>
  </div> -->
</template>