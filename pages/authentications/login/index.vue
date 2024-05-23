<template>
    <div class="w-full flex justify-center mt-16">
      <div class= "p-2 w-8/12 flex flex-col gap-20">
       LOGIN PAGE
       <button @click="login()" >Login</button>
    </div>
    </div>
</template>
<script setup lang="ts">
import { IsAuthenticated } from '~/scripts/jwt';
import { LocalStorageSetItem } from '~/scripts/local-storage';
    const toast = useToast();
    function login(){
        GqlLogin({email: "parent1@email.com", password: 'parent'}).then(response=>{
            LocalStorageSetItem("AuthTkn", response.Login?.T);
          //  useIsAuthenticated(true);
            toast.add(
                { 
                    id: "1",
                    title: 'Connexion', 
                    description: 'Connecte avec succes!',
                    icon: "i-heroicons-check-badge",
                    
                }
            )
        });
    } 
</script>