<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">
                    {{ $t('register_student_header_email_or_phone') }}</h1>
                <UForm :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup :label="$t(`auth_email`)" name="email">
                        <UInput autocomplete="off" class="" size="lg" v-model="state.email"
                            :placeholder="$t(`auth_your_email`)" />
                    </UFormGroup>

                    <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
                        {{ $t(`continue`) }}
                    </UButton>
                </UForm>
            </form>
            <UDivider orientation="vertical" size="xs" :label="$t(`register_or`)" class="text-gray-500"></UDivider>
            <div class="flex flex-col gap-3">
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-200  cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">
                    <img class="absolute ml-4" src="/image/google.svg" alt="Image" width="20"></img>
                    <div class="w-full text-gray-400 text-center">{{ $t('register_continue_with_google') }}</div>
                </UButton>
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-200   cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">
                    <img class="absolute ml-4" src="/image/apple.svg" alt="Image" width="20"></img>
                    <div class="w-full text-gray-400 text-center">{{ $t('register_continue_with_apple') }}</div>
                </UButton>
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-200   cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">
                    <img class="absolute ml-4" src="/image/fb.svg" alt="Image" width="20"></img>
                    <div class="w-full text-gray-400 text-center">{{ $t('register_continue_with_facebook') }}</div>
                </UButton>
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-400 text-gray-900  cursor-pointer bg-green-200 flex justify-content-between border-none border-round-md align-items-center w-full h-3rem">
                    <UIcon class="text-2xl" name="i-heroicons-qr-code ml-4"></UIcon>
                    <div class="w-full text-md text-center text-gray-400">
                        {{ $t('register_continue_with_qrcode') }}

                    </div>
                </UButton>
            </div>
            <div class="text-[12px] text-gray-400 text-center mt-2">
                {{ $t('register_accept_policies') }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { useValidation } from '~/composables/validations';
import { environment } from '~/scripts/environment';
import { LocalStorageSetItem } from '~/scripts/local-storage';

const validation = useValidation();
const toast = useToast();
const loadingStore = useLoadingStore();

onBeforeMount(async () => {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated()) {
        navigateTo('/dashboard/landing');
    }

});



const state = reactive({
    email: '',
})

async function onSubmit() {

    if (!validation.checkEmail(state.email)) {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'Veillez vérifiez votre email!',
                icon: "i-heroicons-check-badge",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
        return;
    };
    loadingStore.show();
    GqlNewStudent({ email: state.email }).then(response => {
        LocalStorageSetItem(environment.auth_token, response.NewStudent?.T);
        navigateTo("/authentications/register/student/password");
    }, error => {
        loadingStore.hide();
        toast.add(
            {
                id: "1",
                title: 'Erreur!',
                description: 'Une erreur est survenue pendant l\'opérations!',
                icon: "i-heroicons-exclamation-triangle",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
    });
}

</script>
