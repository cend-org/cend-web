<script setup lang="ts">
import {InfoCircledIcon} from "@radix-icons/vue";
import {Alert, AlertDescription, AlertTitle} from "~/components/ui/alert";

const props = defineProps({
  title: {
    required: true,
    default: "_",
    type: String,
  },
  e: {
    required: true,
    type: Object,
  }
})

</script>

<template>
  <Alert class="bg-red-100">
    <InfoCircledIcon class="h-4 w-4 text-white" />
    <AlertTitle class="text-red-400">{{props.title}}</AlertTitle>
    <AlertDescription>
<!--      <div v-for="e in gql.gqlErrors">-->
<!--        - {{ e.message }}-->
<!--      </div>-->
    </AlertDescription>
  </Alert>
</template>
