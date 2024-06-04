<script setup lang="ts">
import { useSelectionMultipleStore } from '~/composables/selection-multiple';

const validation  = useValidation();
const selectionMultipleStore = useSelectionMultipleStore()
const items = ref([...selectionMultipleStore.list] as Array<any>);
const filterText = ref('');
const itemsPerPage = ref(6);
const currentPage = ref(1);


const filteredItems = computed(() => {
  if (filterText.value === '') {
    return items.value;
  }
  return items.value.filter(item =>
    item.Name.toLowerCase().includes(filterText.value.toLowerCase())
  );
});


const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredItems.value.slice(start, end);
});


const loadMoreItems = () => {
  if ((currentPage.value * itemsPerPage.value) < filteredItems.value.length) {
    currentPage.value += 1;
  }
};


const toggleSelectItem = (item: any) => {
    if(!selectionMultipleStore.selectedItems.includes(item as never)){
       selectionMultipleStore.add(item as never);
    }else{
      selectionMultipleStore.remove(item as never);
    }
};


const isSelected = (item: any) => {
  return selectionMultipleStore.selectedItems.some(selectedItem => selectedItem['Id'] == item.Id) ? 'bg-green-200' : '';
};

watch(filterText, () => {
  currentPage.value = 1;
});
selectionMultipleStore.selectedItems.push(paginatedItems.value[0] as never);
</script>

<template>
   <UInput
   size="xl"
    v-model="filterText"
    name="filterText"
    :placeholder="$t('filter_list')"
    icon="i-heroicons-magnifying-glass-20-solid"
    autocomplete="off"
    :ui="{ icon: { trailing: { pointer: '' } } }"
  >
    <template #trailing>
      <UButton
        v-show="filterText !== ''"
        color="gray"
        variant="link"
        icon="i-heroicons-x-mark-20-solid"
        :padded="false"
        @click="filterText = ''"
      />
    </template>
  </UInput>
    <div class="h-[55vh] space-y-2 overflow-y-scroll scroll-bar-none">
        <button @click="toggleSelectItem(item)" type="button" :class="['bg-gray-200 w-full h-[8.1vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm', isSelected(item)]" v-for="item in paginatedItems">
            <span>{{ item.Name }}</span>
        </button>
    </div>
    <div class="w-full flex justify-end"  @click="loadMoreItems" :disabled="(currentPage * itemsPerPage) >= filteredItems.length">
        <UButton class="" size="xs" color="white" :label="$t('register_see_more')" />
    </div>
</template>