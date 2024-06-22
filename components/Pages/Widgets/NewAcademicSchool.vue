<template>
  <form class="space-y-6" @submit="onSubmit">
    <CommonTemplateSelectionSingle v-model:selectedItem="selectedSchoolLevel" :items="schoolList"
      searchPlaceholder="Filtre niveau scolaire" />
    <CommonFormSubmit  position="bottom"/>
  </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toast } from '~/components/ui/toast';



const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();
let selectedSchoolLevel = ref( null as any);

let schoolList = ref([]);
usr.getAcademicLevels().then(resp => {
  schoolList.value = resp as Array<never>;
})
loadingStore.hide();

const { isFieldDirty, handleSubmit, values } = useForm({
  validationSchema: null,
})


const onSubmit = handleSubmit(async (values) => {
  if (selectedSchoolLevel != null) {
    loadingStore.show();
    try {
      await usr.setAcademicLevel(selectedSchoolLevel.value.Id, selectedSchoolLevel.value);
      registration.next()
    } catch (e) {
      loadingStore.hide();
      toast({
        title: 'You submitted the following values:',
        description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
      })
    }
  };

})
</script>