<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";

definePageMeta({
  layout: 'onboarding'
})

const { apply } = useRTGuard()

watchEffect(() => {
  apply()
})


const usr = userStore()

const authentication = authenticationStore()
const loadingStore = useLoadingStore();
loadingStore.hide();
let error = ref(false)
const formSchema = toTypedSchema(z.object({
  email: z.string().email('*').min(5),
  password: z.string().min(4)
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit( async (values) => {
  loadingStore.show();
  try {
    await authentication.login(values.email, values.password)
    navigateTo("/app/dashboard")
  }catch(e) {
    error.value = true
    console.log(e)
    loadingStore.hide()
  }
})

</script>
<template>
  <LayoutAuthentication :title="'Veuillez-vous connecter à votre compte ' + usr.type">
    <form class="space-y-6" @submit="onSubmit">
      <div class="text-red-700 py-1" v-if="error">
      <Alert>
        <AlertTitle class="font-bold text-red-500">Attention !</AlertTitle>
        <AlertDescription>
         Login ou mots de passe invalide !
        </AlertDescription>
      </Alert>
    </div>
      <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl v-bind="componentField">
            <CommonFormInput type="email" placeholder="Votre email" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormLabel>Mot de passe</FormLabel>
          <FormControl v-bind="componentField">
            <CommonFormInput type="password" placeholder="Votre mot de passe" />
          </FormControl>
        </FormItem>
      </FormField>
      <CommonFormSubmit/>
    </form>
    <Separator class="my-5" />
    <CommonAuth />
  </LayoutAuthentication>
</template>
