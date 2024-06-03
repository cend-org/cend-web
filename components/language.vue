<script setup lang="ts">
import { LocalStorageSetItem } from '~/scripts/local-storage';

const { locale, setLocale } = useI18n();
const loadingStore = useLoadingStore();

const items = [
  [
    {
    label: 'Français CA',
    click: () => {
       setLang('ca')
    }
  }, 
  {
    label: 'Français FR',
    click: () => {
       setLang('fr')
    }
  }, 
  {
    label: 'Anglais EN',
    click: () => {
       setLang('en')
    }
  }]
]

let selectedLanguage: string = "Français CA";
function setLang(lang: string){
  loadingStore.show();
  switch (lang) {
    case "ca":
        setLocale("ca");
        LocalStorageSetItem('lang', 'ca');
        selectedLanguage = "Français CA"
      break;
    case "fr":
        setLocale("fr");
        LocalStorageSetItem('lang', 'fr');
        selectedLanguage = "Français FR";

      break;
    case "en":
        setLocale("en");
        LocalStorageSetItem('lang', 'en');
        selectedLanguage = "Anglais EN"
      break;
  }
  setTimeout(() => {
        loadingStore.hide();
    }, 500);
}

</script>
<style>

</style>
<template>
  <UDropdown :items="items" :popper="{placement: 'bottom-start', offsetDistance: 10, arrow:false}" class="text-lg font-bold">
    <UButton  class="bg-transparent text-white hover:text-white hover:bg-transparent" variant="ghost"  :label="selectedLanguage"  icon="i-heroicons-language-solid"/>
  </UDropdown>
  <slot/>
</template>