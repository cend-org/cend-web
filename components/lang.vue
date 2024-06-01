<script setup lang="ts">
const registrationLangStore = useRegistrationLangStore();
const validation = useValidation();
const langList =
    [
        [
            {
                label: 'Français',
                code: 'ca',
                slot: 'lang',
                click: () => {
                    registrationLangStore.set({ label: "Français", code: "ca", value: 0 })
                }

            },
            {
                label: 'Français',
                code: 'fr',
                slot: 'lang',
                click: () => {
                    registrationLangStore.set({ label: "Français", code: "fr", value: 1 })
                }
            },
            {
                label: 'Anglais',
                code: "en",
                slot: 'lang',
                click: () => {
                    registrationLangStore.set({ label: "Anglais", code: "en", value: 3 })
                }
            }
        ]
    ];
</script>

<template>
    <UDropdown :items="langList" :popper="{ arrow: false }"
        class="w-full mobile-sex-dropdown  lg:hidden xl:hidden 2xl:hidden">
        <UButton class="w-full flex justify-between" size="lg" color="white"
            :label="validation.joinWithHyphen(registrationLangStore.lang.label, registrationLangStore.lang.code)"
            trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #lang="{ item }">
            <UButton class="bg-green-300 w-full text-gray-900 hover:bg-green-500" block>{{
                validation.joinWithHyphen(item.label, item.code) }}</UButton>
        </template>
    </UDropdown>
    <UDropdown :items="langList" :popper="{ arrow: false }"
        class="w-full desktop-sex-dropdown hidden lg:block xl:block 2xl:block">
        <UButton class="w-full flex justify-between" size="lg" color="white"
            :label="validation.joinWithHyphen(registrationLangStore.lang.label, registrationLangStore.lang.code)"
            trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #lang="{ item }">
            <UButton class="bg-green-300 w-full text-gray-900 hover:bg-green-500" block>{{
                validation.joinWithHyphen(item.label, item.code) }}</UButton>
        </template>
    </UDropdown>
</template>
