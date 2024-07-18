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


const props = withDefaults(defineProps<CalendarRootProps & { class?: HTMLAttributes['class']} & {minus: string}>(), {
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
})
const attrs = useAttrs();
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, placeholder: __, minus: ___,  ...delegated } = props

  return delegated
})


const duration: Duration = {
  years: props.minus? parseInt(props.minus) : 0 ,
}
const placeholder = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: today(getLocalTimeZone()).subtract(duration),
}) as Ref<DateValue>

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const formatter = useDateFormatter('fr')
const df = new DateFormatter('fr-Fr', {
  dateStyle: 'long',
}); 

function yearList(): number[] {
  const currentYear = new Date().getFullYear();
      const startYear = currentYear - 70;
      const endYear = currentYear + 0;
      const years = [];
      for (let year = startYear; year <= endYear; year++) {
        years.push(year);
      }
      return years;
}

</script>
<template>

  <Popover>
    <PopoverTrigger as-child v-bind=attrs>
      <Button  v-bind="attrs"  type="button"
        :class="['flex flex-row items-center justify-start h-12 bg-white text-foreground shadow-none border w-full hover:bg-transparent', props.class]">
        <CalendarIcon class="mr-2 h-4 w-4"  />
        {{ df.format(placeholder.toDate(getLocalTimeZone()))}}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <CalendarRoot v-slot="{ date, grid, weekDays }" v-model:placeholder="placeholder" v-bind="forwarded"
        :class="cn('rounded-md border p-3', props.class)" locale="fr">
        <CalendarHeader>
          <CalendarHeading  class="flex w-full items-center justify-between gap-2">
            <Select  :default-value="placeholder.month.toString()" @update:model-value="(v) => {
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

            <Select :default-value="placeholder.year.toString()" @update:model-value="(v) => {
              console.log('V===>  ', v);
              console.log('placeholder===> ', placeholder);
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
                
                <!-- <SelectItem v-for="yearValue in createDecade({ dateObj: date, startIndex: -70, endIndex: 1 })"
                  :key="yearValue.toString()" :value="yearValue.year.toString()">
                  {{ yearValue.subtract(duration).year }}
                </SelectItem> -->
                <SelectItem 
                  v-for="year in yearList()"
                  :key="year.toString()" 
                  :value="year.toString()">
                  {{ year }}
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
