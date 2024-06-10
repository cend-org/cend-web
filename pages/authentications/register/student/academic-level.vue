<template>
  <LayoutAuthentication :title="$t('register_academic_level')">
    <form class="space-y-4" @submit="onSubmit">
      <div class="flex flex-row gap-2 w-full">
        <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
        <FormItem  class="w-full">
          <FormControl v-bind="componentField">
            <CommonFormSingleSelect searchPlaceholder="Filtre niveau scolaire..."  :items="academicLevelList"/>
          </FormControl>
        </FormItem>
      </FormField>
      </div>
      <CommonFormSubmit />
    </form>
  </LayoutAuthentication>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toast } from '@/components/ui/toast/use-toast'
import { academicStore } from '~/stores/academic.store';
const loadingStore = useLoadingStore();
loadingStore.hide();
const store =  authenticationStore();
const _academicStore = academicStore();

// const academicLevelList = (async ()=>{
//     return await  _academicStore.getAcademicLevels();
// });
const academicLevelList = await _academicStore.getAcademicLevels() as Array<any>;



const formSchema = toTypedSchema(z.object({
  name: z.string().min(1),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit( async (values) => {
  loadingStore.show();
  try{
   // await store.updateProfile(values.name, values.familyname, values.sex, values.lang, new Date().toDateString());
    //navigateTo("/authentications/register/student/academic-level");
  }catch(e){
    toast({
      title: 'You submitted the following values:',
      description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
    })
  }
  loadingStore.hide();
})

// // async function onSubmit() {
// //     loadingStore.show();
// //     GqlSetUserAcademicLevel({ academicLevelId: parseInt(selectionSingleStore.selectedItem.Id) }).then(response => {
// //         LocalStorageSetItem(environment.student_selected_academic_level, `${selectionSingleStore.selectedItem.Name}`);
// //         getAcademicCourses();
// //     }, error => {
// //         loadingStore.hide();
// //         toast.add(
// //             {
// //                 id: "1",
// //                 title: 'Erreur!',
// //                 description: 'Une erreur est survenue pendant l\'opérations!',
// //                 icon: "i-heroicons-exclamation-triangle",
// //                 color: "red",
// //                 ui: {
// //                     background: "bg-red-100"
// //                 }
// //             }
// //         )
// //     });

// //     function getAcademicCourses() {
// //         GqlAcademicCourses({ academicLevelId: parseInt(selectionSingleStore.selectedItem.Id) }).then(response => {
// //             selectionMultipleStore.list = response.AcademicCourses as Array<never>;
// //             navigateTo("/authentications/register/student/academic-course");

// //         }, error => {
// //             loadingStore.hide();
// //             toast.add(
// //                 {
// //                     id: "1",
// //                     title: 'Erreur!',
// //                     description: 'Une erreur est survenue pendant l\'opérations!',
// //                     icon: "i-heroicons-exclamation-triangle",
// //                     color: "red",
// //                     ui: {
// //                         background: "bg-red-100"
// //                     }
// //                 }
// //             )
// //         });
// //     }
// }
</script>
