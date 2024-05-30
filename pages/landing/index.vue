<template>
    <div class="w-full flex justify-center mt-16">
      <div class= "p-2 w-8/12 flex flex-col gap-20">
        <section class="flex gap-4 justify-between align-middle w-full">
            <h1 class="text-5xl poppins-bold flex flex-col gap-4 animate-pulse">
              <div>{{$t('landing_text_login')}}</div>
              <div>{{$t('landing_text_to_access')}}</div>
              <div>{{$t('landing_text_your_account')}}</div>
            </h1>
            <img src="/image/cend_logo.png" alt="" class="cursor-pointer">
        </section>
        <section class="flex font-bold flex-col gap-4 justify-between poppins-bold" >
            <div class="inline-flex gap-4 w-full h-28 ">
              <button class="bg-gray-transparent hover:bg-green-50 border-b-2 hover:border-green-400 hover:text-green-500 border-gray-800 w-full h-full flex justify-between align-middle items-center text-2xl poppins-bold">
                  <div class="w-full text-left ml-5">{{$t('student')}}</div>
                  <UIcon class="mr-5" name="i-heroicons-arrow-right"  />
              </button>
              <button class="bg-gray-transparent hover:bg-green-50 border-b-2 hover:border-green-400 hover:text-green-500 border-gray-800 w-full h-full flex justify-between align-middle items-center text-2xl poppins-bold">
                  <div class="w-full text-left ml-5">{{$t('parent')}}</div>
                  <UIcon class="mr-5" name="i-heroicons-arrow-right" />
              </button>
            </div>
            <div class="inline-flex gap-4 w-full h-28">
              <button class="bg-gray-transparent hover:bg-green-50 border-b-2 hover:border-green-400 hover:text-green-500 border-gray-800 w-full h-full flex justify-between align-middle items-center text-2xl poppins-bold">
                  <div class="w-full text-left ml-5">{{$t('tutor')}}</div>
                  <UIcon class="mr-5" name="i-heroicons-arrow-right" />
              </button>
              <button class="bg-gray-transparent hover:bg-green-50 border-b-2 hover:border-green-400 hover:text-green-500 border-gray-800 w-full h-full flex justify-between align-middle items-center text-2xl poppins-bold">
                  <div class="w-full text-left ml-5">{{$t('teacher')}}</div>
                  <UIcon class="mr-5" name="i-heroicons-arrow-right" />
              </button>
            </div>
            
        </section>
    </div>
    </div>
  </template>