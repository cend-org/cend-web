<script setup lang="ts">
const props = defineProps({
    type: {
        required: true,
        type: String,
    },
    placeholder: {
        required: true,
        type: String,
    },
    componentField: {
        required: true,
        type: Object,
    },
    value: {
        type: Date as any,
        required: true
    },

})

import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today, type DateValue, } from '@internationalized/date'


import { CalendarIcon } from '@radix-icons/vue'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils';


const df = new DateFormatter('fr-FR', {
    dateStyle: 'long',
});
const value = ref(props.value);
watch(value, (newVal) => {
    newVal = new Date(newVal)
    emit('update:value', newVal);
});
const emit = defineEmits(['update:value']);
</script>
<template>
    <div class="relative w-full items-center">
        <Popover>
            <PopoverTrigger as-child class="w-full h-12">
                <Button variant="outline" :class="cn(
                    'w-full justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                )">
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{ value ? df.format(value.toDate(getLocalTimeZone())) : props.placeholder }}
                </Button>
            </PopoverTrigger>
            <PopoverContent  class="w-auto p-0">
                <Calendar  v-model="value" initial-focus locale="fr" value ="sdsadasdsa" :min-value="new CalendarDate(1900, 1, 1)"
                    :max-value="today(getLocalTimeZone())"  @update:model-value="(v) => {
              }"/>
            </PopoverContent>
        </Popover>
    </div>
</template>