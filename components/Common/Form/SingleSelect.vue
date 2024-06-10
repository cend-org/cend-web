<script setup lang="ts">
import { MagnifyingGlassIcon } from '@radix-icons/vue'
const props = defineProps({
  items: {
    required: true,
    type: Array<any>,
  },
  searchPlaceholder: {
    required: true,
    type: String,
  }, 
})




const validation = useValidation();
const selectionSingleStore = useSelectionSingleStore();
let items = ref(props.items);





const filterText = ref('');
const itemsPerPage = ref(6);
const currentPage = ref(1);
const filteredItems = computed(() => {
  if (filterText.value === '') {
    return items.value;
  }
  return items.value.filter(item =>
    validation.normalizeString(item.Name).includes(validation.normalizeString(filterText.value))
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

const onSelectItem = (item: any) => {
  selectionSingleStore.set(item);
};

const isSelected = (item: any) => {
  return item.Id === selectionSingleStore.selectedItem.Id ? 'bg-green-200' : '';
};

watch(filterText, () => {
  currentPage.value = 1;
});
selectionSingleStore.selectedItem = paginatedItems.value[0];

const resetIndex = () => {
  currentPage.value = 1;
}
</script>

<template>
    <div class="relative w-full  items-center">
    <Input name="filterText" v-model="filterText" autofill="off" id="search" type="text" :placeholder="props.searchPlaceholder" class="pl-10 w-full h-12 text-lg" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
    </span>

  </div>
  <!-- <UInput autocomplete="off" size="xl" v-model="filterText" name="filterText" :placeholder="filtre..."
    icon="i-heroicons-magnifying-glass-20-solid" :ui="{ icon: { trailing: { pointer: '' } } }">
    <template #trailing>
      <UButton v-show="filterText !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
        @click="filterText = ''" />
    </template>
  </UInput> -->

  <div class="h-[54vh] space-y-2 overflow-y-scroll scroll-bar-none">
    <button @click="onSelectItem(item)" type="button"
      :class="['bg-gray-200 w-full h-[8vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm hover:bg-primary-500 hover:text-white']"
      v-for="item in paginatedItems">
      <span>{{ item.Name }}</span>
    </button>
  </div>
  <div class="w-full flex justify-end" 
    v-if="(currentPage * itemsPerPage) <= filteredItems.length">
    <Button @click="loadMoreItems" type="button" variant="secondary" class="">
        {{ $t('register_see_more') }}
    </Button>

    <!-- <UButton class="" size="xs" color="white" :label="$t('register_see_more')" /> -->
  </div>
  <div class="w-full flex justify-end"
    v-if="(currentPage * itemsPerPage) >= filteredItems.length">
    <!-- <UButton class="" size="xs" color="white" :label="$t('register_to_first_list')" /> -->
    <Button  @click="resetIndex()" type="button" variant="secondary" class="">
        {{ $t('register_to_first_list') }}
    </Button>
  </div>
</template>
