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
  password: z.string().min(5),
  passwordConfirm: z.string().min(5),
}));

const { isFieldDirty, handleSubmit, values } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit( async (values) => {
  loadingStore.show();
  try{
    await usr.createPassword(values.password)
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
    <div v-if="values.password !== values.passwordConfirm" class="text-red-700 py-5">
      <Alert>
        <AlertTitle class="font-bold text-red-500">Attention !</AlertTitle>
        <AlertDescription>
          Les deux mots de passes ne se concordent pas !
        </AlertDescription>
      </Alert>
    </div>
    <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Mots de passe</FormLabel>
        <FormControl v-bind="componentField">
          <CommonFormInput type="password" placeholder="Votre mot de passe" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="passwordConfirm" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Confirmez votre mot de passe</FormLabel>
        <FormControl v-bind="componentField">
          <CommonFormInput type="password" placeholder="Confirmation de votre mots de passe" />
        </FormControl>
      </FormItem>
    </FormField>
    <CommonFormSubmit  position="bottom"/>
  </form>
</template>
