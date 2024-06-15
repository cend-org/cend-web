<script setup lang="ts">

import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toast } from '~/components/ui/toast/use-toast'

const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();
loadingStore.hide();

const formSchema = toTypedSchema(z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
}));

const { isFieldDirty, handleSubmit, values } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit( async (values) => {
  loadingStore.show();
  try{
    await usr.createStudent(values.firstname, values.lastname)
    registration.next()
  }catch(e){
    loadingStore.hide();
    toast({
      title: 'You submitted the following values:',
      description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
    })
  }
});

</script>
<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="firstname" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Nom</FormLabel>
        <FormControl v-bind="componentField">
          <CommonFormInput type="text" placeholder="nom de votre jeûne" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="lastname" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Prenom</FormLabel>
        <FormControl v-bind="componentField">
          <CommonFormInput type="text" placeholder="Prenoms de votre jeûne" />
        </FormControl>
      </FormItem>
    </FormField>
    <CommonFormSubmit  position="bottom"/>
  </form>
</template>
