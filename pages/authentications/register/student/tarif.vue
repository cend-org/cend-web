<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <UForm :state="state" class="space-y-6" @submit="onSubmit">
                    <div class="py-3 text-lg poppins-medium">
                        tarif est de <span class="text-color-main poppins-bold">{{ tarif }}</span>, pour <span
                            class="text-color-main poppins-bold">{{ subjects }}</span> de niveau <span
                            class="text-color-main poppins-bold">{{ level }}</span>
                    </div>
                    <div class="py-2 text-md poppins-regular text-gray-500">
                        Première rencontre est à 50% de l’investissement et vous pouvez changer gratuitement pour un
                        autre tuteur si jamais ça ne marche pas avec <span class="poppins-medium text-color-main">{{
                            tutor_name }}</span> ce qui nous étonnerait.
                    </div>
                    <div class="py-2 text-md poppins-regular text-gray-500">
                        Passer au payement par car de crédit ou de débit pour la première rencontre ce <span
                            class="poppins-medium text-color-main">{{ dispo_date }}</span> à <span
                            class="poppins-medium text-color-main">{{ dispo_hour_1 }}</span> avec <span
                            class="poppins-medium text-color-main">{{ tutor_name }}</span>.
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

import { LocalStorageGetItem } from '~/scripts/local-storage';
import { environment } from '~/scripts/environment';

const loadingStore = useLoadingStore();
loadingStore.hide();
let tarif = ref('250$');
let subjects = ref(LocalStorageGetItem(environment.student_selected_academic_course));
let level = ref(LocalStorageGetItem(environment.student_selected_academic_level));
let dispo_date = ref(LocalStorageGetItem(environment.student_dispo_date));
let dispo_hour_1 = ref(LocalStorageGetItem(environment.student_dispo_hour_1));
let tutor_name = ref(LocalStorageGetItem(environment.student_tutor_name));
const state = reactive({})
async function onSubmit() {
    loadingStore.show();
    setTimeout(() => {
        loadingStore.hide();
        navigateTo("/authentications/register/student/with-tutor-final");
    }, 500);
}
</script>
