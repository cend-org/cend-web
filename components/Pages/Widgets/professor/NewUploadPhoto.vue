<template>
    <div class="">
        <form class="space-y-6" @submit="onSubmit">

            <input type="file" ref="fileInput" style="display: none !important;" @change="onFileSelected()">
            <div class="relative w-full h-[30vh] bg-light-green  bg-no-repeat bg-contain bg-center"
                v-bind:style="{ 'background-image': 'url(' + profilePhoto + ')' }">
                <button type="button" @click="fileClick()" class="w-full h-full  border-0">

                </button>
                <div class="bg-white text-[10px] text-center w-full absolute bottom-0 p-1">accepté: <span
                        class="text-color-main ">{{ `${environment.accepted_photos.join(', ')}` }}</span></div>
            </div>
            <div class="mb-2 p-2 pt-4 flex flex-row justify-content-center gap-3">
                <span class="text-sm text-thin text-gray-900">
                    ● Professeurs qui ont l'air amicaux et professionnels reçoivent le plus d'étudiants.
                </span>
            </div>
            <CommonFormSubmit position="bottom" />

        </form>
    </div>
    <div v-if="error" class="text-red-700 py-5">
            <Alert>
                <AlertTitle class="font-bold text-red-500">Attention !</AlertTitle>
                <AlertDescription>
                Format du vidéo non prise en charge!
                </AlertDescription>
            </Alert>
        </div>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toast } from '~/components/ui/toast';
import { environment } from '~/scripts/environment';
import { FiletypesEnum } from '~/scripts/files';

const runtimeConfig = useRuntimeConfig();
const loadingStore = useLoadingStore();
const registration = registrationStore();
const authStore = authenticationStore();
loadingStore.hide();
const usr = userStore();
const fileInput = ref<HTMLInputElement | null>(null);
let profilePhoto = ref("/image/upload.svg");
let photo = ref();
let error = ref(false);
function fileClick() {
    if (fileInput.value) {
        fileInput.value.click();
    }
}

function onFileSelected() {
    if (fileInput.value) {
        if (fileInput.value.files?.length != null && fileInput.value.files?.length > 0) {
            let file = fileInput.value.files[0];
            let extension: string = file.name.substring(file?.name.lastIndexOf('.') + 1).toLowerCase();
            let reader = new FileReader();
            if (!environment.accepted_photos.includes(extension)) {
                error.value = true
            } else {
                error.value = false
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

const { isFieldDirty, handleSubmit, values } = useForm({
    validationSchema: null,
})


const onSubmit = handleSubmit(async (values) => {
    try {

        loadingStore.show();
        const formData = new FormData();
        formData.append('documentType', JSON.stringify(FiletypesEnum.USER_PROFILE_IMAGE));
        formData.append('file', photo.value);
        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${authStore.token}`,
            }
        };
        fetch(`${runtimeConfig.public.API_ENDPOINT}${environment.upload_url}`, options).then((res) => {
            process.env.API_BASE_URL
            if(res.status == 200){
                registration.next();
            }else{
                loadingStore.hide();
            }
        });
    } catch (e) {
        loadingStore.hide();
        toast({
            title: 'You submitted the following values:',
            description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
        })
    }
});
</script>