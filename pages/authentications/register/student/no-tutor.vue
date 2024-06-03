<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2">
                <UForm :state="state" class="space-y-6" @submit="onSubmit">
                    <div class="text-lg text-gray-900 poppins-medium py-5">
                        Malheureusement, nous n’avons pas trouver un tuteur qui comble vos attentes.
                    </div>
                    <div
                        class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
                        <UButton size="lg" type="submit" class="bg-light-green hover:bg-green-300 text-gray-900" block>
                            Continuer sans tuteur pour le moment ?
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
import Time from '~/components/time.vue';
import { useValidation } from '~/composables/validations';
import { format } from 'date-fns';
const time = useModal();
const calendar = useModal();
const loadingStore = useLoadingStore();
const calendarStore = useCalendarStore();
const timeStore = useTimeStore();
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
        navigateTo("/authentications/register/student/suggested-tutor");
    }, 500);

    

}
</script>
