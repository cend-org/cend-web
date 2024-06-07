<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">{{ $t('register_enter_password') }}</h1>
                <UForm :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup :label="$t(`auth_password`)" name="password">

                        <UInput autocomplete="off" size="lg" v-model="state.password" @focus="onFocusPassword()"
                            @blur="onblurPassword()" name="password" :type="showPasswords ? 'password' : 'text'"
                            :placeholder="$t(`auth_password_label`)" class="z-[1]">
                            <UButton tabindex="-1" v-if="showPasswords" @click="togglePassword()" tab-index="-1"
                                icon="i-heroicons-eye" size="sm" color="primary" square variant="soft"
                                class="absolute top-0 right-0 mt-1 mr-1" />
                            <UButton tabindex="-1" v-if="!showPasswords" @click="togglePassword()" tab-index="-1"
                                icon="i-heroicons-eye-slash" size="sm" color="primary" square variant="soft"
                                class="absolute top-0 right-0 mt-1 mr-1" />
                            <div class="password-check absolute w-full bg-white  bottom-50 h-[60px] rounded-lg  shadow-2xl	 p-2 border-2"
                                v-if="isPasswordFocused">
                                <div class="flex flex-col gap-2 w-full">
                                    <UProgress :value="passwordComplexity" :indicator="false" />
                                    <div class="text-lg lg:text-sm xl:text-sm 2xl:text-sm">
                                        {{ $t("complexity") }} : {{ passwordComplexity }}%
                                    </div>
                                </div>
                            </div>
                        </UInput>
                    </UFormGroup>
                    <UFormGroup :label="$t(`auth_password_confirmation`)" name="password-confirm">
                        <UInput autocomplete="off" size="lg" v-model="state.passwordConfirm"
                            :type="showPasswords ? 'password' : 'text'"
                            :placeholder="$t(`auth_password_confirmation_label`)">
                            <UButton tabindex="-1" v-if="showPasswords" @click="togglePassword()" icon="i-heroicons-eye"
                                size="sm" color="primary" square variant="soft"
                                class="absolute top-0 right-0 mt-1 mr-1" />
                            <UButton tabindex="-1" v-if="!showPasswords" @click="togglePassword()"
                                icon="i-heroicons-eye-slash" size="sm" color="primary" square variant="soft"
                                class="absolute top-0 right-0 mt-1 mr-1" />
                        </UInput>
                    </UFormGroup>

                    <div
                        class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
                        <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
                            {{ $t(`continue`) }}
                        </UButton>
                    </div>

                </UForm>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">

import { useValidation } from '~/composables/validations';
import { environment } from '~/scripts/environment';
import { LocalStorageGetItem } from '~/scripts/local-storage';


const validation = useValidation();
const loadingStore = useLoadingStore();
loadingStore.hide();
const toast = useToast();
let showPasswords = ref(true);
let isPasswordFocused = ref(false);
function togglePassword() {
    showPasswords.value = !showPasswords.value;
}
const state = reactive({
    password: '',
    passwordConfirm: ''
})
function onFocusPassword() {
    isPasswordFocused.value = true;
}
function onblurPassword() {
    isPasswordFocused.value = false;
}
const passwordComplexity = computed(() => {
    return validation.CheckPasswordComplexity(state.password);
});

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
    if (state.password.length < 5) {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'Mots de passe trop courte!',
                icon: "i-heroicons-check-badge",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
        return;
    }

    useGqlToken({
        token: `${LocalStorageGetItem(environment.auth_token)}`,
        config: {
            type: 'Bearer',
            name: 'Authorization'
        }
    });
    loadingStore.show();
    GqlNewPassword({ password: { Hash: state.password } }).then(response => {
        navigateTo("/authentications/register/student/about");
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
