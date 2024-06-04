<template>
    <div class="fixed top-0 left-0 w-full" style="z-index: 1000 !important;">
        <section
            class="w-full bg-color-main flex align-middle justify-center  py-1  px-0 lg:px-2 xl:px-2 2xl:px-2  md:px-4 lg:px-8 xl:px-8 2xl:px-4">
            <div class="w-11/12 flex flex-row justify-between align-middle hidden lg:contents xl:contents 2xl:contents">
                <div class="w-full inline-flex gap-2 align-middle justify-start">
                    <UButton variant="ghost" label="CEND" size="md"
                        class="text-white text-md text-2xl font-bold h-full hover:text-white hover:bg-transparent" />
                    <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost" size="md"
                        class="text-white text-md h-full hover:text-white hover:bg-transparent">
                        {{ $t('nav_learn_with_cend') }}</UButton>
                    <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost" size="md"
                        class="text-white text-md h-full hover:text-white hover:bg-transparent">{{ $t('nav_tutorat') }}
                    </UButton>
                    <about />
                </div>
                <div class="w-full inline-flex gap-2 align-middle justify-end">
                    <language />
                    <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost" size="md"
                        class="text-white text-md h-full hover:text-white hover:bg-transparent">{{ $t('nav_help') }}
                    </UButton>

                    <!-- <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost"  size="md"
                    class="text-white text-md h-full hover:text-white hover:bg-transparent"  v-show="!isAuthenticated"  @click="navigateLogin()">{{$t('nav_sign_in')}}</UButton> -->
                    <signin v-if="!authStore.isAuthenticated()" />
                    <!-- <UButton :ui="{ rounded: 'rounded-full' }" variant="solid" size="md"
                    class="bg-white text-green-500 text-sm hover:text-green-300 hover:bg-green-500"  v-show="!isAuthenticated">{{$t('nav_register')}}</UButton> -->
                    <register v-if="!authStore.isAuthenticated()" />
                    <UButton :ui="{ rounded: 'rounded-full' }" variant="solid" size="md"
                        class="bg-white text-green-500 text-sm hover:text-green-300 hover:bg-green-500"
                        v-if="authStore.isAuthenticated()" @click="logout()">{{ $t('nav_sign_out') }}</UButton>
                </div>
            </div>
            <div class="w-full flex flex-row justify-between lg:hidden xl:hidden 2xl:hidden">
                <UButton variant="ghost" label="CEND" size="md"
                    class="text-white text-md text-2xl font-bold h-full hover:text-white hover:bg-transparent" />
                <div class="w-full flex flex-row justify-end align-middle gap-0">
                    <!-- <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost"  size="sm"
                    class="w-[130px] h-[45px] block text-white text-md h-full hover:text-white hover:bg-transparent"  v-show="!isAuthenticated"  @click="navigateLogin()">{{$t('nav_sign_in')}}</UButton> -->
                    <signin v-if="!authStore.isAuthenticated()" />
                    <!-- <UButton :ui="{ rounded: 'rounded-full' }" variant="solid" size="sm"
                    class="w-[130px] h-[45px] block bg-white text-green-500 text-sm hover:text-green-300 hover:bg-green-500 bg-white text-green-500 text-sm hover:text-green-300 hover:bg-green-500"  v-show="!isAuthenticated">{{$t('nav_register')}}</UButton> -->
                    <register v-if="!authStore.isAuthenticated() && !isAuthentificationPage" />
                    <UButton :ui="{ rounded: 'rounded-full', }" variant="solid" size="sm"
                        class="block bg-white text-green-500  hover:text-green-300 hover:bg-green-500"
                        v-if="authStore.isAuthenticated()" @click="logout()">{{ $t('nav_sign_out') }}</UButton>
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
                    <UButton @click="clickNavigatonAbout('about-us')" :ui="{ rounded: 'rounded-none', }"
                        variant="ghost" size="sm"
                        class="w-full h-ful flex inline-flex justify-between bg-white  text-gray-900  text-xl hover:bg-green-200">
                        <span>Qui Somme Nous?</span>
                        <UIcon name="i-heroicons-information-circle" />
                    </UButton>
                    <UButton @click="clickNavigatonAbout('our-mission')" :ui="{ rounded: 'rounded-none', }"
                        variant="ghost" size="sm"
                        class="w-full h-ful flex inline-flex justify-between bg-white  text-gray-900  text-xl hover:bg-green-200">
                        <span>Notre mission</span>
                        <UIcon name="i-heroicons-book-open" />
                    </UButton>
                    <UButton @click="clickNavigatonAbout('cend-best-point')" :ui="{ rounded: 'rounded-none', }"
                        variant="ghost" size="sm"
                        class="w-full h-ful flex inline-flex justify-between bg-white  text-gray-900  text-xl hover:bg-green-200">
                        <span>Les points forts de CEND</span>
                        <UIcon name="i-heroicons-hand-thumb-up" />
                    </UButton>
                    <UButton @click="clickNavigatonAbout('how-it-works')" :ui="{ rounded: 'rounded-none', }"
                        variant="ghost" size="sm"
                        class="w-full h-ful flex inline-flex justify-between bg-white  text-gray-900  text-xl hover:bg-green-200">
                        <span>Comment ça marche?</span>
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
import { loginRoute } from '~/scripts/routes';
const toast = useToast();
let humbergerMenuOpened: Ref<boolean> = ref(false);
let aboutMenuOpened: Ref<boolean> = ref(false);
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const route = useRoute();
let isAuthentificationPage = ref(false);
onMounted(async () => {
    console.log(route.path)
    if(route.path.startsWith("/authentications/register/")){
        isAuthentificationPage.value = true;
    }else{
        isAuthentificationPage.value = false;
    }
});
function logout() {
    loadingStore.show();
    LocalStorageremoveItem(environment.auth_token);
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
    navigateTo(loginRoute);
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
</script>