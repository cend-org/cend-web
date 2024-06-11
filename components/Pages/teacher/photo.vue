<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2"> {{ $t('register_photo_upload_tutor') }}
                </h1>
                <UForm :state="state" class="space-y-2" @submit="onSubmit">
                    <input type="file" ref="fileInput" style="display: none !important;" @change="onFileSelected()">
                    <div class="relative w-full h-[30vh] bg-light-green  bg-no-repeat bg-contain bg-center"
                        v-bind:style="{ 'background-image': 'url(' + profilePhoto + ')' }">
                        <button type="button" @click="fileClick()" class="w-full h-full  border-0">

                        </button>
                        <div class="bg-white text-[10px] text-center w-full absolute bottom-0 p-1">{{ $t('accepted') }}:
                            <span class="text-color-main ">{{ acceptedExtensions() }}</span></div>
                    </div>
                    <div class="mb-2 p-2 pt-4 flex flex-row justify-content-center gap-3">
                        <UIcon name="i-heroicons-light-bulb" class="text-3xl text-gray-400" />
                        <span class="text-sm text-thin text-gray-400">
                            {{ $t('teacher_photo_legend') }}
                        </span>
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
import { environment } from '~/scripts/environment';
import { FiletypesEnum } from '~/scripts/files';
import { LocalStorageGetItem } from '~/scripts/local-storage';
const loadingStore = useLoadingStore();
loadingStore.hide();
const toast = useToast();
const fileInput = ref<HTMLInputElement | null>(null);
let profilePhoto = ref("/image/upload.svg");
const state = reactive({

});
let photo = ref();

function acceptedExtensions() {
    let accepted = environment.accepted_photos as Array<string>;
    return accepted.map(x => x).join(', ');
}

function onFileSelected() {
    if (fileInput.value) {
        if (fileInput.value.files?.length != null && fileInput.value.files?.length > 0) {
            let file = fileInput.value.files[0];
            let extension: string = file.name.substring(file?.name.lastIndexOf('.') + 1);
            let reader = new FileReader();
            if (!environment.accepted_photos.includes(extension)) {
                toast.add(
                    {
                        id: "1",
                        title: 'Erreur!',
                        description: 'Type de photo non prise en charge!',
                        icon: "i-heroicons-exclamation-triangle",
                        color: "red",
                        ui: {
                            background: "bg-red-100"
                        }
                    },
                );
            } else {
                photo.value = file;
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    if (event.target) {
                        profilePhoto.value = event.target.result as any;
                    }
                }
            }
        }
    }
}
function fileClick() {
    if (fileInput.value) {
        fileInput.value.click();
    }
}
async function onSubmit() {
    const formData = new FormData();
    formData.append('documentType', JSON.stringify(FiletypesEnum.USER_PROFILE_IMAGE));
    formData.append('file', photo.value);
    const options = {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${LocalStorageGetItem(environment.auth_token)}`,
        }
    };
    if (!photo.value) {
        toast.add(
            {
                id: "1",
                title: 'Erreur!',
                description: 'Veuillez ajouter une photo!',
                icon: "i-heroicons-exclamation-triangle",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            },
        );
        return;
    }

    loadingStore.show();
    fetch(`${environment.api}${environment.upload_url}`, options).then((res) => {
        if (res.status == 200) {
            navigateTo("/authentications/register/teacher/student");
        } else {
            loadingStore.hide();
            toast.add(
                {
                    id: "1",
                    title: 'Erreur!',
                    description: 'Une erreur est survenue lors du traitement!',
                    icon: "i-heroicons-exclamation-triangle",
                    color: "red",
                    ui: {
                        background: "bg-red-100"
                    }
                },
            );
        }
    });
}

</script>