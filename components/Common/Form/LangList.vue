<script setup lang="ts">
import { Input } from "~/components/ui/input";
import { LoaderCircle, Search, Globe, CircleCheck } from 'lucide-vue-next';
const props = defineProps({
    selectedlang: {
        type: String,
        default: () => `${4}`
    }
});
const transform = trasnformStore();
const loadingStore = useLoadingStore();
let selectedLanguage = ref(props.selectedlang);
const emit = defineEmits(['update:selectedLanguage']);

watch(selectedLanguage, (newVal) => {
    emit('update:selectedLanguage', `${newVal}`);
});
const filterLang = ref('');
const langlist = [
    {
        name: "Detecter la langue à partir de l'appareil",
        value: 4,
        flag: "icon"
    },
    {
        name: "Français",
        value: 0,
        flag: "/image/flags/france-48.png"
    },
    {
        name: "Français canadien",
        value: 1,
        flag: "/image/flags/canada-48.png"
    },
];
const languages = ref(langlist);

const isIcon = (name: sting) => {
   return name.endsWith(".png")? false : true;
};

const isSelectedLanguage = (val: number) => {
    return selectedLanguage.value == val? true : false;
};

const selectLanguage = (val: number) => {
    selectedLanguage.value = val;
};
watch(filterLang, (inputKey: string) => {
    const cleanedKey = transform.normalizeString(inputKey.toLowerCase());
    languages.value = langlist.filter((lang) => {
        const cleanedName = transform.normalizeString(lang.name.toLowerCase());
        return cleanedName.includes(cleanedKey);
    });
});
</script>
<template>
    <div class="w-full">
        <div class="w-full flex justify-center items-center pt-20">
            <img src="/image/cend_logo.png" alt="" class="w-32 h-42" />
        </div>
        <div class="text-xl font-semibold text-left px-5 py-10">
            pour commencer à utilise CEND, veuillez choisir votre langue:
        </div>
        <div class="relative w-full items-center px-5">
            <Input v-model="filterLang"  type="text" placeholder="Rechercher" class=" shadow-sm pl-10 h-12 text-lg bg-gray-50" />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2 pl-8 ">
                <Search class="size-6 text-muted-foreground" />
            </span>
        </div>
        <div class="mt-5 h-full w-full">
            <div class="relative h-12 px-5" v-for="langue in languages">
                <div class="w-full h-full flex flex-row items-center gap-2">
                    <Globe class="h-8 w-8 text-primary" v-if="isIcon(langue.flag)" />
                    <img  :src="langue.flag" class="h-8 w-8 text-primary" v-if="!isIcon(langue.flag)" />
                    <span class="font-normal">{{ langue.name }}</span>
                </div>
                <button type="button" @click="selectLanguage(langue.value)"
                    class=" px-5 flex justify-end items-center w-full h-full absolute top-0 left-0 bg-trasparent border-none shadow-none focus:border-none focus:bg-transparent">
                    <CircleCheck class="h-6 w-6 text-primary"  v-if="isSelectedLanguage(langue.value)"/>
                </Button>
            </div>
        </div>
    </div>
</template>