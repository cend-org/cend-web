<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[20rem] xl:w-[20rem] 2xl:w-[20rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2">
                <h1 class="text-center text-2xl text-gray-600 poppins-bold py-2">{{$t('register_fill_about')}}</h1>
                <UForm :state="state" class="space-y-4" @submit="onSubmit">
                    <div class="flex flex-row gap-2">
                        <UFormGroup :label="$t('register_name')" name="nom">
                        <UInput size="lg" v-model="state.name" type="text"  :placeholder="$t('register_name_label')"/>
                    </UFormGroup>

                    <UFormGroup :label="$t('register_familyname')" name="prenom">
                        <UInput size="lg" v-model="state.familyName" type="text"  :placeholder="$t('register_familyname_label')"/>
                    </UFormGroup>
                    </div>

                    <UFormGroup label="Date de naissance" name="date-of-birth">
                     <UInput @click="focusBirthDate()" size="lg" v-model="state.birthDate" type="text"  placeholder="Votre date de naissance"/>
                     <calendar />
                    </UFormGroup>

                    <UFormGroup label="Votre Sexe" name="sex">
                        <UPopover :popper="{ arrow: true,  placement: 'bottom-start' }" class="w-full sex-dropdown" >
                        <UButton size="lg" color="white" :label="selectedSex.label" trailing-icon="i-heroicons-chevron-down-20-solid poppins-regular text-md text-gray-400" class="w-full flex justify-between" />

                        <template #panel>
                        <div class="p-4 flex flex-col gap-1">
                           <UButton v-for="(sex, index) in sexList" class="bg-color-main" block @click="onSelectSex(sex)">{{ sex.label }}</UButton>

                        </div>
                        </template>
                    </UPopover>
                    </UFormGroup>
                    

                    <div class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
                    <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
                        {{$t(`continue`)}}
                    </UButton>
                   </div>
                </UForm>
            </form>
        </div>
    </div>
</template>
<style>
.sex-dropdown div:nth-of-type(2) {
     width: 99%;
     margin-left: -2px !important;
}
</style>
<script setup lang="ts">

import Calendar from '~/components/calendar.vue';
import { useValidation } from '~/composables/validations';
import { LocalStorageSetItem } from '~/scripts/local-storage';
import { SexList } from '~/scripts/sex';

const validation = useValidation();
const loadingStore = useLoadingStore();
const toast = useToast();
const isBirthDateCalendarOpen = ref(false);
const calendar = useModal();
const calendarStore = useCalendarStore();
const sexList = ref(SexList)
let selectedSex = {label: 'choisir votre sexe', value: ''};
function onSelectSex(sex: any){
    selectedSex = sex;
}
function login() {
    GqlLogin({ email: "parent1@email.com", password: 'parent' }).then(response => {
        LocalStorageSetItem("AuthTkn", response.Login?.T);
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
    name: undefined,
    familyName: undefined,
    birthDate: '',
})

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
        navigateTo("/authentications/register/student/about");
    }, 500);

}

function focusBirthDate(){
    calendar.open(Calendar, {
    onClose(){
        calendar.close();
    },
    onConfirm(){
        state.birthDate = calendarStore.formatedDate;
        calendar.close();
    }
  })
}
</script>
