<script setup lang="ts">
import { ref } from 'vue';
import { setLang } from '~/i18n/lang';
const dropDownOpened = ref(false);
const { locale, setLocale } = useI18n()
const items = [
    [
        {
            label: "student",
            icon: 'i-heroicons-academic-cap',
            iconClass: 'text-2xl poppins-bold',
            class: "text-lg text-gray-600  w-full poppins-regular font-semibold",
            slot: "register",
            click: () => {
                navigateTo({path: '/authentications/register/student/email'})
            }
        },
        {
            label: 'parent',
            icon: 'i-heroicons-user-group',
            iconClass: 'text-2xl poppins-bold',
            class: "text-lg text-gray-600  w-full poppins-regular font-semibold",
            slot: "register",
            click: () => {
                navigateTo({path: '/authentications/register/parent/email', query: {label: "parent"}})
            }
        },
        {
            label: 'tutor',
            icon: 'i-heroicons-user',
            iconClass: 'text-2xl poppins-bold',
            class: "text-lg text-gray-600  w-full poppins-regular font-semibold",
            slot: "register",
            click: () => {
                navigateTo({path: '/authentications/register/tutor/email', query: {label: "tutor"}})
            }
        },
        {
            label: 'teacher',
            icon: 'i-heroicons-user-plus',
            iconClass: 'text-2xl poppins-bold ',
            class: "text-lg text-gray-600  w-full poppins-regular font-semibold",
            slot: "register",
            click: () => {
                navigateTo({path: '/authentications/register/teacher/email', query: {label: "teacher"}})
            }
        },
    ]
]
function onClickToggleModal(){
    dropDownOpened.value = !dropDownOpened.value;
}
function getWidth(local: string){
    return local == "en"?"w-[90px]":"w-[120px]";
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
     
    <UDropdown   :popper="{placement: 'bottom-start'}" :items="items" class="signin-dropdown mobile-about-dropdown lg:hidden xl:hidden 2xl:hidden"> 
        <UButton variant="ghost"  @click="onClickToggleModal()"  :ui="{ rounded: 'rounded-full' }" size="sm"
            class="w-[100px] h-[40px] block  bg-white text-[#008000] text-sm hover:text-white hover:bg-[#008000]"  >{{$t('nav_register')}}</UButton>
            <template #register="{ item }">
            <div class="text-lg text-gray-600  w-full poppins-regular font-semibold text-left  flex justify-between">
                <span>{{$t(item.label) }}</span>
                    <UIcon class="text-2xl" :name="`${item.icon}`"></UIcon>
            </div>
         </template>
    </UDropdown>

    <UDropdown   :popper="{placement: 'bottom-start', offsetDistance: 0}" :items="items" class="signin-dropdown desktop-about-dropdown hidden lg:block xl:block 2xl:block"> 
        <UButton variant="ghost"   @click="onClickToggleModal()"  :ui="{ rounded: 'rounded-full' }" size="sm"
            :class="['h-[40px] block  bg-white text-[#008000] text-sm hover:text-white hover:bg-[#008000]', getWidth(locale)]"  >{{$t('nav_register')}}</UButton>
            <template #register="{ item }">
            <div class="text-lg text-gray-600  w-full poppins-regular font-semibold text-left  flex justify-between">
                <span>{{$t(item.label) }}</span>
                    <UIcon class="text-2xl" :name="`${item.icon}`"></UIcon>
            </div>
         </template>
    </UDropdown>
    <slot />
</template>
