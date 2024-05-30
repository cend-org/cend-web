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
            label: setLang('nav_who_we_are'),
            icon: 'i-heroicons-information-circle',
            iconClass: 'text-2xl poppins-bold ',
            class: "text-md text-gray-700 w-full poppins-bold",
            click: () => {
                alert("CLICKED")
            }
        },
        {
            label: 'Notre mission',
            icon: 'i-heroicons-book-open',
            iconClass: 'text-2xl poppins-bold',
            class: "text-md text-gray-700  w-full poppins-bold ",
            click: () => {
                alert("CLICKED")
            }
        },
        {
            label: 'Les points forts de CEND',
            icon: 'i-heroicons-hand-thumb-up',
            iconClass: 'text-2xl poppins-bold',
            class: "text-md text-gray-700  w-full poppins-bold",
            click: () => {
                alert("CLICKED")
            }
        },
        {
            label: 'Comment ça marche?',
            icon: 'i-heroicons-question-mark-circle',
            iconClass: 'text-2xl poppins-bold ',
            class: "text-md text-gray-700  w-full poppins-bold",
            click: () => {
                alert("CLICKED")
            }
        },
    ]
]
function getLang(ind: number){
    const lang = locale.value;
    switch (ind) {
        case 0:
           if(lang == 'fr'){
           // return fr.who
           }
    }
}

// 'Qui nous sommes?'

</script>
<style>
.about-dropdown div:nth-of-type(2) {
  width: 18rem;
}

.about-dropdown div:nth-of-type(2) > div > div > div > button {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}
.about-dropdown div:nth-of-type(2) > div > div > div > button > span{
  color: #404040;
  font-weight: bold;
}
</style>
<template>
     
    <UDropdown v-model:open="dropDownOpened" :items="items" :popper="{placement: 'bottom-start', offsetDistance: 0}" class="about-dropdown">
        <UButton  class="bg-transparent text-white hover:text-white hover:bg-transparent"
            variant="ghost" 
            :trailing-icon="dropDownOpened ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" >{{$t('nav_about_us')}}</UButton>
    </UDropdown>
    <slot />
</template>