<template>
  <LayoutAuthentication :title="$t('register_fill_about')">
    <!-- <form action="" class="w-full flex flex-col gap-2 pt-3">
      <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <div class="flex flex-row gap-2">
          <UFormGroup :label="$t('register_name')" name="nom">
            <UInput autocomplete="off" size="lg" v-model="state.name" type="text"
                    :placeholder="$t('register_name_label')" />
          </UFormGroup>

          <UFormGroup :label="$t('register_familyname')" name="prenom">
            <UInput autocomplete="off" size="lg" v-model="state.familyName" type="text"
                    :placeholder="$t('register_familyname_label')" />
          </UFormGroup>
        </div>

        <UFormGroup :label="$t('register_birthdate')" name="date-of-birth">
          <UInput autocomplete="off" @click="focusBirthDate()" size="lg" v-model="state.birthDate"
                  type="text" :placeholder="$t('register_birthdate_label')" />
          <calendar />
        </UFormGroup>

        <UFormGroup :label="$t('register_gender')" name="sex">
          <sex />
        </UFormGroup>


        <UFormGroup label="Choisissez votre langue" name="lang">
          <lang />
        </UFormGroup>

        <div
            class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
          <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
            {{ $t(`continue`) }}
          </UButton>
        </div>
      </UForm>
    </form> -->

    <form class="space-y-4" @submit="onSubmit">
      
      <div class="flex flex-row gap-2 w-full">        
        <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
        <FormItem  class="w-full">
          <FormLabel>Nom</FormLabel>
          <FormControl v-bind="componentField">
            <CommonFormInput type="text" placeholder="Votre nom" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="familyname" :validate-on-blur="!isFieldDirty">
        <FormItem  class="w-full">
          <FormLabel>Prénom</FormLabel>
          <FormControl v-bind="componentField">
            <CommonFormInput type="text" placeholder="Votre Prénom" />
          </FormControl>
        </FormItem>
      </FormField>
      </div>

      <FormField v-slot="{ componentField }" name="birthDate" :validate-on-blur="!isFieldDirty">
        <FormItem  class="w-full">
          <FormLabel>Date de naissance</FormLabel>
          <FormControl v-bind="componentField">
            <CommonFormDate placeholder="Choisissez votre date de naissance" v-model:value="birthDate"  :componentField="componentField" type="date-time"/>
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="sex" :validate-on-blur="!isFieldDirty">
        <FormItem  class="w-full">
          <FormLabel>Sexe</FormLabel>
          <FormControl v-bind="componentField">
            <CommonFormSelect placeholder="Choisissez votre sexe" :items="sexList" :componentField="componentField"/>
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lang" :validate-on-blur="!isFieldDirty">
        <FormItem  class="w-full">
          <FormLabel>Langue</FormLabel>
          <FormControl v-bind="componentField">
            <CommonFormSelect placeholder="Choisissez votre langue" :items="langList" :componentField="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
      <CommonFormSubmit position="absolute" />
    </form>
  </LayoutAuthentication>
</template>
<style>
.mobile-sex-dropdown div:nth-of-type(2) {
    width: 88%;
}

.desktop-sex-dropdown div:nth-of-type(2) {
    width: 20%;
    margin-left: 3px !important;
}
</style>
<script setup lang="ts">

import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import Calendar from '~/components/calendar.vue';
import { environment } from '~/scripts/environment';
import { LocalStorageGetItem } from '~/scripts/local-storage';
import { toast } from '~/components/ui/toast/use-toast'
import { langueComponent, sexComponent } from '~/constants/constants';

const registration = registrationStore()


const sexList: Array<any> = sexComponent;
const langList: Array<any> = langueComponent;

const loadingStore = useLoadingStore();
loadingStore.hide();
const calendar = useModal();
const calendarStore = useCalendarStore();
const registrationSexStore = useRegistrationSexStore();
const registrationLangStore = useRegistrationLangStore();
const selectionSingleStore = useSelectionSingleStore();
const store = authenticationStore()
const birthDate = ref(null as any);
const showAlert = ref(false);

const formSchema = toTypedSchema(z.object({
  name: z.string().min(1),
  familyname: z.string().min(1),
  sex: z.string().min(1),
  lang: z.string().min(1), 
  birthDate: z.string().min(1),
}))

const { isFieldDirty, setFieldValue,  handleSubmit } = useForm({
  validationSchema: formSchema,
});

watch(birthDate, (newVal) => {
  setFieldValue('birthDate', newVal.toString())
});

const onSubmit = handleSubmit( async (values) => {
  loadingStore.show();
  try{
    await store.updateProfile(values.name, values.familyname, values.sex, values.lang, values.birthDate);
    // navigateTo("/authentications/register/student/academic-level");
    registration.next()
  }catch(e){
    loadingStore.hide();
    toast({
      title: 'You submitted the following values:',
      description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
    })
  }
  
})














// const state = reactive({
//     name: '',
//     familyName: '',
//     birthDate: '',
// })

// async function onSubmit() {
//     if (!state.birthDate || !state.familyName || !state.name) {
//         toast.add(
//             {
//                 id: "1",
//                 title: 'Validation',
//                 description: 'Information incomplete!',
//                 icon: "i-heroicons-check-badge",
//                 color: "red",
//                 ui: {
//                     background: "bg-red-100"
//                 }
//             }
//         )
//         return;
//     }

//     if (typeof (registrationSexStore.sex.value) != 'number') {
//         toast.add(
//             {
//                 id: "1",
//                 title: 'Validation',
//                 description: 'Veillez ajouter votre sexe!',
//                 icon: "i-heroicons-check-badge",
//                 color: "red",
//                 ui: {
//                     background: "bg-red-100"
//                 }
//             }
//         )
//         return;
//     }
//     if (typeof (registrationLangStore.lang.value) != 'number') {
//         toast.add(
//             {
//                 id: "1",
//                 title: 'Validation',
//                 description: 'Veillez ajouter votre Langue!',
//                 icon: "i-heroicons-check-badge",
//                 color: "red",
//                 ui: {
//                     background: "bg-red-100"
//                 }
//             }
//         )
//         return;
//     }
//     loadingStore.show();

//     useGqlToken({
//         token: `${LocalStorageGetItem(environment.auth_token)}`,
//         config: {
//             type: 'Bearer',
//             name: 'Authorization'
//         }
//     });
//     GqlUpdateMyProfile({ profile: { Name: state.name, FamilyName: state.familyName, Lang: registrationLangStore.lang.value, Sex: registrationSexStore.sex.value } }).then(response => {
//         getAcademicLevels();
//     }, error => {
//         loadingStore.hide();
//         toast.add(
//             {
//                 id: "1",
//                 title: 'Erreur!',
//                 description: 'Une erreur est survenue pendant l\'opérations!',
//                 icon: "i-heroicons-exclamation-triangle",
//                 color: "red",
//                 ui: {
//                     background: "bg-red-100"
//                 }
//             }
//         )
//     });

// }
// function getAcademicLevels() {
//     GqlAcademicLevels().then(response => {
//         selectionSingleStore.list = response.AcademicLevels as Array<never>;
//         navigateTo('/authentications/register/student/academic-level');
//     }, error => {
//         loadingStore.hide();
//         toast.add(
//             {
//                 id: "1",
//                 title: 'Erreur!',
//                 description: 'Une erreur est survenue pendant l\'opérations!',
//                 icon: "i-heroicons-exclamation-triangle",
//                 color: "red",
//                 ui: {
//                     background: "bg-red-100"
//                 }
//             }
//         )
//     });
// }
// function focusBirthDate() {
//     calendar.open(Calendar, {
//         onClose() {
//             calendar.close();
//         },
//         onConfirm() {
//             state.birthDate = calendarStore.formatedDate;
//             calendar.close();
//         }
//     })
// }
</script>
