<script setup lang="ts">
import { ref } from 'vue';
import { fr } from '~/i18n/fr';
import { setLang } from '~/i18n/lang';
const dropDownOpened = ref(false);
const { locale, setLocale } = useI18n()


const items = [
    [
        {
            //nav_who_we_are
            label: "nav_who_we_are",
            icon: 'i-heroicons-information-circle',
            iconClass: 'text-2xl poppins-bold ',
            class: "text-md text-gray-700 w-full poppins-bold",
            slot: 'about',
            click: () => {
                navigateTo('/about/about#about-us')
            }
        },
        {
            label: 'nav_our_mission',
            icon: 'i-heroicons-book-open',
            iconClass: 'text-2xl poppins-bold',
            class: "text-md text-gray-700  w-full poppins-bold ",
            slot: 'about',
            click: () => {
                navigateTo('/about/about#our-mission')
            }
        },
        {
            label: 'nav_best_points',
            icon: 'i-heroicons-hand-thumb-up',
            iconClass: 'text-2xl poppins-bold',
            class: "text-md text-gray-700  w-full poppins-bold",
            slot: 'about',
            click: () => {
                navigateTo('/about/about#cend-best-point')
            }
        },
        {
            label: 'nav_how_it_works',
            icon: 'i-heroicons-question-mark-circle',
            iconClass: 'text-2xl poppins-bold ',
            class: "text-md text-gray-700  w-full poppins-bold",
            slot: 'about',
            click: () => {
                navigateTo('/about/about#how-it-works')
            }
        },
    ]
]
</script>
<style>
.about-dropdown div:nth-of-type(2) {
    width: 18rem;
}

.about-dropdown div:nth-of-type(2)>div>div>div>button {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}

.about-dropdown div:nth-of-type(2)>div>div>div>button>span {
    color: #404040;
    font-weight: bold;
}
</style>
<template>
    <UDropdown v-model:open="dropDownOpened" :items="items" :popper="{ placement: 'bottom-start', offsetDistance: 0 }"
        class="about-dropdown">
        <UButton class=" h-[40px] bg-transparent text-white hover:text-white hover:bg-[#008000] rounded-full"
            variant="ghost" :trailing-icon="dropDownOpened ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'">
            {{ $t('nav_about_us') }}</UButton>
        <template #about="{ item }">
            <div class="text-lg text-gray-600  w-full poppins-regular font-semibold text-left  flex justify-between">
                <span>{{ $t(item.label) }}</span>
                <UIcon class="text-2xl" :name="`${item.icon}`"></UIcon>
            </div>
        </template>
    </UDropdown>
    <slot />
</template>