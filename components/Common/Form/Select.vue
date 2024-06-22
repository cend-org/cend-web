<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const props = defineProps({
  items: {
    required: true,
    type: Array<any>,
  },
  placeholder: {
    required: true,
    type: String,
  }
})
</script>

<template>
  <Select>
    <SelectTrigger  class="w-full h-12">
      <SelectValue :placeholder="props.placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="item in props.items" :value="item.value.toString()">
            {{item.name}}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>