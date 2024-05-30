<script setup lang="ts">
import { ref } from 'vue';
import { setLang } from '~/i18n/lang';
const dropDownOpened = ref(false);
const { locale, setLocale } = useI18n()
const items = [
    [
        {
            //nav_who_we_are
            label: "Etudiant",
            icon: 'i-heroicons-academic-cap',
            iconClass: 'text-2xl poppins-bold',
            class: "text-xl text-gray-700 w-full poppins-regular py-2",
            click: () => {
                navigateTo({path: '/authentications/login', query: {label: "student"}})
            }
        },
        {
            label: 'Parent',
            icon: 'i-heroicons-user-group',
            iconClass: 'text-2xl poppins-bold',
            class: "text-xl text-gray-700  w-full poppins-regular py-2",
            click: () => {
                navigateTo({path: '/authentications/login', query: {label: "parent"}})
            }
        },
        {
            label: 'Tuteur',
            icon: 'i-heroicons-user',
            iconClass: 'text-2xl poppins-bold',
            class: "text-xl text-gray-700  w-full poppins-regular py-2",
            click: () => {
                navigateTo({path: '/authentications/login', query: {label: "tutor"}})
            }
        },
        {
            label: 'Professeur',
            icon: 'i-heroicons-user-plus',
            iconClass: 'text-2xl poppins-bold ',
            class: "text-xl text-gray-700  w-full poppins-regular py-2",
            click: () => {
                navigateTo({path: '/authentications/login', query: {label: "teacher"}})
            }
        },
    ]
]
function onClickToggleModal(){
    dropDownOpened.value = !dropDownOpened.value;
}
</script>
<style>
.mobile-about-dropdown div:nth-of-type(2) {
     width: 100%;
     border: none !important;
     border-radius: 0px;
     margin-top: 10px;
     box-shadow: none !important;
     margin-left: -10px !important;
     border-radius: 0px !important;
}

.desktop-about-dropdown div:nth-of-type(2) {
     width: 18%;
}
.signin-dropdown div:nth-of-type(2) > div > div > div > button {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}
.signin-dropdown div:nth-of-type(2) > div > div > div > button > span{
  color: black;
}
</style>
<template>
     
    <UDropdown :open="dropDownOpened"  :popper="{placement: 'bottom-start', offsetDistance: 0}" :items="items" class="signin-dropdown mobile-about-dropdown lg:hidden xl:hidden 2xl:hidden"> 
        <UButton variant="ghost"  @click="onClickToggleModal()"  :ui="{ rounded: 'rounded-full' }" size="sm"
            class="w-[130px] h-[45px] block  text-white text-sm hover:text-white hover:bg-transparent"  >{{$t('nav_sign_in')}}</UButton>
    </UDropdown>

    <UDropdown :open="dropDownOpened"  :popper="{placement: 'bottom-start', offsetDistance: 0}" :items="items" class="signin-dropdown desktop-about-dropdown hidden lg:block xl:block 2xl:block"> 
        <UButton variant="ghost"   @click="onClickToggleModal()"  :ui="{ rounded: 'rounded-full' }" size="sm"
            class="w-[130px] h-[45px] block  text-white text-sm hover:text-text-white hover:bg-transparent"  >{{$t('nav_sign_in')}}</UButton>
    </UDropdown>
    <slot />
</template>
