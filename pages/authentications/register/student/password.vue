<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[20rem] xl:w-[20rem] 2xl:w-[20rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2">
                <h1 class="text-center text-2xl text-gray-600 poppins-bold py-2">{{$t('register_enter_password')}}</h1>
                <UForm :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup :label="$t(`auth_password`)" name="password">
                       
                        <UInput size="lg" class="relative" v-model="state.password" :type="showPasswords? 'password': 'text'"  :placeholder="$t(`auth_password_label`)"> 
                             <UButton v-if="showPasswords" @click="togglePassword()"
                                    tab-index="-1"
                                    icon="i-heroicons-eye"
                                    size="sm"
                                    color="primary"
                                    square
                                    variant="soft"
                                    class="absolute top-0 right-0 mt-1 mr-1"
                                />
                                <UButton v-if="!showPasswords" @click="togglePassword()"
                                    tab-index="-1"
                                    icon="i-heroicons-eye-slash"
                                    size="sm"
                                    color="primary"
                                    square
                                    variant="soft"
                                    class="absolute top-0 right-0 mt-1 mr-1"
                                />
                        </UInput>
                    </UFormGroup>
                    <UFormGroup :label="$t(`auth_password_confirmation`)" name="password-confirm">
                     <UInput size="lg" v-model="state.passwordConfirm" :type="showPasswords? 'password': 'text'"  :placeholder="$t(`auth_password_confirmation_label`)">
                        <UButton v-if="showPasswords" @click="togglePassword()"
                                    icon="i-heroicons-eye"
                                    size="sm"
                                    color="primary"
                                    square
                                    variant="soft"
                                    class="absolute top-0 right-0 mt-1 mr-1"
                                />
                                <UButton v-if="!showPasswords" @click="togglePassword()"
                                    icon="i-heroicons-eye-slash"
                                    size="sm"
                                    color="primary"
                                    square
                                    variant="soft"
                                    class="absolute top-0 right-0 mt-1 mr-1"
                                />
                    </UInput>
                    </UFormGroup>

                   <div class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
                    <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
                        {{$t(`continue`)}}
                    </UButton>
                   </div>
                    
                </UForm>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">

import { useValidation } from '~/composables/validations';
import { LocalStorageSetItem } from '~/scripts/local-storage';


const validation = useValidation();
const loadingStore = useLoadingStore();
const toast = useToast();
let showPasswords = ref(false);
function togglePassword(){
    showPasswords.value = ! showPasswords.value;
}
function login() {
    GqlLogin({ email: "parent1@email.com", password: 'parent' }).then(response => {
        LocalStorageSetItem("AuthTkn", response.Login?.T);
        toast.add(
            {
                id: "1",
                title: 'Connexion',
                description: 'Connecte avec succes!',
                icon: "i-heroicons-check-badge",

            }
        )
    });
}

const state = reactive({
    password: undefined, 
    passwordConfirm: undefined
})

async function onSubmit() {
    if (!validation.checkPasswords(state.password, state.passwordConfirm)) {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'Veillez vérifiez votre mots de passe!',
                icon: "i-heroicons-check-badge",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
        return;
    }
    loadingStore.show();
    setTimeout(() => {
        loadingStore.hide();
        navigateTo("/authentications/register/student/about");
    }, 500);

}
</script>
