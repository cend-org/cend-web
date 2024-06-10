<script setup lang="ts">
const props = defineProps({
  items: {
    required: true,
    type: Array<any>,
  },
  placeholder: {
    required: true,
    type: String,
  }, 
  componentField: {
    required: true,
    type: Object,
  }, 
})

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>
<template>
  <div class="relative w-full items-center">
      <Select v-bind="componentField">
        <SelectTrigger class="w-full h-12">
          <SelectValue :placeholder="props.placeholder" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="item in props.items" :value="item.value">
              {{ item.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
  </div>
</template>