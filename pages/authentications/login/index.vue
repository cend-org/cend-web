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

<!--    <div class="w-full flex justify-center mt-6">-->
<!--        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">-->
<!--            <form action="" class="w-full flex flex-col gap-2 pt-3">-->
<!--                <h1 v-if="locale != 'en'" class="text-xl text-gray-600 poppins-bold py-2">Veuillez-vous-->
<!--                    connecter à votre compte {{ $t(`${personType}`).toLowerCase() }}</h1>-->
<!--                <h1 v-if="locale == 'en'" class="text-center text-xl text-gray-600 poppins-bold py-2">Please log in to-->
<!--                    your {{ $t(`${personType}`).toLowerCase() }} account</h1>-->
<!--                <UForm :state="state" class="space-y-4" @submit="onSubmit">-->
<!--                    <UFormGroup label="Email" name="email">-->
<!--                        <UInput autocomplete="off" class="" size="lg" v-model="state.email" name="email"-->
<!--                            :placeholder="$t('login_email_label')" />-->
<!--                    </UFormGroup>-->
<!--                    <UFormGroup :label="$t('login_password')" name="password">-->
<!--                        <UInput autocomplete="off" size="lg" v-model="state.password"-->
<!--                            :type="showPasswords ? 'password' : 'text'"-->
<!--                            :placeholder="$t(`auth_password_confirmation_label`)">-->
<!--                            <UButton tabindex="-1" v-if="showPasswords" @click="togglePassword()" icon="i-heroicons-eye"-->
<!--                                size="sm" color="primary" square variant="soft"-->
<!--                                class="absolute top-0 right-0 mt-1 mr-1" />-->
<!--                            <UButton tabindex="-1" v-if="!showPasswords" @click="togglePassword()"-->
<!--                                icon="i-heroicons-eye-slash" size="sm" color="primary" square variant="soft"-->
<!--                                class="absolute top-0 right-0 mt-1 mr-1" />-->
<!--                        </UInput>-->
<!--                    </UFormGroup>-->

<!--                    <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>-->
<!--                        {{ $t(`connexion`) }}-->
<!--                    </UButton>-->
<!--                </UForm>-->
<!--            </form>-->
<!--            <UDivider orientation="vertical" size="xs" :label="$t(`register_or`)" class="text-gray-500"></UDivider>-->
<!--            <div class="flex flex-col gap-3">-->
<!--                <UButton size="lg" type="button"-->
<!--                    class="hover:bg-green-100 hover:border-2 hover:border-green-200  cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">-->
<!--                    <img class="absolute ml-4" src="/image/google.svg" alt="Image" width="20"></img>-->
<!--                    <div class="w-full text-gray-400 text-center">{{ $t('register_continue_with_google') }}</div>-->
<!--                </UButton>-->
<!--                <UButton size="lg" type="button"-->
<!--                    class="hover:bg-green-100 hover:border-2 hover:border-green-200   cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">-->
<!--                    <img class="absolute ml-4" src="/image/apple.svg" alt="Image" width="20"></img>-->
<!--                    <div class="w-full text-gray-400 text-center">{{ $t('register_continue_with_apple') }}</div>-->
<!--                </UButton>-->
<!--                <UButton size="lg" type="button"-->
<!--                    class="hover:bg-green-100 hover:border-2 hover:border-green-200   cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">-->
<!--                    <img class="absolute ml-4" src="/image/fb.svg" alt="Image" width="20"></img>-->
<!--                    <div class="w-full text-gray-400 text-center">{{ $t('register_continue_with_facebook') }}</div>-->
<!--                </UButton>-->
<!--                <UButton size="lg" type="button"-->
<!--                    class="hover:bg-green-100 hover:border-2 hover:border-green-400 text-gray-900  cursor-pointer bg-green-200 flex justify-content-between border-none border-round-md align-items-center w-full h-3rem">-->
<!--                    <UIcon class="text-2xl" name="i-heroicons-qr-code ml-4"></UIcon>-->
<!--                    <div class="w-full text-md text-center text-gray-400">-->
<!--                        {{ $t('register_continue_with_qrcode') }}-->
<!--                    </div>-->
<!--                </UButton>-->
<!--            </div>-->
<!--            <div class="text-[12px] text-gray-400 text-center mt-2">-->
<!--                {{ $t('register_accept_policies') }}-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>
