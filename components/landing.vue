<template>
  <div class="w-full flex justify-center mt-16">
    <div class="p-2 w-full lg:w-8/12 xl:w-8/12 2xl:w-8/12 flex flex-col gap-10 lg:gap-20 xl:gap-20 2xl:gap-20">
      <section
        class="flex gap-4 justify-between align-middle w-full  flex-col  flex-col-reverse lg:flex-row xl:flex-row 2xl:flex-row">

        <h1
          class="pt-3 text-3xl lg:text-5xl xl:text-5xl 2xl:text-5xl  text-center lg:text-left xl:text-left 2xl:text-left poppins-bold flex flex-col gap-2 lg:gap-4 xl:gap-4 2xl:gap-4">
          <div>{{ $t('landing_text_login') }}</div>
          <div>{{ $t('landing_text_to_access') }}</div>
          <div>{{ $t('landing_text_your_account') }}</div>
        </h1>
        <div class="flex w-full justify-center lg:hidden xl:hidden 2xl:hidden ">
          <div class="w-[100px] h-[100px]"
            style="background: url(/image/cend_logo.png); background-size: contain; background-repeat: no-repeat; background-position: center;">
          </div>
        </div>
        <img src="/image/cend_logo.png" alt="" class="cursor-pointer hidden lg:block xl:block 2xl:block">
      </section>
      <section class="flex font-bold flex-col gap-12 justify-between poppins-bold">
        <div class="flex flex-col gap-4 w-full h-28  lg:flex-row xl:flex-row 2xl:flex-row">
          <button @click="login('student')"
            class="py-4 bg-gray-transparent hover:bg-green-50 border-b-2 hover:border-[#3A9B23] hover:text-[#3A9B23] border-gray-800 w-full h-full flex justify-between align-middle items-center text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl poppins-bold">
            <div class="w-full text-left ml-5">{{ $t('student') }}</div>
            <UIcon class="mr-5" name="i-heroicons-arrow-right" />
          </button>
          <button @click="login('parent')"
            class="py-4  bg-gray-transparent hover:bg-green-50 border-b-2 hover:border-[#3A9B23] hover:text-[#3A9B23]  border-gray-800 w-full h-full flex justify-between align-middle items-center text-2xl poppins-bold">
            <div class="w-full text-left ml-5">{{ $t('parent') }}</div>
            <UIcon class="mr-5" name="i-heroicons-arrow-right" />
          </button>
        </div>

        <div class="flex flex-col gap-4 w-full h-28  lg:flex-row xl:flex-row 2xl:flex-row">
          <button @click="login('tutor')"
            class="py-4 bg-gray-transparent hover:bg-green-50 border-b-2 hover:border-[#3A9B23] hover:text-[#3A9B23]  border-gray-800 w-full h-full flex justify-between align-middle items-center text-2xl poppins-bold">
            <div class="w-full text-left ml-5">{{ $t('tutor') }}</div>
            <UIcon class="mr-5" name="i-heroicons-arrow-right" />
          </button>
          <button @click="login('teacher')"
            class="py-4 bg-gray-transparent hover:bg-green-50 border-b-2 hover:border-[#3A9B23] hover:text-[#3A9B23]  border-gray-800 w-full h-full flex justify-between align-middle items-center text-2xl poppins-bold">
            <div class="w-full text-left ml-5">{{ $t('teacher') }}</div>
            <UIcon class="mr-5" name="i-heroicons-arrow-right" />
          </button>
        </div>

      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from '#imports';
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
loadingStore.hide();
// if (authStore.isAuthenticated()) {
//     navigateTo('/dashboard/landing');
// }

function login(params: string){
  navigateTo({path: '/authentications/login', query: {label: params}})
}
</script>