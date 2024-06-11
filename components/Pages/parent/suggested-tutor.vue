<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">{{ $t('register_suggested_tutor') }}
                </h1>
                <UForm :state="state" class="space-y-6" @submit="onSubmit">
                    <div class="video">
                        <div class="w-full h-[10rem] bg-gray-200 relative">
                            <video ref="videoRef" class="w-full h-full" controlslist="nodownload">
                                <source v-bind:src="profileVideoLink">
                            </video>
                            <div class="h-full w-[35px]  gap-2 absolute top-0 right-0">
                                <div class="flex flex-col gap-2 py-2">
                                    <UButton v-if="videoState == 'pause'" class="w-[30px] h-[30px]"
                                        icon="i-heroicons-play" size="sm" color="primary" square variant="soft"
                                        @click="play()" />
                                    <UButton v-if="videoState == 'play'" class="w-[30px] h-[30px]"
                                        icon="i-heroicons-pause" size="sm" color="primary" square variant="soft"
                                        @click="pause()" />
                                    <UButton class="w-[30px] h-[30px]" icon="i-heroicons-arrow-path" size="sm"
                                        color="primary" square variant="soft" @click="reset()" />
                                    <UButton class="w-[30px] h-[30px]" icon="i-heroicons-arrows-pointing-out" size="sm"
                                        color="primary" square variant="soft" @click="fullScreen()" />
                                </div>
                            </div>
                        </div>
                        <div class=" relative w-[110px] h-[110px] bg-green-500 rounded-full -mt-[4rem] ml-3 bg-cover bg-no-repeat border-4 border-gray-300"
                            v-bind:style="{ 'background-image': 'url(' + profileImageLink + ')' }">
                        </div>
                        <div class="w-full flex justify-center -mt-[2.5rem]">
                            <div class="flex flex-col gap-0 ml-[110px] lg:ml-[20px] xl:ml-[20px] 2xl:ml-[20px]">
                                <span class="poppins-bold font-bold">{{ tutorStore.tutor.Name }} {{
                                    tutorStore.tutor.FamilyName }}</span>
                            </div>
                        </div>
                        <div class="py-4">
                            <div class="text-xs poppins-medium h-[26vh] overflow-y-scroll text-balance"
                                style="scrollbar-width: none !important;">
                                <span v-if="tutorStore.tutor.Id">
                                    << </span>
                                        {{ tutorStore.tutor.Profile }}
                                        {{ tutorStore.tutor.AdditionalDescription }}
                                        {{ tutorStore.tutor.ExperienceDetail }}
                                        <span v-if="tutorStore.tutor.Id">>></span>
                            </div>
                        </div>
                        <div class="w-full flex justify-end py-1">
                            <div class="">
                                <div class="py-1 flex justify-end">
                                    <UButton @click="chooseAnotherTutor()" size="sm" type="button"
                                        class="text-xs text-gray-900 bg-light-green hover:bg-green-300">
                                        {{ $t('register_choose_suggested_tutor') }}
                                    </UButton>
                                </div>
                                <div class="py-1 flex justify-end">
                                    <UButton @click="continueWithoutTutor()" size="sm" type="button"
                                        class="text-xs text-gray-900 bg-light-green hover:bg-green-300">
                                        {{ $t('register_continue_without_tutor') }}
                                    </UButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
                        <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
                            {{ $t(`accept`) }}
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
import { environment } from '~/scripts/environment';
import { LocalStorageGetItem } from '~/scripts/local-storage';
const calendar = useModal();
const loadingStore = useLoadingStore();
loadingStore.hide();
const calendarStore = useCalendarStore();
const videoRef = ref<HTMLVideoElement | null>(null);
const tutorStore = useTutorStore();
const toast = useToast();

let profileImageLink = ref(tutorStore.profileImage);
let profileVideoLink = ref(tutorStore.video);
const state = reactive({
    hour0: undefined,
    date: '',
    hour1: undefined
})

function focusDate() {
    calendar.open(Calendar, {
        onClose() {
            calendar.close();
        },
        onConfirm() {
            state.date = calendarStore.formatedDate;
            calendar.close();

        }
    })
}
useGqlToken({
    token: `${LocalStorageGetItem(environment.auth_token)}`,
    config: {
        type: 'Bearer',
        name: 'Authorization'
    }
});
async function onSubmit() {
    loadingStore.show();
    const currentTutorId = parseInt(tutorStore.tutor.Id);
    let studentId = LocalStorageGetItem(`${environment.parent_child_id}`);
    if (studentId) {
        GqlNewStudentTutorByParent({ tutorId: currentTutorId, studentId: parseInt(studentId) }).then(response => {
            navigateTo("/authentications/register/parent/tarif");
        }, error => {
            loadingStore.hide();
            toast.add(

                {
                    id: "1",
                    title: 'Info!',
                    description: 'Une erreur est survenue!',
                    icon: "i-heroicons-exclamation-triangle",
                    color: "orange",
                    ui: {
                        background: "bg-orange-100"
                    }
                }
            )
        });
    } else {
        loadingStore.hide();
        toast.add(

            {
                id: "1",
                title: 'Info!',
                description: 'Une erreur est survenue!',
                icon: "i-heroicons-exclamation-triangle",
                color: "orange",
                ui: {
                    background: "bg-orange-100"
                }
            }
        )
    }

}

let videoState = ref('pause');
function pause() {
    if (videoRef.value) {
        videoRef.value.pause();
        videoState.value = 'pause'
    }
}

function reset() {
    if (videoRef.value) {
        videoRef.value.currentTime = 0;
        play()
    }
}

function play() {
    if (videoRef.value) {
        videoRef.value.play();
        videoState.value = 'play'
    }
}
function fullScreen() {
    if (videoRef.value) {
        videoRef.value.requestFullscreen();
    }
}
function continueWithoutTutor() {
    loadingStore.show();
    setTimeout(() => {
        navigateTo("/authentications/register/parent/no-tutor-final");
    }, 500);
}

function chooseAnotherTutor() {
    loadingStore.show();
    const currentTutorId = parseInt(tutorStore.tutor.Id);
    let studentId = LocalStorageGetItem(environment.parent_child_id);
    if (studentId) {
        GqlSuggestOtherTutor({ tutorId: currentTutorId, studentId: parseInt(studentId) }).then(response => {
            tutorStore.remove();

            if (response.SuggestOtherTutor) {
                getProfileImage(response.SuggestOtherTutor.Id);
                getProfileVideo(response.SuggestOtherTutor.Id);
                tutorStore.tutor = response.SuggestOtherTutor;
                loadingStore.hide();
            } else {
                toast.add(
                    {
                        id: "1",
                        title: 'Info!',
                        description: 'Nous n\'avons pas pu trouver d\autre tuteur.',
                        icon: "i-heroicons-exclamation-triangle",
                        color: "orange",
                        ui: {
                            background: "bg-orange-100"
                        }
                    }
                )
            }
            loadingStore.hide();
        }, error => {
            loadingStore.hide();
            toast.add(
                {
                    id: "1",
                    title: 'Info!',
                    description: 'Nous n\'avons pas pu trouver d\autre tuteur.',
                    icon: "i-heroicons-exclamation-triangle",
                    color: "orange",
                    ui: {
                        background: "bg-orange-100"
                    }
                }
            )
        });
    } else {
        toast.add(
            {
                id: "1",
                title: 'Info!',
                description: 'Nous n\'avons pas pu trouver d\autre tuteur.',
                icon: "i-heroicons-exclamation-triangle",
                color: "orange",
                ui: {
                    background: "bg-orange-100"
                }
            }
        )
    }


}
function getProfileImage(Id: string) {
    loadingStore.show();
    GqlUserProfileImage({ tutorId: parseInt(Id) }).then(response => {
        tutorStore.profileImage = response.UserProfileImage as string;
        profileImageLink.value = response.UserProfileImage as string;
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
        profileVideoLink.value = response.UserVideoPresentation as string;
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
