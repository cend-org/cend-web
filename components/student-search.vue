<!-- <script setup lang="ts">
const validation  = useValidation();
const selectionSingleStore = useSelectionSingleStore();
let items = ref([] as Array<any>);


const filterStudent = ref('');
const itemsPerPage = ref(6);
const currentPage = ref(1);
const loadingStore = useLoadingStore();
const toast = useToast();
const inputValue = ref('');
let filteredItems = ref([] as Array<any>);
let typing = ref(false);
const timeoutId = ref<number | null>(null);
  const message = ref('');


const onInputStoppedTyping = () => {
  message.value = 'User stopped typing for 2 seconds';
  if(!filterStudent.value) return;
  loadingStore.show();
  GqlProfessorStudent({ name: filterStudent.value }).then(response => {
      items.value =  response.ProfessorStudent as Array<any>;
        filterItems();
      loadingStore.hide();
       // navigateTo("/authentications/register/tutor/photo");
    }, error => {
        loadingStore.hide();
        toast.add(
            {
                id: "1",
                title: 'Erreur!',
                description: 'Une erreur est survenue pendant l\'opérations!',
                icon: "i-heroicons-exclamation-triangle",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
    });
  // console.log(message.value);
  // console.log(filterStudent.value);
  // Add your custom function logic here
};


watch(filterStudent, (newValue) => {
  if (timeoutId.value !== null) {
    clearTimeout(timeoutId.value);
  }

  // Set a new timeout
  timeoutId.value = setTimeout(() => {
    onInputStoppedTyping();
  }, 2000) as unknown as number;
});













// const filteredItems = computed(() => {
//   //inputValue.value = filterStudent.value;
  
//   return items.value.filter(item =>
//     validation.normalizeString(item.Name).includes(validation.normalizeString(filterStudent.value))
//   );
// });

// watch(inputValue, (newValue, oldValue) => {
//   console.log('Input value changed from', oldValue, 'to', newValue);
//   // Add your logic here
// });


let paginatedItems = ref([] as Array<any>);
function filterItems(){
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  paginatedItems.value =  items.value.slice(start, end);
  console.log(paginatedItems);
}
// const paginatedItems = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage.value;
//   const end = start + itemsPerPage.value;
//   return filteredItems.value.slice(start, end);
// });

const loadMoreItems = () => {
  if ((currentPage.value * itemsPerPage.value) < filteredItems.value.length) {
    currentPage.value += 1;
  }
};

const onSelectItem = (item: any) => {
  selectionSingleStore.set(item);
};

const isSelected = (item: any) => {
  //return item.Id === selectionSingleStore.selectedItem.Id ? 'bg-green-200' : '';
};

watch(filterStudent, () => {
  currentPage.value = 1;
});

selectionSingleStore.selectedItem = paginatedItems.value[0];

const resetIndex = () =>{
  currentPage.value = 1;
}
</script> -->

<template>
  <UInput autocomplete="off" size="xl" v-model="filterStudent" name="filterStudent"
    :placeholder="$t('register_teacher_search_student_label')" icon="i-heroicons-magnifying-glass-20-solid"
    :ui="{ icon: { trailing: { pointer: '' } } }">
    <template #trailing>
      <UButton v-show="filterStudent !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
        :padded="false" @click="filterStudent = ''" />
    </template>
  </UInput>
  <div class="w-full flex justify-end">
    <UButton @click="continueWithoutStudent()" type="button" class="bg-light-green ring-0" size="xs" color="white"
      :label="$t('continue_without_student')" />
  </div>
  <div class="h-[55vh] space-y-2 overflow-y-scroll scroll-bar-none">
    <button @click="onSelectItem(item)" type="button"
      :class="['bg-gray-200 w-full h-[8.1vh] text-left pl-3 poppins-bold text-lg lg:text-sm xl:text-sm 2xl:text-sm', isSelected(item)]"
      v-for="item in paginatedItems">
      <span>{{ item.Name }}</span>
    </button>
    <div v-if="paginatedItems.length <= 0"
      class="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-center flex-col gap-2">
      <img src="/image/empty-list.svg" alt="">
      <div>{{ $t('list_empty') }} <br> {{ $t('start_search_your_student') }}.</div>
    </div>
  </div>
  <div class="w-full flex justify-end" v-if="(currentPage * itemsPerPage) <= filteredItems.length">
    <UButton class="" size="xs" color="white" :label="$t('register_see_more')" @click="loadMoreItems" />
  </div>
  <div class="w-full flex justify-end" v-if="(currentPage * itemsPerPage) >= filteredItems.length">
    <UButton class="" size="xs" color="white" :label="$t('register_to_first_list')" @click="resetIndex()" />
  </div>
</template>


<script setup lang="ts">
import { ref, watch, computed } from 'vue';


const validation = useValidation();
const selectionstudentStore = useSelectionStudentStore();
const items = ref<Array<any>>([]);
const filterStudent = ref('');
const itemsPerPage = ref(6);
const currentPage = ref(1);
const loadingStore = useLoadingStore();
const toast = useToast();
const timeoutId = ref<number | null>(null);
const message = ref('');
const filteredItems = computed(() => {
  return items.value.filter(item =>
    validation.normalizeString(item.Name).includes(validation.normalizeString(filterStudent.value))
  );
});
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredItems.value.slice(start, end);
});

const onInputStoppedTyping = () => {
  message.value = 'User stopped typing for 2 seconds';
  if (!filterStudent.value) return;
  loadingStore.show();
  GqlProfessorStudent({ name: filterStudent.value }).then(response => {
    items.value = response.ProfessorStudent as Array<any>;
    loadingStore.hide();
  }).catch(error => {
    loadingStore.hide();
    toast.add({
      id: "1",
      title: 'Erreur!',
      description: 'Une erreur est survenue pendant l\'opérations!',
      icon: "i-heroicons-exclamation-triangle",
      color: "red",
      ui: {
        background: "bg-red-100"
      }
    });
  });
};

watch(filterStudent, (newValue) => {
  if (timeoutId.value !== null) {
    clearTimeout(timeoutId.value);
  }

  timeoutId.value = setTimeout(() => {
    onInputStoppedTyping();
  }, 2000) as unknown as number;
  //currentPage.value = 1; // Reset page index on filter change
});

const loadMoreItems = () => {
  if ((currentPage.value * itemsPerPage.value) < filteredItems.value.length) {
    currentPage.value += 1;
  }
};

const onSelectItem = (item: any) => {
  selectionstudentStore.set(item);
};

const isSelected = (item: any) => {
  return item.Id === selectionstudentStore.selectedItem?.Id ? 'bg-green-200' : '';
};

const resetIndex = () => {
  currentPage.value = 1;
};
function continueWithoutStudent() {
  loadingStore.show();
  setTimeout(() => {
    navigateTo("/authentications/register/teacher/verification-without-student");
  }, 500);
}
// Initial selection (optional)
// watch(paginatedItems, (newItems) => {
//   if (newItems.length > 0) {
//     selectionstudentStore.selectedItem = newItems[0];
//   }
// }, { immediate: true });
</script>

<style scoped>
/* Add your styles here */
</style>
