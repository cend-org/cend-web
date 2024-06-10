<script setup lang="ts">
import { RocketIcon, InfoCircledIcon } from '@radix-icons/vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  status: {
    required: true,
    type: String,
  },
  show: {
    required: true,
    type: Boolean
  }
});

const bgColor = (() => {
  if (props.status == 'success') return 'bg-green-100';
  if (props.status == 'error') return 'bg-red-100';
});
const color = (() => {
  if (props.status == 'success') return 'text-green-400';
  if (props.status == 'error') return 'text-red-400';
});
const border = (() => {
  if (props.status == 'success') return 'border-green-300';
  if (props.status == 'error') return 'border-red-300';
})

</script>

<template>
  <Alert :class="['border-2 border-red-300', bgColor(), border()]" v-if="props.show">
    <InfoCircledIcon class="h-4 w-4 text-white" />
    <AlertTitle :class="['text-lg', color()]">{{ props.title }} </AlertTitle>
    <AlertDescription>
      {{ props.content }}
    </AlertDescription>
  </Alert>
</template>