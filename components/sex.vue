<script setup lang="ts">
const registrationSexStore = useRegistrationSexStore();

let sexList = ref(
    [
        [
            {
                label: "sex_male",
                slot: 'sex',
                click: () => {
                    registrationSexStore.set({ label: "sex_male", value: 0 })
                }

            },
            {
                label: "sex_female",
                slot: 'sex',
                click: () => {
                    registrationSexStore.set({ label: "sex_female", value: 1 })
                }
            },
            {
                label: "sex_other",
                slot: 'sex',
                click: () => {
                    registrationSexStore.set({ label: 'sex_other', value: 2 })
                }
            }
        ]
    ]
)

const isLabel = (val: any) => {
    return typeof (val) == 'number' ? "" : "text-gray-400";
};
</script>
<style>
.desktop-sex-dropdown div:nth-of-type(2) {
    width: 25.4% !important;
}

.mobile-sex-dropdown div:nth-of-type(2) {
    width: 100% !important;
}
</style>
<template>
    <UDropdown label="votre sexe" :items="sexList" :popper="{ arrow: true }"
        class="w-full mobile-sex-dropdown  lg:hidden xl:hidden 2xl:hidden">
        <UButton :class="['w-full flex justify-between', isLabel(registrationSexStore.sex.value)]" size="lg"
            color="white" :label="$t(registrationSexStore.sex.label)"
            trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #sex="{ item }">
            <UButton class="bg-green-300 w-full text-gray-900 hover:bg-green-500" block :label="$t(item.label)">
            </UButton>
        </template>
    </UDropdown>
    <UDropdown label="votre sexe" :items="sexList" :popper="{ arrow: false }"
        class="w-full desktop-sex-dropdown hidden lg:block xl:block 2xl:block">
        <UButton :class="['w-full flex justify-between', isLabel(registrationSexStore.sex.value)]" size="lg"
            color="white" :label="$t(registrationSexStore.sex.label)"
            trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #sex="{ item }">
            <UButton class="bg-green-300 w-full text-gray-900 hover:bg-green-500" block :label="$t(item.label)">
            </UButton>
        </template>
    </UDropdown>
</template>
