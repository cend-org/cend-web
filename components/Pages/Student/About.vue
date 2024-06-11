<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toast } from '~/components/ui/toast/use-toast'
import { langueComponent, sexComponent } from '~/constants/constants';

const registration = registrationStore()

const loadingStore = useLoadingStore();
loadingStore.hide();
const store = authenticationStore()
const birthDate = ref(null as any);

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
    registration.next()
  }catch(e){
    loadingStore.hide();
    toast({
      title: 'You submitted the following values:',
      description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
    })
  }
})
</script>

<template>
  <LayoutAuthentication :title="$t('register_fill_about')">
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
            <CommonFormSelect placeholder="Choisissez votre sexe" :items="sexComponent" :componentField="componentField"/>
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lang" :validate-on-blur="!isFieldDirty">
        <FormItem  class="w-full">
          <FormLabel>Langue</FormLabel>
          <FormControl v-bind="componentField">
            <CommonFormSelect placeholder="Choisissez votre langue" :items="langueComponent" :componentField="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
      <CommonFormSubmit position="absolute" />
    </form>
  </LayoutAuthentication>
</template>
