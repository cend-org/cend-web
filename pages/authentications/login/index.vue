<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">Veuillez-vous connecter à votre compte {{$t(`${personType}`)}}</h1>
                <UForm :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Email" name="email">
                        <UInput class="" size="lg" v-model="state.email" placeholder="Votre email" />
                    </UFormGroup>

                    <UFormGroup label="Mots de passe" name="password">
                        <UInput size="lg" v-model="state.password" type="password" placeholder="Votre mots de passe" />
                    </UFormGroup>

                    <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
                        Connexion
                    </UButton>
                </UForm>
            </form>
            <UDivider orientation="vertical">
                <span class="text-gray-500">ou</span>
            </UDivider>
            <div class="flex flex-col gap-3">
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-200  cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">
                    <img class="absolute ml-4" src="/image/google.svg" alt="Image" width="20"></img>
                    <div class="w-full text-gray-600 text-center">Continuer avec google</div>
                </UButton>
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-200   cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">
                    <img class="absolute ml-4" src="/image/apple.svg" alt="Image" width="20"></img>
                    <div class="w-full text-gray-600 text-center">Continuer avec apple</div>
                </UButton>
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-200   cursor-pointer flex justify-content-between border-2 border-green-200 border-round-md align-items-center w-full h-3rem bg-white text-white">
                    <img class="absolute ml-4" src="/image/fb.svg" alt="Image" width="20"></img>
                    <div class="w-full text-gray-600 text-center">Continuer avec facebook</div>
                </UButton>
                <UButton size="lg" type="button"
                    class="hover:bg-green-100 hover:border-2 hover:border-green-400 text-gray-900  cursor-pointer bg-green-200 flex justify-content-between border-none border-round-md align-items-center w-full h-3rem">
                    <UIcon class="text-2xl" name="i-heroicons-qr-code ml-4"></UIcon>
                    <div class="w-full text-xs text-center">
                        Connectez-vous avec une qr-code
                    </div>
                </UButton>
            </div>
            <div class="text-[12px] text-gray-400 text-center mt-2">
                En continuant, vous acceptz de recevoir au numéro fourni des appels, messages WhatsApp ou SMS, y
                compris de façon automatisée, de la part d'Uber et de ces sociétés affiliées.
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { useValidation } from '~/composables/validations';
import { IsAuthenticated } from '~/scripts/jwt';
import { LocalStorageSetItem } from '~/scripts/local-storage';
import { nextTick } from 'vue'

const validation = useValidation();
const toast = useToast();
const route = useRoute();
console.log(route.query.label);
let personType = ref('student');
onUpdated(async () => {
    if(route.query.label){
        personType.value = route.query.label as string;
    }
});

function login() {
    GqlLogin({ email: "parent1@email.com", password: 'parent' }).then(response => {
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

const state = reactive({
    email: undefined,
    password: undefined
})

async function onSubmit() {
    if (!validation.checkEmail(state.email)) {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'Veillez vérifiez votre email!',
                icon: "i-heroicons-check-badge",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
        return;
    }

}
</script>
