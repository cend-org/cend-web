<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
import { MagnifyingGlassIcon } from '@radix-icons/vue';
import { Input } from '@/components/ui/input';

const usr = userStore();
const transform = trasnformStore();
const props = defineProps({
    searchPlaceholder: {
        required: true,
        type: String
    }, 
    selectedStudent: {
        type: Object,
        default: null,
    },
});
const filterStudent = ref('');
const attrs = useAttrs();
const itemsPerPage = ref(5);
const currentPage = ref(1);
const loadingStore = useLoadingStore();
const timeoutId = ref<number | null>(null);
const items = ref<Array<any>>([]);
let selectedStudent = ref({} as any);


watch(filterStudent, (newValue) => {
  if (timeoutId.value !== null) {
    clearTimeout(timeoutId.value);
  }

  timeoutId.value = setTimeout(() => {
    onInputStoppedTyping();
  }, 2000) as unknown as number;
});

const  onInputStoppedTyping = async() => {
  if (!filterStudent.value) return;
  loadingStore.show();
  await usr.searchStudent(filterStudent.value).then(response=>{
    items.value = response as Array<any>;
    loadingStore.hide();

  });
};

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
  selectedStudent.value = item;
  emit('update:selectedStudent', item);
};

const isSelected = (item: any) => {
   
  return item.Id === selectedStudent.value?.Id ? 'bg-[#3A9B23] text-white' : 'bg-gray-200';
};

const resetIndex = () => {
  currentPage.value = 1;
};

const filteredItems = computed(() => {
  return items.value.filter(item =>
  transform.normalizeString(item.Name).includes(transform.normalizeString(filterStudent.value))
  );
});

const continueWithoutStudent = () => {
  loadingStore.show();
  setTimeout(() => {
    registrationStore().next();
  }, 500);
}
const emit = defineEmits(['update:selectedStudent']);

</script>

<template>
  <div class="relative w-full  items-center">
    <Input type="text" :placeholder="searchPlaceholder" class="pl-10  h-10 text-lg"  v-bind="attrs"  v-model="filterStudent" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
    </span>
  </div>
  <div class="w-full flex justify-end">
    <Button @click="continueWithoutStudent()" type="button" class="bg-light-green ring-0 text-gray-900" size="xs" color="white"
       >Continuer sans votre etudiant ?</Button>
  </div>
  <div class="h-[50vh] space-y-2 overflow-y-scroll scroll-bar-none">
    <button @click="onSelectItem(item)" type="button"
      :class="['w-full h-[8.1vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm', isSelected(item)]"
      v-for="item in paginatedItems">
      <span>{{ item.Name }} {{ item.FamilyName }}</span>
    </button>
    
    <div class="w-full flex justify-end" v-if="(currentPage * itemsPerPage) < filteredItems.length && paginatedItems.length > 0">
        <button @click="loadMoreItems" type="button" class="btn-secondary">
           voir d'autres ?
        </button>
    </div>

    <div  class="w-full flex justify-end" v-if="(currentPage * itemsPerPage) >= filteredItems.length && currentPage > 1">
        <button @click="resetIndex()" type="button" class="btn-secondary">
           retour à la premiére liste
        </button>
    </div>

    <div v-if="paginatedItems.length <= 0"
      class="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-center flex-col gap-2">
      <img src="/image/empty-list.svg" alt="">
      <div>la liste est vide <br> Commencez a cherchez votre etudiant.</div>
    </div>

  </div>
</template>
