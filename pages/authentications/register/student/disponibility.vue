<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">Quelles sont vos disponibilités pour la première rencontre avec le tuteur ?</h1>
                <UForm :state="state" class="space-y-6" @submit="onSubmit">
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-row gap-2">
                            <span>Vous préférez demain à </span>
                            <input v-model="state.hour0" @click="focusTime(0)" type="text" class="text-color-main text-center hour-input bg-gray-200 w-[70px] h-[25px] rounded-lg text-center">
                            <span>h</span>
                        </div>
                        <div class="w-full flex justify-end">
                            <div class="flex flex-row gap-2">
                                <span>ou </span>
                                <input v-model="state.date" @click="focusDate()" type="text" class="text-color-main text-center hour-input bg-gray-200 w-[100px] rounded-lg text-center">
                                <span>à</span>
                                <input  v-model="state.hour1"  @click="focusTime(1)" type="text" class="text-color-main text-center hour-input bg-gray-200 w-[70px] rounded-lg text-center">
                                <span>h?</span>
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

import Calendar from '~/components/calendar.vue';
import Time from '~/components/time.vue';
import { useValidation } from '~/composables/validations';
import { format } from 'date-fns';
const time = useModal();
const calendar = useModal();
const loadingStore = useLoadingStore();
const calendarStore = useCalendarStore();
const timeStore = useTimeStore();
function login() {
    // GqlLogin({ email: "parent1@email.com", password: 'parent' }).then(response => {
    //     LocalStorageSetItem("AuthTkn", response.Login?.T);
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
        navigateTo("/authentications/register/student/suggested-tutor");
    }, 500);

    

}
</script>
