<script setup lang="ts">
import {  ref, computed, watch } from 'vue';
import { MagnifyingGlassIcon } from '@radix-icons/vue';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-vue-next';

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
        type: Array<any>,
        default: () => []
    }
});

const attrs = useAttrs();
const transform = trasnformStore();
const filterText = ref('');
const itemsPerPage = ref(5);
const currentPage = ref(1);


let selectedItem = ref([] as Array<any>);
const emit = defineEmits(['update:selectedItem']);

watch(selectedItem, (newVal) => {
    emit('update:selectedItem', newVal);
});

const filteredItems = computed(() => {
    if (!filterText.value.trim()) {
        return props.items;
    }
    return props.items.filter(item =>
        transform.normalizeString(item.Name.toLowerCase()).includes(transform.normalizeString(filterText.value.toLowerCase()))
    );
});

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    let paginated = filteredItems.value.slice(start, end);
    return paginated;
});

const toggleSelectItem = (item: any) => {
    const index = selectedItem.value.findIndex(selectedItem => selectedItem?.Id === item.Id);
    if (index === -1) {
        selectedItem.value.push(item);

    } else {
        selectedItem.value.splice(index, 1);
    };
    emit('update:selectedItem', selectedItem);

};

const loadMoreItems = () => {
    if ((currentPage.value * itemsPerPage.value) < filteredItems.value.length) {
        currentPage.value += 1;
    }
};

const resetIndex = () => {
    currentPage.value = 1;
};
const isSelected = (item: any) => {
   
     return selectedItem.value.some(selectedItem => selectedItem?.Id === item.Id) ? 'bg-[#3A9B23] text-white' : 'bg-gray-200';
};

watch(paginatedItems, (newVal) => {
    if(selectedItem.value.length <= 0){
        selectedItem.value.push(newVal[0]);
        emit('update:selectedItem', selectedItem);
    }
});

</script>

<template>
    <div class="relative w-full items-center">
        <Input type="text" :placeholder="searchPlaceholder" class="pl-10 h-12 text-lg" v-model="filterText" v-bind=attrs />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
        </span>
    </div>
    

    <div class="h-[50vh] space-y-2 overflow-y-scroll scroll-bar-none">
        <div class="h-full w-full" v-if="props.items && props.items.length <= 0">
           <div class="w-full h-full flex flex-row gap-2 flex justify-center items-center">
                <LoaderCircle class="animate-spin"></LoaderCircle>
                chargement...
           </div>
        </div>
        <button v-else type="button" @click="toggleSelectItem(item)"
            :class="['w-full h-[8vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm', isSelected(item)]"
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
