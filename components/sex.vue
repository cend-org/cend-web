<script setup lang="ts">
const registrationSexStore = useRegistrationSexStore();
const langTransform = useLangTransform();
const { locale, setLocale } = useI18n();

const sexList = 
[
[
            {
                label: langTransform.transform("sex_male", locale.value),
                slot: 'sex',
                click: () => {
                    registrationSexStore.set({label: langTransform.transform("sex_male", locale.value), value: 0})
                }

            },
            {
                label: langTransform.transform("sex_female", locale.value),
                slot: 'sex',
                click: () => {
                    registrationSexStore.set({label: langTransform.transform("sex_female", locale.value), value: 1})
                }
            },
            {
                label: langTransform.transform("sex_other", locale.value),
                slot: 'sex',
                click: () => {
                    registrationSexStore.set({label: langTransform.transform("sex_other", locale.value), value: 2})
                }
            }
        ]
    ];
const isLabel = (val: any) => {
    return typeof(val) =='number'? "" : "text-gray-400"; 
};
</script>
<style>
    .desktop-sex-dropdown div:nth-of-type(2) {
     width: 25.4% !important;
    }
</style>
<template>
    <UDropdown label="votre sexe" :items="sexList" :popper="{ arrow: false }"
        class="w-full mobile-sex-dropdown  lg:hidden xl:hidden 2xl:hidden">
        <UButton :class="['w-full flex justify-between', isLabel(registrationSexStore.sex.value)]" size="lg" color="white" :label="registrationSexStore.sex.label"
            trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #sex="{ item }">
            <UButton class="bg-green-300 w-full text-gray-900 hover:bg-green-500" block>{{ item.label }}</UButton>
        </template>
    </UDropdown>
    <UDropdown label="votre sexe" :items="sexList" :popper="{ arrow: false }"
        class="w-full desktop-sex-dropdown hidden lg:block xl:block 2xl:block">
        <UButton :class="['w-full flex justify-between', isLabel(registrationSexStore.sex.value)]" size="lg" color="white" :label="registrationSexStore.sex.label"
            trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #sex="{ item }">
            <UButton class="bg-green-300 w-full text-gray-900 hover:bg-green-500" block>{{ item.label }}</UButton>
        </template>
    </UDropdown>
</template>
