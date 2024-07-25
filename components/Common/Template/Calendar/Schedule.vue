<template>
  <div class="w-full">
    <div class="w-full flex justify-between items-center p-5">
      <Button @click="previousMonth">&lt;</Button>
      <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
      <Button @click="nextMonth">&gt;</Button>
    </div>
    <table class="w-full calendar-table">
      <thead>
        <tr>
          <th v-for="day in dayNames" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in calendar" :key="week[0].date.toDateString()">
          <td v-for="day in week" :key="day.date.toDateString()" :class="{ 'other-month': day.month !== currentMonth}">
            <div class="w-[30px] h-[30px]  rounded-full  flex justify-center items-center cursor-pointer">
                <span>{{ day.date.getDate() }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="w-full flex justify-center items-center py-2 gap-4 flex-wrap">
        <div class="flex flex-nowrap items-center gap-1">
            <div class="w-[15px] h-[15px] bg-purple-200 rounded-full"></div>
            <span class="text-xs text-purple-800">Géopgraphe</span>
        </div>
        <div class="flex flex-nowrap items-center gap-1">
            <div class="w-[15px] h-[15px] bg-orange-200 rounded-full"></div>
            <span class="text-xs text-orange-800">Physics</span>
        </div>
  </div>
</template>
<style scoped>


.calendar-table th,
.calendar-table td {
  padding: 8px;
}

.calendar-table .other-month {
  color: #aaa;
}
</style>
<script setup lang="ts" >
import { ref, computed } from 'vue';

// Days and month names
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Current date information
const currentDate = ref(new Date());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());

// Generate the calendar grid for the current month
const calendar = computed(() => {
  const startOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const endOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);

  const startDay = startOfMonth.getDay();
  const endDay = endOfMonth.getDay();
  const totalDays = endOfMonth.getDate();

  const days = [];
  // Add days from previous month
  for (let i = startDay; i > 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value, 1 - i);
    days.push({ date, month: currentMonth.value - 1 });
  }
  // Add days for current month
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);
    days.push({ date, month: currentMonth.value });
  }
  // Add days from next month
  for (let i = 1; i < 7 - endDay; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i);
    days.push({ date, month: currentMonth.value + 1 });
  }

  // Chunk days into weeks
  const weeks = [];
  while (days.length) {
    weeks.push(days.splice(0, 7));
  }
  return weeks;
});

// Navigation functions
const previousMonth = () => {
  currentDate.value.setMonth(currentMonth.value - 1);
};
const nextMonth = () => {
  currentDate.value.setMonth(currentMonth.value + 1);
};
</script>
