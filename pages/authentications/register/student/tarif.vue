<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2">
                <UForm :state="state" class="space-y-6" @submit="onSubmit">
                   <div class="py-3 text-lg poppins-bold">
                    tarif est de 250$, pour mathematiques de niveau primaires II
                   </div>
                   <div class="py-2 text-sm poppins-regular text-gray-500">
                    Première rencontre est à 50% de l’investissement et vous pouvez changer gratuitement pour un autre tuteur si jamais ça ne marche pas avec ( nom de tuteur ) ce qui nous étonnerait.
                   </div>
                   <div class="py-2 text-sm poppins-regular text-gray-500">
                    Passer au payement par car de crédit ou de débit pour la première rencontre ce ( date ) à ( heure ) avec ( nom de tuteur ).
                   </div>
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
