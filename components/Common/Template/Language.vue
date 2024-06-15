<script setup lang="ts">
const props = defineProps({
    selectedLanguage: {
        type: Object,
        default: null,
    },
});
let selectedLanguage = ref(null as any);

let originalItems = [
  {
    "Id": "0",
    "label": "français CA",
    "description": "Par défaut",
    "code": 'ca',
    "value": 0,
  },
  {
    "Id": "1",
    "label": "français FR",
    "description": "",
    "code": 'fr',
    "value": 1,
  },
  {
    "Id": "2",
    "label": "Anglais EN",
    "description": "",
    "code": 'en',
    "value": 2,
  },
];
const items = ref([...originalItems]);

const onSelectItem = (item: any) => {
    selectedLanguage.value = item;
    emit('update:selectedLanguage', item);
};

const isSelected = (item: any) => {
 return item.Id == selectedLanguage.value.Id ? 'bg-green-200' : '';
};
selectedLanguage.value = items.value[0];
const emit = defineEmits(['update:selectedLanguage']);
emit('update:selectedLanguage', selectedLanguage.value);
</script>

<template>
  <div class="h-[55vh] space-y-2 overflow-y-scroll scroll-bar-none">
    <button @click="onSelectItem(item)" type="button"
      :class="['bg-gray-100 w-full h-[10vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm', isSelected(item)]"
      v-for="item in items">
      <div>{{ item.label }}</div>
      <div class="text-xs text-gray-500 poppins-regular font-normal">
        <span v-if="item.description">{{ item.description}}</span>
      </div>
    </button>
  </div>
</template>
