<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">   {{ $t('register_cv_tutor') }}
                </h1>
                <UForm :state="state" class="space-y-2" @submit="onSubmit">
                    <input type="file" ref="fileInput" style="display: none !important;" @change="onFileSelected()">
                    <div class="relative w-full h-[30vh] bg-light-green  bg-no-repeat bg-contain bg-center"
                        v-bind:style="{'background-image': 'url(' + pdfPhoto + ')'}">
                        
                        <button type="button" @click="fileClick()" class="w-full h-full bg-transparent absolute top-0 left-0 flex">
                           <div v-if="pdfName" class="flex flex-column gap-2 p-2 poppins-bold text-color-main align-items-center">
                                <UIcon name="i-heroicons-document-solid" class="text-3xl text-color-main" />
                                <span>{{pdfName}}</span>
                           </div>
                        </button>
                        <div class="bg-white text-[10px] text-center w-full absolute bottom-0 p-1"> {{ $t('accepted') }}: <span
                                class="text-color-main ">{{ acceptedExtensions() }}</span>
                        </div>

                        <!-- <embed v-bind:src="pdfEmbed"  type="application/pdf" style="scrollbar-width: none !important; width: 20%; height: 40%; overflow: hidden;"/> -->
                               
                                
                    </div>
                    <div class="mb-2 p-2 pt-4 flex flex-row justify-content-center gap-3">
                        <UIcon name="i-heroicons-light-bulb" class="text-3xl text-gray-400" />
                        <span class="text-sm text-thin text-gray-400">
                            
                            {{ $t('tutor_cv_legend') }}
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
let pdfPhoto = ref("/image/upload.svg");
let pdfName = ref();
const state = reactive({

});
let photo = ref();

function acceptedExtensions() {
    let accepted = environment.accepted_file as Array<string>;
    return accepted.map(x => x).join(', ');
}

function onFileSelected() {
    if (fileInput.value) {
        if (fileInput.value.files?.length != null && fileInput.value.files?.length > 0) {
            let file = fileInput.value.files[0];
            let extension: string = file.name.substring(file?.name.lastIndexOf('.') + 1);
            let reader = new FileReader();
            if (!environment.accepted_file.includes(extension)) {
                toast.add(
                    {
                        id: "1",
                        title: 'Erreur!',
                        description: 'Type de fichier non prise en charge!',
                        icon: "i-heroicons-exclamation-triangle",
                        color: "red",
                        ui: {
                            background: "bg-red-100"
                        }
                    },
                );
            } else {
                photo.value = file;
                pdfName.value = file.name;
                pdfPhoto.value = '/image/upload-modify.svg'
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
    formData.append('documentType', JSON.stringify(FiletypesEnum.CV));
    formData.append('file', photo.value);
    const options = {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${LocalStorageGetItem(environment.auth_token)}`,
        }
    };
    loadingStore.show();
    fetch(`${environment.api}${environment.upload_url}`, options).then((res) => {
        if (res.status == 200) {
            navigateTo("/authentications/register/tutor/description");
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