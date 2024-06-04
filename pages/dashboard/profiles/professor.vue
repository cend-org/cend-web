<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">Voici le meilleur tuteur pour convenir à vos besoins :</h1>
                <UForm :state="state" class="space-y-6" @submit="onSubmit">
                    <div class="video">
                        <div class="w-full h-[10rem] bg-gray-200 relative">
                            <video ref="videoRef" class="w-full h-full" id="video">
                                <source src="/videos/lapin.mp4">
                            </video>
                            <div class="h-full w-[35px]  gap-2 absolute top-0 right-0">
                                <div class="flex flex-col gap-2 py-2">
                                    <UButton v-if="videoState == 'pause'"
                                class="w-[30px] h-[30px]"
                                    icon="i-heroicons-play"
                                    size="sm"
                                    color="primary"
                                    square
                                    variant="soft"
                                    @click="play()"
                                />
                                <UButton v-if="videoState == 'play'"
                                class="w-[30px] h-[30px]"
                                    icon="i-heroicons-pause"
                                    size="sm"
                                    color="primary"
                                    square
                                    variant="soft"
                                    @click="pause()"
                                />
                                <UButton
                                class="w-[30px] h-[30px]"
                                    icon="i-heroicons-arrow-path"
                                    size="sm"
                                    color="primary"
                                    square
                                    variant="soft"
                                    @click="reset()"
                                />
                                </div>
                            </div>
                        </div>
                        <div class=" relative w-[110px] h-[110px] bg-green-500 rounded-full -mt-[4rem] ml-3 bg-cover bg-no-repeat border-4 border-gray-300" style="background-image: url('/image/mock/pdp.jpg');">

                        </div>
                        <div class="w-full flex justify-center -mt-[2.5rem]">
                            <div class="flex flex-col gap-0 ml-[110px] lg:ml-[20px] xl:ml-[20px] 2xl:ml-[20px]" >
                                <span class="poppins-bold font-bold">NAO JULIUS</span>
                                <span class="text-xs text-gray-500">Mathematiques appliques</span>
                            </div>
                        </div>
                        <div class="py-4">
                            <div class="text-xs poppins-medium h-[28vh] overflow-y-scroll" style="scrollbar-width: none !important;">
                           << Use the prevent-close prop to disable the outside click alongside the esc keyboard shortcut. A close-prevented event will be emitted when the user tries to close the modal.
                            Use the prevent-close prop to disable the outside click alongside the esc keyboard shortcut. A close-prevented event will be emitted when the user tries to close the modal.
                            Use the prevent-close prop to disable the outside click alongside the esc keyboard shortcut. A close-prevented event will be emitted when the user tries to close the modal.
                            Use the prevent-close prop to disable the outside click alongside the esc keyboard shortcut. A close-prevented event will be emitted when the user tries to close the modal.
                            Use the prevent-close prop to disable the outside click alongside the esc keyboard shortcut. A close-prevented event will be emitted when the user tries to close the modal.
                            Use the prevent-close prop to disable the outside click alongside the esc keyboard shortcut. A close-prevented event will be emitted when the user tries to close the modal. >>
                        </div>
                        </div>
                        <div class="w-full flex justify-end py-1">
                            <div class="">
                               <div class="py-1 flex justify-end"> 
                                <UButton size="sm" type="button" class="text-xs text-gray-900 bg-light-green hover:bg-green-300">
                                    Choisir un autre tuteur ?
                                </UButton>
                            </div>
                                <div  class="py-1 flex justify-end">
                                    <UButton @click="continueWithoutTutor()" size="sm" type="button" class="text-xs text-gray-900 bg-light-green hover:bg-green-300">
                                    Continuer sans tuteur pour le moment ?
                                </UButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
                        <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
                            {{ $t(`continue`) }}
                        </UButton>
                    </div>
                </UForm>
            </form>
        </div>
    </div>
</template>
<style>
.mobile-sex-dropdown div:nth-of-type(2) {
    width: 88%;
}

.desktop-sex-dropdown div:nth-of-type(2) {
    width: 20%;
    margin-left: 3px !important;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';

import Calendar from '~/components/calendar.vue';
import Time from '~/components/time.vue';
import { useValidation } from '~/composables/validations';
import { format } from 'date-fns';
const time = useModal();
const calendar = useModal();
const loadingStore = useLoadingStore();
const calendarStore = useCalendarStore();
const timeStore = useTimeStore();
const videoRef = ref<HTMLVideoElement | null>(null);
function login() {
    // GqlLogin({ email: "parent1@email.com", password: 'parent' }).then(response => {
    //     LocalStorageSetItem(environment.auth_token, response.Login?.T);
    //     toast.add(
    //         {
    //             id: "1",
    //             title: 'Connexion',
    //             description: 'Connecte avec succes!',
    //             icon: "i-heroicons-check-badge",

    //         }
    //     )
    // });
}

const state = reactive({
    hour0: undefined,
    date: '',
    hour1: undefined
})
function focusTime(_slot: number){
    time.open(Time, {
    slot: _slot,
    onClose(){
        time.close();
    },
    onConfirm(){
        if(timeStore.get(0)?.value){
            state.hour0 = timeStore.get(0)?.value;
        }
        if(timeStore.get(1)?.value){
            state.hour1 = timeStore.get(1)?.value;
        }
        time.close();
        
    }
  });
}


// function focush1Time(){
//     time.open(Time, {
//     onClose(){
//         time.close();
//     },
//     onConfirm(){
//         //state.birthDate = calendarStore.formatedDate;
//         alert(timeStore.get(1)?.value)
//         time.close();
        
//     }
//   });
// }

function focusDate(){
    calendar.open(Calendar, {
    onClose(){
        calendar.close();
    },
    onConfirm(){
        state.date = calendarStore.formatedDate;
        calendar.close();
        
    }
  })
}
async function onSubmit() {
    // if (!validation.checkPasswords(state.password, state.passwordConfirm)) {
    //     toast.add(
    //         {
    //             id: "1",
    //             title: 'Validation',
    //             description: 'Veillez vérifiez votre mots de passe!',
    //             icon: "i-heroicons-check-badge",
    //             color: "red",
    //             ui: {
    //                 background: "bg-red-100"
    //             }
    //         }
    //     )
    //     return;
    // }
    loadingStore.show();
    setTimeout(() => {
        loadingStore.hide();
        navigateTo("/authentications/register/student/tarif");
    }, 500);

    

}

let videoState = ref('pause');
function pause(){
    if (videoRef.value) {
    videoRef.value.pause();
    videoState.value = 'pause'
  }
}

function reset(){
    if (videoRef.value) {
    videoRef.value.currentTime = 0;
    play()
  }
}

function play(){
    if (videoRef.value) {
    videoRef.value.play();
    videoState.value = 'play'
  }
}

function continueWithoutTutor(){
    loadingStore.show();
    setTimeout(() => {
        loadingStore.hide();
        navigateTo("/authentications/register/student/no-tutor-final");
    }, 500);
}
</script>
