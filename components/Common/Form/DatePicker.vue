<!-- <script setup lang="ts">
import { ref } from 'vue'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'

import { CalendarIcon } from '@radix-icons/vue'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>()

</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button class="flex flex-row items-center justify-start h-12 bg-white text-foreground shadow-none border w-full hover:bg-transparent">
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Votre date de naissance" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template> -->


<script setup lang="ts">
import { CalendarIcon } from '@radix-icons/vue'
import { type HTMLAttributes, type Ref, computed } from 'vue'
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useDateFormatter, useForwardPropsEmits } from 'radix-vue'
import { createDecade, createYear, toDate,  } from 'radix-vue/date'
import { type DateValue, getLocalTimeZone, today, DateFormatter } from '@internationalized/date'
import { useVModel } from '@vueuse/core'
import { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarHeader, CalendarHeading } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { LogIn } from 'lucide-vue-next'
import { boolean } from 'zod'



const props = withDefaults(defineProps<CalendarRootProps & { class?: HTMLAttributes['class'] }>(), {
  modelValue: undefined,
  placeholder() {
    return today(getLocalTimeZone())
  },

  weekdayFormat: 'short',
  type: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  }, 
  hideIcon: {
    required: false,
    type: Boolean, 
  }, 
  yearMinus: {
    required: false,
    type: String, 
  }, 

  
})

const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, placeholder: __,  ...delegated } = props

  return delegated
})


const duration: Duration = {
  years: 0 ,
}
const placeholder = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: today(getLocalTimeZone()),
}) as Ref<DateValue>

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const formatter = useDateFormatter('fr')
const df = new DateFormatter('fr-Fr', {
  dateStyle: 'long',
}); 

// watch(placeholder, (newVal) => {
//     emit('update:placeholder', newVal);
// });
// const emit = defineEmits(['update:placeholder']);

</script>

<template>

  <Popover>
    <PopoverTrigger as-child>
      <Button type="button"
        :class="['flex flex-row items-center justify-start h-12 bg-white text-foreground shadow-none border w-full hover:bg-transparent', props.class]">
        <CalendarIcon class="mr-2 h-4 w-4" v-if="!props.hideIcon" />
        {{ placeholder ? df.format(placeholder.subtract(duration).toDate(getLocalTimeZone())) : "Votre date de naissance" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <CalendarRoot v-slot="{ date, grid, weekDays }" v-model:placeholder="placeholder" v-bind="forwarded"
        :class="cn('rounded-md border p-3', props.class)" locale="fr">
        <CalendarHeader>
          <CalendarHeading class="flex w-full items-center justify-between gap-2">
            <Select :default-value="placeholder.month.toString()" @update:model-value="(v) => {
              if (!v || !placeholder) return;
              if (Number(v) === placeholder?.month) return;
              placeholder = placeholder.set({
                month: Number(v),
              })
            }">
              <SelectTrigger aria-label="Select month" class="w-[60%]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent class="max-h-[200px]">
                <SelectItem v-for="month in createYear({ dateObj: date })" :key="month.toString()"
                  :value="month.month.toString()">
                  {{ formatter.custom(toDate(month), { month: 'long' }) }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select :default-value="props.placeholder.year.toString()" @update:model-value="(v) => {
              if (!v || !placeholder) return;
              if (Number(v) === placeholder?.year) return;
              placeholder = placeholder.set({
                year: Number(v),
              })
            }">
              <SelectTrigger aria-label="Select year" class="w-[40%]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent class="max-h-[200px]">
                <SelectItem v-for="yearValue in createDecade({ dateObj: date, startIndex: -70, endIndex: 1 })"
                  :key="yearValue.toString()" :value="yearValue.year.toString()">
                  {{ yearValue.year }}
                </SelectItem>
              </SelectContent>
            </Select>
          </CalendarHeading>
        </CalendarHeader>

        <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
          <CalendarGrid v-for="month in grid" :key="month.value.toString()">
            <CalendarGridHead>
              <CalendarGridRow>
                <CalendarHeadCell v-for="day in weekDays" :key="day">
                  {{ day }}
                </CalendarHeadCell>
              </CalendarGridRow>
            </CalendarGridHead>
            <CalendarGridBody class="grid">
              <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="mt-2 w-full">
                <CalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate">
                  <CalendarCellTrigger :day="weekDate" :month="month.value" />
                </CalendarCell>
              </CalendarGridRow>
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      </CalendarRoot>
    </PopoverContent>
  </Popover>



</template>
