<script setup lang="ts">
const props = defineProps({
  title: {
    required: true,
    default: "No title props defined",
    type: String,
  }
})

</script>
<template>
  <div class="flex flex-row w-full justify-center items-center px-5 md:px-10 mt-3">
    <div class="w-full md:w-[430px] py-5">
      <div class="text-gray-700 font-medium text-2xl">
        {{ props.title }}
      </div>
      <div class="py-5">
        <slot />
      </div>
    </div>
  </div>
</template>
