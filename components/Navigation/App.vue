<script lang="ts" setup>
  import { MessagesSquare } from 'lucide-vue-next'
</script>
<template>
  <div class="py-4 flex">
    <div class="ml-auto flex flex-row gap-x-6">
      <MessagePin />
      <div class="flex flex-col justify-center items-center bg-transparent cursor-pointer relative px-3 py-3">
        <NavigationItemAvatar />
      </div>
    </div>
  </div>
</template>