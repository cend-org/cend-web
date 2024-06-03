<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">{{ $t('register_fill_about') }}</h1>
                <UForm :state="state" class="space-y-2" @submit="onSubmit">
                    <course-preference />
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
<style>
.mobile-sex-dropdown div:nth-of-type(2) {
    width: 88%;
}

.desktop-sex-dropdown div:nth-of-type(2) {
    width: 20%;
    margin-left: 3px !important;
}
</style>
<script setup lang="ts">

import Calendar from '~/components/calendar.vue';
import { useValidation } from '~/composables/validations';

const validation = useValidation();
const loadingStore = useLoadingStore();
const toast = useToast();
const isBirthDateCalendarOpen = ref(false);
const calendar = useModal();
const calendarStore = useCalendarStore();
function login() {
    // GqlLogin({ email: "parent1@email.com", password: 'parent' }).then(response => {
    //     LocalStorageSetItem("AuthTkn", response.Login?.T);
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
    name: undefined,
    familyName: undefined,
    birthDate: '',
})

async function onSubmit() {
    // if (!validation.checkPasswords(state.password, state.passwordConfirm)) {
    //     toast.add(
    //         {
    //             id: "1",
    //             title: 'Validation',
    //             description: 'Veillez vérifiez votre mots de passe!',
    //             icon: "i-heroicons-check-badge",
    //             color: "red",
    //             ui: {
    //                 background: "bg-red-100"
    //             }
    //         }
    //     )
    //     return;
    // }
    loadingStore.show();
    setTimeout(() => {
        loadingStore.hide();
        navigateTo("/authentications/register/student/disponibility");
    }, 500);
}

</script>