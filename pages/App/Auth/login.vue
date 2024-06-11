<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";

const route = useRoute();

let personType = ref('student');

onUpdated(async () => {
  if (route.query.label) {
    personType.value = route.query.label as string;
  }
});

const authentication = authenticationStore()
const loadingStore = useLoadingStore();
loadingStore.hide();

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
    navigateTo("/authentications/register/student/password")
  }catch(e) {
    console.log(e)
    loadingStore.hide()
  }
})
</script>
<template>
  <LayoutAuthentication :title="'Veuillez-vous connecter à votre compte ' + $t(`${personType}`).toLowerCase()">
    <form class="space-y-6" @submit="onSubmit">
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
          <FormLabel>Email</FormLabel>
          <FormControl v-bind="componentField">
            <CommonFormInput type="password" placeholder="Votre mot de passe" />
          </FormControl>
        </FormItem>
      </FormField>
      <CommonFormSubmit/>
    </form>
    <UDivider orientation="vertical" size="xs" :label="$t(`register_or`)" class="text-gray-500"></UDivider>
    <CommonAuth />
  </LayoutAuthentication>
</template>
