<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
import { MagnifyingGlassIcon } from '@radix-icons/vue';
import { Input } from '@/components/ui/input'

const props = defineProps({
    items: {
        required: true,
        type: Array<any>
    },
    searchPlaceholder: {
        required: true,
        type: String
    }, 
    selectedItem: {
        type: Object,
        default: null,
    },
});

const attrs = useAttrs();
const filterText = ref('');
const itemsPerPage = ref(5);
const currentPage = ref(1);
const selectedItem = ref(props.selectedItem);
watch(selectedItem, (newVal) => {
    emit('update:selectedItem', newVal);
});

const filteredItems = computed(() => {
    if (filterText.value === '') {
        return props.items;
    }
    return props.items.filter(item =>
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

const onSelectItem = (item: any) => {
    selectedItem.value = item;
    emit('update:selectedItem', item);
};

const resetIndex = () => {
    currentPage.value = 1;
};
selectedItem.value = props.items[0];
const emit = defineEmits(['update:selectedItem'])
</script>

<template>
    <div class="relative w-full  items-center">
    <Input type="text" :placeholder="searchPlaceholder" class="pl-10  h-12 text-lg"  v-bind="attrs"  v-model="filterText" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
    </span>
  </div>

    <div class="h-[50vh] space-y-2 overflow-y-scroll scroll-bar-none">
        <button @click="onSelectItem(item)" type="button"
            :class="['bg-gray-200 w-full h-[8vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm hover:bg-green-300 hover:text-gray-900', selectedItem && selectedItem.Id === item.Id ? 'bg-green-300' : '']"
            v-for="item in paginatedItems" :key="item.Id">
            <span>{{ item.Name }}</span>
        </button>
    </div>

    <div class="w-full flex justify-end" v-if="(currentPage * itemsPerPage) <= filteredItems.length">
        <button @click="loadMoreItems" type="button" class="btn-secondary">
            voir d'autres ?
        </button>
    </div>

    <div class="w-full flex justify-end" v-if="(currentPage * itemsPerPage) >= filteredItems.length">
        <button @click="resetIndex()" type="button" class="btn-secondary">
            retour à la premiére liste
        </button>
    </div>
</template>