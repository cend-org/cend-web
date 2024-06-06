<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">{{ $t('register_disponibility') }}</h1>
                <UForm :state="state" class="space-y-6" @submit="onSubmit">
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-row gap-2">
                            <span>{{ $t('register_you_prefer_at') }} </span>
                            <input v-model="state.hour0" @click="focusTime(0)" type="text" name="hour0"
                                class="text-color-main text-center hour-input bg-gray-200 w-[70px] h-[25px] rounded-lg text-center">
                            <span>h</span>
                        </div>
                        <div class="w-full flex justify-end">
                            <div class="flex flex-row gap-2">
                                <span>{{ $t('register_or') }} </span>
                                <input v-model="state.date" @click="focusDate()" type="text" name="date"
                                    class="text-color-main text-center hour-input bg-gray-200 w-[100px] rounded-lg text-center">
                                <span>{{ $t('at') }}</span>
                                <input v-model="state.hour1" @click="focusTime(1)" type="text" name="hour1"
                                    class="text-color-main text-center hour-input bg-gray-200 w-[70px] rounded-lg text-center">
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
import { environment } from '~/scripts/environment';
import { LocalStorageSetItem } from '~/scripts/local-storage';
const time = useModal();
const calendar = useModal();
const loadingStore = useLoadingStore();
loadingStore.hide();
const calendarStore = useCalendarStore();
const timeStore = useTimeStore();
const toast = useToast();
const tutorStore = useTutorStore();
const state = reactive({
    hour0: undefined,
    date: '',
    hour1: undefined, 
    normalDate: '',
})
function focusTime(_slot: number) {
    time.open(Time, {
        slot: _slot,
        onClose() {
            time.close();
        },
        onConfirm() {
            if (timeStore.get(0)?.value) {
                state.hour0 = timeStore.get(0)?.value;
            }
            if (timeStore.get(1)?.value) {
                state.hour1 = timeStore.get(1)?.value;
            }
            time.close();

        }
    });
}

function focusDate() {
    calendar.open(Calendar, {
        onClose() {
            calendar.close();
        },
        onConfirm() {
            state.date = calendarStore.formatedDate;
            state.normalDate = calendarStore.date.toDateString();
            calendar.close();

        }
    })
}
function formatapointmentDate(): Date{
    let apointmentDate = new Date(state.normalDate);
    if(state.hour1){
        let d = state.hour1 as any;
        d = d.split(':');
        let h = parseInt(d[0]);
        let m = parseInt(d[1]);

        apointmentDate.setUTCSeconds(0);
        apointmentDate.setUTCMilliseconds(0);
        apointmentDate.setUTCHours(h);
        apointmentDate.setUTCMinutes(m);
    }
    return apointmentDate;
}
async function onSubmit() {
    if (!state.hour0 || !state.hour1 || !state.date || !state.normalDate) {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'informations incomplètes!',
                icon: "i-heroicons-check-badge",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
        return;
    }

    loadingStore.show();
    let apointment = formatapointmentDate();
    LocalStorageSetItem(environment.student_dispo_hour_0, `${state.hour0}`);
    LocalStorageSetItem(environment.student_dispo_hour_1, `${state.hour1}`);
    LocalStorageSetItem(environment.student_dispo_date, `${state.date}`);
    GqlNewUserAppointment({availability: {Availability: apointment}}).then(response => {
        GqlSuggestTutorToUser().then(response => {
        if (response.SuggestTutorToUser != null) {
            getProfileImage(response.SuggestTutorToUser.Id);
            getProfileVideo(response.SuggestTutorToUser.Id);
            tutorStore.tutor = response.SuggestTutorToUser;
            LocalStorageSetItem(environment.student_tutor_name, `${response.SuggestTutorToUser.Name} ${response.SuggestTutorToUser.FamilyName}`);
            navigateTo("/authentications/register/student/suggested-tutor");
        }else{
            navigateTo("/authentications/register/student/no-tutor");
        }
        }, error => {
            loadingStore.hide();
            toast.add(
                {
                    id: "1",
                    title: 'Erreur!',
                    description: 'Une erreur est survenue pendant l\'opérations!',
                    icon: "i-heroicons-exclamation-triangle",
                    color: "red",
                    ui: {
                        background: "bg-red-100"
                    }
                }
            )
            
        });
    });
    


}

function getProfileImage(Id: string) {
    loadingStore.show();
    GqlUserProfileImage({ tutorId: parseInt(Id) }).then(response => {
        tutorStore.profileImage = response.UserProfileImage as string;
    }, error => {
        loadingStore.hide();
        toast.add(
            {
                id: "1",
                title: 'Erreur!',
                description: 'Une erreur est survenue pendant l\'opérations!',
                icon: "i-heroicons-exclamation-triangle",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
    });
}

function getProfileVideo(Id: string) {
    loadingStore.show();
    GqlUserVideoPresentation({ tutorId: parseInt(Id) }).then(response => {
        tutorStore.video = response.UserVideoPresentation as string;
    }, error => {
        loadingStore.hide();
        toast.add(
            {
                id: "1",
                title: 'Erreur!',
                description: 'Une erreur est survenue pendant l\'opérations!',
                icon: "i-heroicons-exclamation-triangle",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
    });
}
</script>
