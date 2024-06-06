<script setup lang="ts">
const validation  = useValidation();
const  languagePreferenceStore = useLanguagePreferenceStore();
let originalItems = [
  {
    "Id": "0",
    "label" : "Français CA",
    "description": "par défaut", 
    "value": 0,
  },
  {
    "Id": "1",
    "label" : "Français FR",
    "description": "", 
    "value": 1,
  },
  {
    "Id": "2",
    "label" : "Anglais EN",
    "description": "", 
    "value": 2,
  },
];
const items = ref([...originalItems]);

const onSelectItem = (item: any) => {
    languagePreferenceStore.set(item);
};

const isSelected = (item: any) => {
  return item.Id === languagePreferenceStore.selectedItem.Id ? 'bg-green-200' : '';
};
languagePreferenceStore.selectedItem = items.value[0]
</script>

<template>
    <div class="h-[55vh] space-y-2 overflow-y-scroll scroll-bar-none">
        <button @click="onSelectItem(item)" type="button" :class="['bg-gray-100 w-full h-[10vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm', isSelected(item)]" v-for="item in items">
            <div>{{ item.label }}</div>
            <div class="text-xs text-gray-500 poppins-regular font-normal">{{ item.description }}</div>
        </button>
    </div>
</template>
