<script setup lang="ts">
const registrationLangStore = useRegistrationLangStore();
const validation = useValidation();
const langList =
    [
        [
            {
                label: 'lang_ca',
                code: 'ca',
                slot: 'lang',
                click: () => {
                    registrationLangStore.set({ label: "lang_ca", code: "ca", value: 0 })
                }

            },
            {
                label: 'lang_fr',
                code: 'fr',
                slot: 'lang',
                click: () => {
                    registrationLangStore.set({ label: "lang_fr", code: "fr", value: 1 })
                }
            },
            {
                label: 'lang_en',
                code: "en",
                slot: 'lang',
                click: () => {
                    registrationLangStore.set({ label: "lang_en", code: "en", value: 2 })
                }
            }
        ]
    ];
const isLabel = (val: any) => {
    return typeof (val) == 'number' ? "" : "text-gray-400";
};
</script>
<style>
.desktop-sex-dropdown div:nth-of-type(2) {
    width: 25.4% !important;
}
</style>
<template>
    <UDropdown :items="langList" :popper="{ arrow: false }"
        class="w-full mobile-sex-dropdown  lg:hidden xl:hidden 2xl:hidden">
        <UButton :class="['w-full flex justify-between', isLabel(registrationLangStore.lang.value)]" size="lg"
            color="white"
            :label="validation.joinWithHyphen($t(registrationLangStore.lang.label), registrationLangStore.lang.code)"
            trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #lang="{ item }">
            <UButton class="bg-green-300 w-full text-gray-900 hover:bg-green-500" block>{{
                validation.joinWithHyphen($t(item.label), item.code) }}</UButton>
        </template>
    </UDropdown>
    <UDropdown :items="langList" :popper="{ arrow: false }"
        class="w-full desktop-sex-dropdown hidden lg:block xl:block 2xl:block">
        <UButton :class="['w-full flex justify-between', isLabel(registrationLangStore.lang.value)]" size="lg"
            color="white"
            :label="validation.joinWithHyphen($t(registrationLangStore.lang.label), registrationLangStore.lang.code)"
            trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #lang="{ item }">
            <UButton class="bg-green-300 w-full text-gray-900 hover:bg-green-500" block>{{
                validation.joinWithHyphen($t(item.label), item.code) }}</UButton>
        </template>
    </UDropdown>
</template>
