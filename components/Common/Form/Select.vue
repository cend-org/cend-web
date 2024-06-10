<script setup lang="ts">
const props = defineProps({
  list: {
    required: true,
    type: Array<any>,
  },
  placeholder: {
    required: true,
    type: String,
  }
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
      <Select>
        <SelectTrigger class="w-full h-12">
          <SelectValue :placeholder="props.placeholder" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="item in props.list" :value="item.value.toString()">
              {{ item.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
  </div>
</template>