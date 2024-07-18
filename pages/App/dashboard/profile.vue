<template>
  <div class="w-full flex justify-between items-center">
    <div class=" flex flex-nowrap justify-between items-center gap-2 p-4 py-8 w-full">
          <div class="w-[70px] min-w-[70px] h-[70px] max-h-[70px] bg-red-300 rounded-full"
            style="background-image: url(/image/mock/pdp.jpg)"></div>
          <div class="w-full h-full flex flex-col align-center">
            <span class="text-lg font-semibold capitalize text-gray-600">Dummy Man</span>
            <span class="text-sm font-normal capitalize text-gray-500">dumy@email.com</span>
          </div>
        </div>
        <div>
          <Button class="bg-primary mr-5">
            Enregistrer
          </Button>
        </div>
  </div>
  <div class="w-full flex flex-row gap-10 px-4">
      <left class="w-full flex flex-col gap-0">
        <div class="w-full flex flex-col gap-0">
          <label class="p-2 text-gray-800">Nom</label>
          <span class="p-2 py-3 bg-gray-200 rounded-lg text-gray-400">
            DUMMY
          </span>
        </div>
        <div class="w-full flex flex-col gap-0">
          <label class="p-2 text-gray-800">Genre</label>
          <span class="p-2 py-3 bg-gray-200 rounded-lg text-gray-400">
            Homme
          </span>
        </div>
        <div class="w-full flex flex-col gap-0">
          <label class="p-2 text-gray-800">Email</label>
          <span class="relative p-2 py-3 bg-gray-200 rounded-lg text-gray-400">
            dumy@email.com
            <Button class="absolute right-0 top-0 mt-[7px] mr-2 bg-gray-100 border-0 shadow-none text-gray-600 rounded-xl hover:bg-gray-100 hover:text-primary" size="icon">
              <Edit class="w-6 h-6  hover:rotate-12" />
            </Button>
          </span>
        </div>
        <div class="w-full flex flex-col gap-0">
          <label class="p-2 text-gray-800">Mot de passe</label>
          <span class="relative p-2 py-3 bg-gray-200 rounded-lg text-gray-400">
            ********************
            <Button class="absolute right-0 top-0 mt-[7px] mr-2 bg-gray-100 border-0 shadow-none text-gray-600 rounded-xl hover:bg-gray-100 hover:text-primary" size="icon">
              <Edit class="w-6 h-6  hover:rotate-12" />
            </Button>
          </span>
        </div>
      </left>

      <right class="w-full">
        <div class="w-full flex flex-col gap-0">
          <label class="p-2 text-gray-800">Prénom</label>
          <span class="p-2 py-3 bg-gray-200 rounded-lg text-gray-400">
            Man
          </span>
        </div>
        <div class="w-full flex flex-col gap-0">
          <label class="p-2 text-gray-800">Adresse</label>
          <span class="p-2 py-3 bg-gray-200 rounded-lg text-gray-400">
            ANTANANARIVO
          </span>
        </div>
        <div class="w-full flex flex-col gap-0">
          <label class="p-2 text-gray-800">Téléphone</label>
          <span class="relative p-2 py-3 bg-gray-200 rounded-lg text-gray-400">
            +261388133589
            <Button class="absolute right-0 top-0 mt-[7px] mr-2 bg-gray-100 border-0 shadow-none text-gray-600 rounded-xl hover:bg-gray-100 hover:text-primary" size="icon">
              <Edit class="w-6 h-6  hover:rotate-12" />
            </Button>
          </span>
        </div>
      </right>
  </div>
</template>
<script setup lang="ts">
import { Bell, Edit } from 'lucide-vue-next'
   const loading = useLoadingStore();
</script>