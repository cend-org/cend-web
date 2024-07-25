<template>
   <h1 class="font-bold text-xl">Mes notifications</h1>
   <div class="py-2 flex flex-col gap-2 w-full">
        <div class="w-full h-full shadow p-2 flex flex-row gap-2">
             <Settings/>
             <div class="w-full">
                 <h1 class="font-semibold">Modification de mots de passe</h1>
                 <div class="py-1 text-gray-400">
                    Votre mots de passe a été changé avec succès !
                 </div>
                 <div  class="text-xs text-right text-gray-400">
                    Lundi, 07 mars 2024 11h40
                 </div>
             </div>
        </div>
        <div class="w-full h-full shadow p-2 flex flex-row gap-2">
             <Settings/>
             <div class="w-full">
                 <h1 class="font-semibold">Information de connection</h1>
                 <div class="py-1  text-gray-400">
                    Vous vous êtes connecté à l'application avec succès!
                 </div>
                 <div  class="text-xs text-right text-gray-400">
                    Lundi, 07 mars 2024 11h40
                 </div>
             </div>
        </div>
        
   </div>
   <!-- <div class="h-full flex pt-10 justify-center">
        <span class="w-1/2 text-center text-sm text-gray-400">
            vous n'avez pas de nouvelle notifications pour le moment !
        </span>
   </div> -->
  </template>
<script setup lang="ts">
    import {Cog, Settings} from 'lucide-vue-next'
</script>