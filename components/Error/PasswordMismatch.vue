<script setup lang="ts">
import { RocketIcon, InfoCircledIcon } from '@radix-icons/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert class="bg-red-100">
    <InfoCircledIcon class="h-4 w-4 text-white" />
    <AlertTitle class="text-red-400">Note </AlertTitle>
    <AlertDescription>
      Les deux entrées ne sont pas pareilles !
    </AlertDescription>
  </Alert>
</template>