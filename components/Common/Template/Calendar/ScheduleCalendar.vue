<template>
    <div class="max-w-md mx-auto rounded-lg overflow-hidden">
      <div class="flex justify-between items-center p-4">
        <button @click="prevMonth" class="text-gray-600 hover:text-gray-900">&lt;</button>
        <span class="font-semibold">{{ monthNames[currentMonth] }} {{ currentYear }}</span>
        <button @click="nextMonth" class="text-gray-600 hover:text-gray-900">&gt;</button>
      </div>
      <div class="grid grid-cols-7 gap-2 p-4">
        <div class="text-center font-bold" v-for="day in dayNames" :key="day">{{ day }}</div>
        <div
          v-for="(day, index) in daysInMonth"
          :key="index"
          :class="['h-10 w-10 flex justify-center items-center rounded cursor-pointer transition', { 'bg-green-500 text-white rounded-full': isMarked(day) }]"
        >
          {{ day.getDate() }}
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center items-center py-2 gap-4 flex-wrap">
          <div class="flex flex-nowrap items-center gap-1 cursor-pointer">
              <div class="w-[15px] h-[15px] bg-purple-200 rounded-full"></div>
              <span class="text-xs text-purple-800">Géopgraphe</span>
          </div>
          <div class="flex flex-nowrap items-center gap-1 cursor-pointer">
              <div class="w-[15px] h-[15px] bg-orange-200 rounded-full"></div>
              <span class="text-xs text-orange-800">Physics</span>
          </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  // Props to receive marked dates from parent component
  const props = defineProps({
    markedDates: {
      type: Array,
      default: () => [],
      required: true
    }
  });
  
  const { today, parseDate } = useDateHelpers();
  
  // Current date
  const currentYear = ref(today.getFullYear());
  const currentMonth = ref(today.getMonth());
  
  // Arrays for day and month names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Convert marked dates strings to Date objects
  const parsedMarkedDates = computed(() => props.markedDates.map(parseDate));
  
  // Calculate the days in the current month
  const daysInMonth = computed(() => {
    const date = new Date(currentYear.value, currentMonth.value, 1);
    const days = [];
    while (date.getMonth() === currentMonth.value) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  });
  
  // Check if a date is marked
  const isMarked = (date: Date) => {
    return parsedMarkedDates.value.some((d) => d.getTime() === date.getTime());
  };
  
  // Navigate to the previous month
  const prevMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11;
      currentYear.value -= 1;
    } else {
      currentMonth.value -= 1;
    }
  };
  
  // Navigate to the next month
  const nextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0;
      currentYear.value += 1;
    } else {
      currentMonth.value += 1;
    }
  };
  </script>
  