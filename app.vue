<template>
  <head>
    <link rel="icon" href="/favicon.ico" sizes="any" />
  </head>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
<!--  <UNotifications />-->
  <UModals />
  <loading />
</template>
<script setup lang="ts">
import {Toaster} from "~/components/ui/toast";
</script>