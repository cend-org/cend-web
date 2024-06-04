<script setup lang="ts">
const validation  = useValidation();
const coursePreferenceStore = useCoursePreferenceStore();
let originalItems = [
  {
    "Id": "0",
    "label" : "En ligne",
    "description": "économique, rapide, certain d’avoir le meilleur tuteur pour vous.", 
    "value": true,
  },
  {
    "Id": "1",
    "label" : "En présentiel",
    "description": "Option prémium, séléction plus limitée de tuteurs.", 
    "value": false,
  },
];
const items = ref([...originalItems]);

const onSelectItem = (item: any) => {
    coursePreferenceStore.set(item);
};

const isSelected = (item: any) => {
  return item.Id === coursePreferenceStore.selectedItem.Id ? 'bg-green-200' : '';
};
coursePreferenceStore.selectedItem = items.value[0]
</script>

<template>
    <div class="h-[55vh] space-y-2 overflow-y-scroll scroll-bar-none">
        <button @click="onSelectItem(item)" type="button" :class="['bg-gray-100 w-full h-[10vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm', isSelected(item)]" v-for="item in items">
            <div>{{ item.label }}</div>
            <div class="text-xs text-gray-500 poppins-regular font-normal">{{ item.description }}</div>
        </button>
    </div>
</template>
