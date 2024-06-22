<script setup lang="ts">
import { Calendar } from '@/components/ui/v-calendar'
const attributes = ref([
  {
    highlight: true,
    dates: [
      new Date(),
      new Date(2022, 10, 2),
      new Date(2022, 10, 7),
      new Date(2022, 10, 17),
      new Date(2022, 10, 23),
    ],
  },
]);

const cal = ref()

</script>

<template>
  <div class="flex flex-row gap-x-3">
    <div class="w-1/2 shadow-lg p-4">
      <Calendar :v-model="attributes" :attributes= "attributes" ref="cal">
        <template #day-content="{ day, dayProps, dayEvents }">
          <div v-bind="dayProps" v-on="dayEvents">
            {{ day.label }}
          </div>
        </template>
      </Calendar>
    </div>
    <div class="w-1/2 px-5">
      <HistoryPanel />
    </div>
  </div>
</template>