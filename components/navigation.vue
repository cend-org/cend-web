<template>
    <div class="fixed top-0 left-0 w-full" style="z-index: 1000 !important;">
        <section
            class="w-11/2 bg-color-main flex align-middle justify-center  py-1  px-0 lg:px-2 xl:px-2 2xl:px-2  md:px-4 lg:px-8 xl:px-8 2xl:px-4">
            <div class="w-full h-full flex flex-row justify-between  hidden lg:contents xl:contents 2xl:contents">
                <div class="w-full h-full items-center flex gap-2 ">
                    <UButton variant="ghost" label="CEND" size="md"
                        class="text-white text-md text-2xl font-bold h-full hover:text-white hover:bg-transparent"
                        @click="onClickCend()" />
                    <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost" size="md"
                        class="text-white text-md h-full hover:text-white hover:bg-[#008000]  h-[35px]">
                        {{ $t('nav_learn_with_cend') }}</UButton>
                    <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost" size="md"
                        class="text-white text-md h-full hover:text-white hover:bg-[#008000]  h-[35px]">{{
                            $t('nav_tutorat') }}
                    </UButton>
                    <about />
                </div>
                <div class="w-full  flex  items-center justify-end gap-1">
                    <language />
                    <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost" size="md"
                        class="text-white text-md h-full hover:text-white hover:bg-[#008000]  h-[35px]">{{
                            $t('nav_help') }}
                    </UButton>
                    <signin v-if="!authStore.connected && !isAuthentificationPage" />
                    <register v-if="!authStore.connected && !isAuthentificationPage" />
                    <UButton :ui="{ rounded: 'rounded-full' }" variant="solid" size="md"
                        class="bg-white text-[#008000] text-sm hover:text-white hover:bg-[#008000]  h-[35px]"
                        v-if="authStore.connected && !isAuthentificationPage" @click="logout()">{{ $t('nav_sign_out') }}
                    </UButton>
                </div>
            </div>
            <div class="w-full flex flex-row justify-between lg:hidden xl:hidden 2xl:hidden mobile">
                <UButton variant="ghost" label="CEND" size="sm"
                    class="text-white text-md text-xl font-bold h-full hover:text-white hover:bg-transparent"
                    @click="onClickCend()" />
                <div class="w-full flex flex-row justify-end align-middle gap-0">
                    <signin v-if="!authStore.connected && !isAuthentificationPage" />
                    <register v-if="!authStore.connected && !isAuthentificationPage" />
                    <UButton v-if="authStore.connected && !isAuthentificationPage" :ui="{ rounded: 'rounded-full', }"
                        variant="solid" size="sm"
                        class="block bg-white text-[#008000] hover:text-green-300 hover:bg-green-500" @click="logout()">
                        {{ $t('nav_sign_out') }}</UButton>
                    <language />
                    <UButton @click="menuHumbergerClicked()" :ui="{ rounded: 'rounded-full' }" variant="solid" size="sm"
                        class="bg-transparent  text-white text-3xl font-bold hover:bg-transparent">
                        <UIcon :name="humbergerMenuOpened ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"></UIcon>
                    </UButton>
                </div>
            </div>
        </section>
        <section v-if="humbergerMenuOpened"
            class="lg:hidden xl:hidden 2xl:hidden bg-white w-full shadow-lg 	shadow-gray-300">
            <div class="">
                <UButton :ui="{ rounded: 'rounded-none', }" variant="ghost" size="sm"
                    class="w-full h-ful bg-white py-2  text-gray-900  text-xl hover:bg-green-200">
                    {{ $t('nav_learn_with_cend') }}</UButton>
                <UButton :ui="{ rounded: 'rounded-none', }" variant="ghost" size="sm"
                    class="w-full h-ful bg-white  text-gray-900  text-xl hover:bg-green-200">{{ $t('nav_tutorat') }}
                </UButton>
                <UButton :ui="{ rounded: 'rounded-none', }" @click="aboutMenuClicked()" variant="ghost" size="sm"
                    :trailing-icon="aboutMenuOpened ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                    class="w-full h-ful bg-white  text-gray-900  text-xl hover:bg-green-200">{{ $t('nav_about_us') }}
                </UButton>
                <div class="px-4" v-if="aboutMenuOpened">
                    <UButton @click="clickNavigatonAbout('about-us')" :ui="{ rounded: 'rounded-none', }" variant="ghost"
                        size="sm"
                        class="w-full h-ful flex inline-flex justify-between bg-white  text-gray-900  text-xl hover:bg-green-200">
                        <span>{{ $t('nav_who_we_are') }}</span>
                        <UIcon name="i-heroicons-information-circle" />
                    </UButton>
                    <UButton @click="clickNavigatonAbout('our-mission')" :ui="{ rounded: 'rounded-none', }"
                        variant="ghost" size="sm"
                        class="w-full h-ful flex inline-flex justify-between bg-white  text-gray-900  text-xl hover:bg-green-200">
                        <span>{{ $t('nav_our_mission') }}</span>
                        <UIcon name="i-heroicons-book-open" />
                    </UButton>
                    <UButton @click="clickNavigatonAbout('cend-best-point')" :ui="{ rounded: 'rounded-none', }"
                        variant="ghost" size="sm"
                        class="w-full h-ful flex inline-flex justify-between bg-white  text-gray-900  text-xl hover:bg-green-200">
                        <span>{{ $t('nav_best_points') }}</span>
                        <UIcon name="i-heroicons-hand-thumb-up" />
                    </UButton>
                    <UButton @click="clickNavigatonAbout('how-it-works')" :ui="{ rounded: 'rounded-none', }"
                        variant="ghost" size="sm"
                        class="w-full h-ful flex inline-flex justify-between bg-white  text-gray-900  text-xl hover:bg-green-200">
                        <span>{{ $t('nav_how_it_works') }}</span>
                        <UIcon name="i-heroicons-question-mark-circle" />
                    </UButton>
                </div>
                <UButton :ui="{ rounded: 'rounded-none', }" variant="ghost" size="sm"
                    class="w-full h-ful bg-white  text-gray-900  text-xl hover:bg-green-200">{{ $t('nav_help') }}
                </UButton>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/composables/auth';
import { environment } from '~/scripts/environment';
import { LocalStorageremoveItem } from '~/scripts/local-storage';
import { routes } from '~/scripts/routes';


let humbergerMenuOpened: Ref<boolean> = ref(false);
let aboutMenuOpened: Ref<boolean> = ref(false);
const toast = useToast();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const route = useRoute();
let isAuthentificationPage = ref(false);
checkRoutesConditions();
watch(
    () => route.path,
    () => {
        checkRoutesConditions();
    },
);

function checkRoutesConditions() {
    isAuthentificationPage.value = route.path.startsWith('/authentications') ? true : false;
    authStore.check();
}


function logout() {
    loadingStore.show();
    LocalStorageremoveItem(environment.auth_token);
    checkRoutesConditions();
    setTimeout(() => {

        toast.add(
            {
                id: "1",
                title: 'Deconnexion',
                description: 'Deconnecte avec succes!',
                icon: "i-heroicons-check-badge",
            }
        );
        navigateTo('/');
    }, 500);


}
function navigateLogin() {
    navigateTo(routes.login);
}


function menuHumbergerClicked() {
    humbergerMenuOpened.value = !humbergerMenuOpened.value;
}
function aboutMenuClicked() {
    aboutMenuOpened.value = !aboutMenuOpened.value;
}

function clickNavigatonAbout(fragment: string) {
    humbergerMenuOpened.value = false;
    aboutMenuOpened.value = false;
    navigateTo(`/about/about#${fragment}`)
}

function onClickCend() {
    // if (route.path.startsWith("/authentications")) {
    //     return;
    // }
    navigateTo('/')
}
</script>