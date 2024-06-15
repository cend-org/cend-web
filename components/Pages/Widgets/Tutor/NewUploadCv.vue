<template>
    <div class="">
        <form class="space-y-6" @submit="onSubmit">

            <input type="file" ref="fileInput" style="display: none !important;" @change="onFileSelected()">
                    <div class="relative w-full h-[30vh] bg-light-green  bg-no-repeat bg-contain bg-center"
                        v-bind:style="{ 'background-image': 'url(' + pdfPhoto + ')' }">

                        <button type="button" @click="fileClick()"
                            class="w-full h-full bg-transparent absolute top-0 left-0 flex">
                            <div v-if="pdfName"
                                class="flex flex-column gap-2 p-2 poppins-bold text-color-main align-items-center">
                                <UIcon name="i-heroicons-document-solid" class="text-3xl text-color-main" />
                                <span>{{ pdfName }}</span>
                            </div>
                        </button>
                        <div class="bg-white text-[10px] text-center w-full absolute bottom-0 p-1">accepté <span class="text-color-main ">{{ `${environment.accepted_file.join(', ')}`}}</span>
                        </div>
                    </div>
            <div class="mb-2 p-2 pt-4 flex flex-row justify-content-center gap-3">
                <span class="text-sm text-thin text-gray-900">
                    ● Reçois un badge de certificat vérifié en nous envoyant tes diplômes. Nous pourrions les confirmer pour accroître votre crédibilité.
                </span>
            </div>
            <CommonFormSubmit position="bottom" />

        </form>
    </div>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toast } from '~/components/ui/toast';
import { environment } from '~/scripts/environment';
import { FiletypesEnum } from '~/scripts/files';


const loadingStore = useLoadingStore();
const registration = registrationStore();
const authStore = authenticationStore();
loadingStore.hide();
const usr = userStore();
const fileInput = ref<HTMLInputElement | null>(null);
let pdfPhoto = ref("/image/upload.svg");
let pdfName = ref();
let photo = ref();
function fileClick() {
    if (fileInput.value) {
        fileInput.value.click();
    }
}

function onFileSelected() {
    if (fileInput.value) {
        if (fileInput.value.files?.length != null && fileInput.value.files?.length > 0) {
            let file = fileInput.value.files[0];
            let extension: string = file.name.substring(file?.name.lastIndexOf('.') + 1);
            let reader = new FileReader();
            if (!environment.accepted_file.includes(extension)) {
                // toast.add(
                //     {
                //         id: "1",
                //         title: 'Erreur!',
                //         description: 'Type de fichier non prise en charge!',
                //         icon: "i-heroicons-exclamation-triangle",
                //         color: "red",
                //         ui: {
                //             background: "bg-red-100"
                //         }
                //     },
                // );
            } else {
                photo.value = file;
                pdfName.value = file.name;
                // pdfPhoto.value = '/image/upload-modify.svg'
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
        formData.append('documentType', JSON.stringify(FiletypesEnum.CV));
        formData.append('file', photo.value);
        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${authStore.token}`,
            }
        };
        fetch(`${environment.api}${environment.upload_url}`, options).then((res) => {
            if(res.status ==200){
                registration.next();
            }else{
                loadingStore.hide();
            }
        });
        registration.next()
    } catch (e) {
        loadingStore.hide();
        toast({
            title: 'You submitted the following values:',
            description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
        })
    }
});
</script>