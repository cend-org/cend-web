<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
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

selectedItem.value = props.items[0];
const emit = defineEmits(['update:selectedItem'])
</script>

<template>
  <div class="h-[55vh] space-y-2 overflow-y-scroll scroll-bar-none">
    <button @click="onSelectItem(item)" type="button"
      :class="['bg-gray-100 w-full h-[10vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm', selectedItem && selectedItem.title == item.title ? 'bg-green-500 text-white' : '']"
      v-for="item in props.items">
      <div>{{ item.title }}</div>
      <div class="text-xs  poppins-regular font-normal">{{item.description}}</div>
    </button>
  </div>
</template>