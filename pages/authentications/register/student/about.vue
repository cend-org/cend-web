<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">{{ $t('register_fill_about') }}</h1>
                <UForm :state="state" class="space-y-4" @submit="onSubmit">
                    <div class="flex flex-row gap-2">
                        <UFormGroup :label="$t('register_name')" name="nom">
                            <UInput autocomplete="off" size="lg" v-model="state.name" type="text"
                                :placeholder="$t('register_name_label')" />
                        </UFormGroup>

                        <UFormGroup :label="$t('register_familyname')" name="prenom">
                            <UInput autocomplete="off" size="lg" v-model="state.familyName" type="text"
                                :placeholder="$t('register_familyname_label')" />
                        </UFormGroup>
                    </div>

                    <UFormGroup :label="$t('register_birthdate')" name="date-of-birth">
                        <UInput autocomplete="off" @click="focusBirthDate()" size="lg" v-model="state.birthDate"
                            type="text" :placeholder="$t('register_birthdate_label')" />
                        <calendar />
                    </UFormGroup>

                    <UFormGroup :label="$t('register_gender')" name="sex">
                        <sex />
                    </UFormGroup>


                    <UFormGroup label="Choisissez votre langue" name="lang">
                        <lang />
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
import { environment } from '~/scripts/environment';
import { LocalStorageGetItem } from '~/scripts/local-storage';

const loadingStore = useLoadingStore();
loadingStore.hide();
const toast = useToast();
const calendar = useModal();
const calendarStore = useCalendarStore();
const registrationSexStore = useRegistrationSexStore();
const registrationLangStore = useRegistrationLangStore();
const selectionSingleStore = useSelectionSingleStore();
const state = reactive({
    name: '',
    familyName: '',
    birthDate: '',
})

async function onSubmit() {
    if (!state.birthDate || !state.familyName || !state.name) {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'Information incomplete!',
                icon: "i-heroicons-check-badge",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
        return;
    }

    if (typeof (registrationSexStore.sex.value) != 'number') {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'Veillez ajouter votre sexe!',
                icon: "i-heroicons-check-badge",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
        return;
    }
    if (typeof (registrationLangStore.lang.value) != 'number') {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'Veillez ajouter votre Langue!',
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

    useGqlToken({
        token: `${LocalStorageGetItem(environment.auth_token)}`,
        config: {
            type: 'Bearer',
            name: 'Authorization'
        }
    });
    GqlUpdateMyProfile({ profile: { Name: state.name, FamilyName: state.familyName, Lang: registrationLangStore.lang.value, Sex: registrationSexStore.sex.value } }).then(response => {
        getAcademicLevels();
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
function getAcademicLevels() {
    GqlAcademicLevels().then(response => {
        selectionSingleStore.list = response.AcademicLevels as Array<never>;
        navigateTo('/authentications/register/student/academic-level');
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
function focusBirthDate() {
    calendar.open(Calendar, {
        onClose() {
            calendar.close();
        },
        onConfirm() {
            state.birthDate = calendarStore.formatedDate;
            calendar.close();
        }
    })
}
</script>
