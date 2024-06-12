<script setup lang="ts">

const items = [
  {
    img: "/image/google.svg",
    text: "continuer avec google",
  },
  {
    img: "/image/apple.svg",
    text: "continuer avec Apple",
  },
  {
    img: "/image/fb.svg",
    text: "continuer avec facebook",
  },
  {
    text: "connectez-vous avec un QR code",
  },
]
</script>
<template>
  <div class="flex flex-col gap-3">
    <div
        v-for="item in items"
        class="cursor-pointer flex justify-content-between align-items-center w-full px-3 py-4 shadow">
      <img v-if="item.img" class="absolute ml-4" :src="item.img" alt="Image" width="20" />
      <div class="w-full text-center">{{ item.text }}</div>
    </div>
  </div>
  <p class="text-sm font-extralight text-gray-400 text-center py-10">
    En continuant, vous acceptez de recevoir au numéro fourni des appels, messages WhatsApp ou SMS, y compris de façon automatisée, de la part d'Uber et de ces sociétés affiliées.
  </p>
</template>