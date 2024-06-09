<script setup lang="ts">

const items = [
  {
    img: "/image/google.svg",
    text: "register_continue_with_google",
  },
  {
    img: "/image/apple.svg",
    text: "register_continue_with_apple",
  },
  {
    img: "/image/fb.svg",
    text: "register_continue_with_facebook",
  },
  {
    text: "register_continue_with_qrcode",
  },
]
</script>
<template>
  <div class="flex flex-col gap-3">
    <div
        v-for="item in items"
        class="cursor-pointer flex justify-content-between align-items-center w-full px-3 py-4 shadow">
      <img v-if="item.img" class="absolute ml-4" :src="item.img" alt="Image" width="20" />
      <div class="w-full text-center">{{ $t(item.text) }}</div>
    </div>
  </div>
  <p class="text-sm font-extralight text-gray-400 text-center py-10">
    En continuant, vous acceptez de recevoir au numéro fourni des appels, messages WhatsApp ou SMS, y compris de façon automatisée, de la part d'Uber et de ces sociétés affiliées.
  </p>
</template>