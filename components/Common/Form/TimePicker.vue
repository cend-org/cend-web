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
import { createDecade, createYear, toDate, } from 'radix-vue/date'
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
import { string } from 'zod'



const props = withDefaults(defineProps<CalendarRootProps & { class?: HTMLAttributes['class'] }>(), {
    modelValue: undefined,
    h: undefined,
    m: undefined,
    placeholder() {
        return today(getLocalTimeZone())
    },

    H() {
        return "08"
    },
    M() {
        return "00"
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
    hourTime: {
        required: true, 
        type: String,
    }

})
const emits = defineEmits<CalendarRootEmits>();


const delegatedProps = computed(() => {
    const { class: _, placeholder: __, H: ___, M: ____, ...delegated } = props
    return delegated
})

const duration: Duration = {
    years: 18,
}
const placeholder = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: today(getLocalTimeZone()),
}) as Ref<DateValue>

const H = useVModel(props, 'h', emits, {
    passive: true,
    defaultValue: '08' as any,
}) as Ref<any>

const M = useVModel(props, 'm', emits, {
    passive: true,
    defaultValue: '00' as any,
}) as Ref<any>

const forwarded = useForwardPropsEmits(delegatedProps, emits)
const formatter = useDateFormatter('fr')
const df = new DateFormatter('fr-Fr', {
    dateStyle: 'long',
});

const createHours = (() => {
    const hours: string[] = [];
    for (let i = 0; i <= 24; i++) {
        hours.push(i.toString().padStart(2, '0'));
    }
    return hours;
});

const createminutes = (() => {
    const hours: string[] = [];
    for (let i = 0; i <= 60 - 1; i++) {
        hours.push(i.toString().padStart(2, '0'));
    }
    return hours;
});



// watch(H, (newVal) => {
//     emitEvent()
// });

// watch(M, (newVal) => {
//     emitEvent()
// });

// function emitEvent(){
//     let time = `${H.value} h: ${M.value}`;
//     //emit('update:hourTime', time);
// }

</script>

<template>

    <Popover>
        <PopoverTrigger as-child>
            <Button type="button" :class="['text-center', props.class]">
                {{ H ? `${H}h : ${M}` : "02" }}
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <CalendarRoot v-slot="{ date, grid, weekDays }" v-model:placeholder="placeholder" v-bind="forwarded"
                :class="cn('rounded-md border p-3', props.class)" locale="fr">
                <CalendarHeader>
                    <CalendarHeading class="flex w-full items-center justify-between gap-2">
                        <Select :default-value="'08'.toString()" @update:model-value="(v) => {
                            if (!v || !H) return;
                            if (Number(v) === H) return;
                            H = v;
                        }">
                            <SelectTrigger aria-label="Select month" class="w-[100%]">
                                <SelectValue placeholder="Select month" />
                            </SelectTrigger>
                            <SelectContent class="max-h-[300px]">
                                <SelectItem v-for="hour in createHours()" :key="hour.toString()" :value="hour">
                                    {{ `${hour}h ` }}
                                    <!-- {{ formatter.custom(toDate(month), { month: 'long' }) }} -->
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select :default-value="'00'.toString()" @update:model-value="(v) => {
                            if (!v || !M) return;
                            if (Number(v) === M) return;
                            M = v;
                        }">
                            <SelectTrigger aria-label="Select year" class="w-[100%]">
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent class="max-h-[300px]">
                                <SelectItem v-for="minute in createminutes()" :key="minute.toString()" :value="minute">
                                    {{ `${minute} Min` }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CalendarHeading>
                </CalendarHeader>
            </CalendarRoot>
        </PopoverContent>
    </Popover>
</template>
