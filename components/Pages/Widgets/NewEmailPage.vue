<script setup lang="ts">

import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/components/ui/form'
import { toast } from '~/components/ui/toast/use-toast'
import {authenticationStore} from "~/stores/authentication.store";

const registration = registrationStore()

const loadingStore = useLoadingStore();
const store = authenticationStore();
const error = ref("");
loadingStore.hide();
const formSchema = toTypedSchema(z.object({
  mail: z.string().email('*').min(5),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit( async (values) => {
  loadingStore.show();
  try{
    await store.authenticate(values.mail)
    registration.next()
  }catch(e: any){
    alert(e.message);
    loadingStore.hide();
    //error.value = e.gqlErrors[0].message 
  }
})

</script>
<template>
  <form class="space-y-6" @submit="onSubmit">
    <div v-if="error.length > 0" class="text-red-700 py-5">
      <Alert>
        <AlertTitle class="font-bold text-red-500">Attention !</AlertTitle>
        <AlertDescription>
          {{ error }}
        </AlertDescription>
      </Alert>
    </div>
    <FormField v-slot="{ componentField }" name="mail" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl v-bind="componentField">
          <CommonFormInput type="email" placeholder="Votre email" />
        </FormControl>
      </FormItem>
    </FormField>
    <CommonFormSubmit />
  </form>
  <Separator class="my-5" />
  <CommonAuth />
</template>
