<script setup lang="ts">
import {Toaster} from "~/components/ui/toast";
const usr = userStore()

usr.configure(0)

</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>
