<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">
                   {{ $t('register_tutor_profile_description') }}</h1>
                <UForm :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup :label="`1-${$t('register_tutor_description')}`" name="presentation">
                        <UTextarea   autocomplete="off"  v-model="state.presentation"
                            :placeholder="$t('register_tutor_description_label')" class="text-area" />
                    </UFormGroup> 
                    <UFormGroup :label="`2-${$t('register_tutor_experiences')}`">
                        <UTextarea   autocomplete="off"  v-model="state.experience"
                             :placeholder="$t('register_tutor_experiences_label')" class="text-area" />
                    </UFormGroup>
                    <UFormGroup :label="`3-${$t('register_tutor_motivation')}`" name="motivation">
                        <UTextarea   autocomplete="off"  v-model="state.motivation"
                           :placeholder="$t('register_tutor_motivation_label')" class="text-area" />
                    </UFormGroup>

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
    .text-area > textarea{
        height: 16vh;
    }
</style>
<script setup lang="ts">

import { useValidation } from '~/composables/validations';
import { environment } from '~/scripts/environment';
import { LocalStorageGetItem, LocalStorageSetItem } from '~/scripts/local-storage';

const validation = useValidation();
const toast = useToast();
const loadingStore = useLoadingStore();
loadingStore.hide();

const state = reactive({
    presentation: '',
    experience: '',
    motivation: '',
})

async function onSubmit() {

    if (!state.motivation || !state.experience || !state.presentation) {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'Veillez vérifiez les champs!',
                icon: "i-heroicons-check-badge",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
        return;
    };
     loadingStore.show();
     useGqlToken({
        token: `${LocalStorageGetItem(environment.auth_token)}`,
        config: {
            type: 'Bearer',
            name: 'Authorization'
        }
    });
    GqlUpdateMyProfile({ profile: { Profile: state.presentation, ExperienceDetail: state.experience, AdditionalDescription:  state.experience} }).then(response => {
        navigateTo("/authentications/register/tutor/video");
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
