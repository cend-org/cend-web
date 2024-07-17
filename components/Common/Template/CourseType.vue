<script setup lang="ts">
import {  ref, computed, watch } from 'vue';
const props = defineProps({
    items: {
        required: true,
        type: Array<any>
    },
    selectedItem: {
        type: Object,
        default: null,
    },
});
const selectedItem = ref(props.selectedItem);
watch(selectedItem, (newVal) => {
    emit('update:selectedItem', newVal);
});

const onSelectItem = (item: any) => {
    selectedItem.value = item;
    emit('update:selectedItem', item);
};
const isSelected = (item: any) => {
 return item.title == selectedItem.value.title ? 'bg-[#3A9B23] text-white' : 'bg-gray-200';
};
selectedItem.value = props.items[0];
const emit = defineEmits(['update:selectedItem'])
</script>

<template>
  <div class="h-[55vh] space-y-2 overflow-y-scroll scroll-bar-none">
    <button @click="onSelectItem(item)" type="button"
      :class="['w-full h-[10vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm', isSelected(item)]"
      v-for="item in props.items">
      <div class="text-xl">{{ item.title }}</div>
      <div class="text-xs">{{item.description}}</div>
    </button>
  </div>
</template>