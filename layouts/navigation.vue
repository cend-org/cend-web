<template>
    <section class="w-full bg-green-500 flex align-middle justify-center  py-1  px-2 md:px-4 lg:px-8 xl:px-8 2xl:px-4">
        <div class="w-11/12 flex flex-row justify-between align-middle">
            <div class="w-full inline-flex gap-2 align-middle justify-start">
                <UButton variant="ghost" label="CEND" size="md"
                    class="text-white text-md text-2xl font-bold h-full hover:text-white hover:bg-transparent" />
                <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost" size="md"
                    class="text-white text-md h-full hover:text-white hover:bg-transparent" >{{$t('nav_learn_with_cend')}}</UButton>
                <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost"  size="md"
                    class="text-white text-md h-full hover:text-white hover:bg-transparent" >{{$t('nav_tutorat')}}</UButton>
                <about />
            </div>
            <div class="w-full inline-flex gap-2 align-middle justify-end">
                <language />
                <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost" size="md"
                    class="text-white text-md h-full hover:text-white hover:bg-transparent" >{{$t('nav_help')}}</UButton>
                <UButton :ui="{ rounded: 'rounded-full' }" variant="ghost"  size="md"
                    class="text-white text-md h-full hover:text-white hover:bg-transparent"  v-show="!isAuthenticated"  @click="navigateLogin()">{{$t('nav_sign_in')}}</UButton>
                <UButton :ui="{ rounded: 'rounded-full' }" variant="solid" size="md"
                    class="bg-white text-green-500 text-sm hover:text-green-300 hover:bg-green-500"  v-show="!isAuthenticated">{{$t('nav_register')}}</UButton>
                    <UButton :ui="{ rounded: 'rounded-full' }" variant="solid" size="md"
                    class="bg-white text-green-500 text-sm hover:text-green-300 hover:bg-green-500"  v-show="isAuthenticated" @click="logout()">{{$t('nav_sign_out')}}</UButton>
                <UButton icon="i-heroicons-bars-3" size="md" variant="ghost"
                    class="text-white text-md h-full hover:text-white hover:bg-transparent block md:hidden lg:hidden xl:hidden 2xl:hidden" />
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
    definePageMeta({
        layout: 'navigation'
    });
    import { IsAuthenticated } from '~/scripts/jwt';
    import { LocalStorageremoveItem } from '~/scripts/local-storage';
    import { loginRoute } from '~/scripts/routes';
    const toast = useToast();
    let isAuthenticated = IsAuthenticated();
    
    function logout(){
        LocalStorageremoveItem("AuthTkn");
        isAuthenticated = IsAuthenticated();
        navigateTo('/');
        toast.add(
                { 
                    id: "1",
                    title: 'Deconnexion', 
                    description: 'Deconnecte avec succes!',
                    icon: "i-heroicons-check-badge",
                    
                }
            )
    }
    function navigateLogin(){
        navigateTo(loginRoute);
    }
</script>