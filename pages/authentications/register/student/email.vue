<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[20rem] xl:w-[20rem] 2xl:w-[20rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2">
                <h1 class="text-center text-2xl text-gray-600 poppins-bold py-2">{{$t('register_student_header_email_or_phone')}}</h1>
                <UForm :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup :label="$t(`auth_email`)" name="email">
                        <UInput class="" size="lg" v-model="state.email" :placeholder="$t(`auth_your_email`)" />
                    </UFormGroup>

                    <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
                        {{$t(`continue`)}}
                    </UButton>
                </UForm>
            </form>
            <UDivider orientation="vertical">
                <span class="text-gray-500"> {{$t(`register_or`)}}</span>
            </UDivider>
            <div class="flex flex-col gap-3">
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-200  cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">
                    <img class="absolute ml-4" src="/image/google.svg" alt="Image" width="20"></img>
                    <div class="w-full text-gray-600 text-center">{{$t('register_continue_with_google')}}</div>
                </UButton>
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-200   cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">
                    <img class="absolute ml-4" src="/image/apple.svg" alt="Image" width="20"></img>
                    <div class="w-full text-gray-600 text-center">{{$t('register_continue_with_apple')}}</div>
                </UButton>
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-200   cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">
                    <img class="absolute ml-4" src="/image/fb.svg" alt="Image" width="20"></img>
                    <div class="w-full text-gray-600 text-center">{{$t('register_continue_with_facebook')}}</div>
                </UButton>
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-400 text-gray-900  cursor-pointer bg-green-200 flex justify-content-between border-none border-round-md align-items-center w-full h-3rem">
                    <UIcon class="text-2xl" name="i-heroicons-qr-code ml-4"></UIcon>
                    <div class="w-full text-xs text-center">
                        {{$t('register_continue_with_qrcode')}}
                        
                    </div>
                </UButton>
            </div>
            <div class="text-[12px] text-gray-400 text-center mt-2">
                {{$t('register_accept_policies')}}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { useValidation } from '~/composables/validations';

const validation = useValidation();
const toast = useToast();
const loadingStore = useLoadingStore();
function login() {
    // GqlLogin({ email: "parent1@email.com", password: 'parent' }).then(response => {
    //     LocalStorageSetItem("AuthTkn", response.Login?.T);
    //     //  useIsAuthenticated(true);
    //     toast.add(
    //         {
    //             id: "1",
    //             title: 'Connexion',
    //             description: 'Connecte avec succes!',
    //             icon: "i-heroicons-check-badge",

    //         }
    //     )
    // });
}

const state = reactive({
    email: undefined,
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
    setTimeout(() => {
        loadingStore.hide();
        navigateTo("/authentications/register/student/password");
    }, 500);
}
</script>
