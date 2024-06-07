<script setup lang="ts">
import { environment } from '~/scripts/environment';
import { LocalStorageGetItem, LocalStorageSetItem } from '~/scripts/local-storage';

const { locale, setLocale } = useI18n();
let current_lang = LocalStorageGetItem(environment.lang) as any;
setLocale(current_lang);
const loadingStore = useLoadingStore();
const items = [
  [
    {
      label: 'lang_ca',
      class: 'text-lg text-gray-600  w-full poppins-regular font-semibold',
      slot: 'lang',
      code: 'CA',
      click: () => {
        setLang('ca')
      }
    },
    {
      label: 'lang_fr',
      class: 'text-lg text-gray-600  w-full poppins-regular font-semibold',
      slot: 'lang',
      code: 'FR',
      click: () => {
        setLang('fr')
      }
    },
    {
      label: 'lang_en',
      class: 'text-lg text-gray-600  w-full poppins-regular font-semibold',
      slot: 'lang',
      code: 'EN',
      click: () => {
        setLang('en')
      }
    }]
]

let selectedLanguage: string = "lang_ca";
function setLang(lang: string) {
  loadingStore.show();
  switch (lang) {
    case "ca":
      setLocale("ca");
      LocalStorageSetItem(environment.lang, 'ca');
      selectedLanguage = "lang_ca"
      break;
    case "fr":
      setLocale("fr");
      LocalStorageSetItem(environment.lang, 'fr');
      selectedLanguage = "lang_fr";

      break;
    case "en":
      setLocale("en");
      LocalStorageSetItem(environment.lang, 'en');
      selectedLanguage = "lang_en"
      break;
  }
  setTimeout(() => {
    loadingStore.hide();
  }, 500);
}

</script>
<style>
.mobile-dropdown div:nth-of-type(2) {
  width: 100%;
  border: none !important;
  border-radius: 0px;
  margin-top: 10px;
  box-shadow: none !important;
  margin-left: -10px !important;
  border-radius: 0px !important;
}

.desktop-dropdown div:nth-of-type(2) {
  width: 18%;
}

.signin-dropdown div:nth-of-type(2)>div>div>div>button {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}
</style>
<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start', arrow: false }"
    class="text-lg font-bold desktop-dropdown hidden lg:block, xl:block 2xl:block">
    <div class="">
      <UButton class="h-[35px] bg-transparent text-white hover:text-white hover:bg-[#008000] rounded-full"
        variant="ghost" :label="`${$t(selectedLanguage)} ${locale.toUpperCase()}`" icon="i-heroicons-language-solid" />
    </div>
    <template #lang="{ item }">
      <div class="text-lg text-gray-600  w-full poppins-regular font-semibold text-left flex justify-between">
        <span>{{ $t(item.label) }} </span>
        <span class="text-sm">{{ item.code }} </span>
      </div>
    </template>
  </UDropdown>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start', arrow: false }"
    class="text-lg font-bold mobile-dropdown block lg:hidden xl:hidden 2xl:hidden">
    <div class="">
      <UButton
        class="h-[35px] w-[35px]  bg-white text-[#008000] text-lg hover:bg-white hover:text-[#008000] rounded-full ml-1 mt-[3px]">
        <UIcon name="i-heroicons-language" class="text-center"></UIcon>
      </UButton>
    </div>
    <template #lang="{ item }">
      <div class="text-lg text-gray-600  w-full poppins-regular font-semibold text-left flex justify-between">
        <span>{{ $t(item.label) }} </span>
        <span class="text-sm">{{ item.code }} </span>
      </div>
    </template>
  </UDropdown>
  <slot />
</template>