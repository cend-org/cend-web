<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">Quel est le nom de votre jeûne?</h1>
                <UForm :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Nom" name="name">
                        <UInput  autocomplete="off" size="xl"  v-model="state.name" name="name"
                            type="text" placeholder="Nom de votre jeûne">
                        </UInput>
                    </UFormGroup>
                    <UFormGroup label="Prénom" name="familyname">
                        <UInput  autocomplete="off" size="xl"  v-model="state.familyname" name="family"
                            type="text" placeholder="Prénom de votre jeûne">
                        </UInput>
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
<script setup lang="ts">

import { useValidation } from '~/composables/validations';
import { environment } from '~/scripts/environment';
import { LocalStorageGetItem, LocalStorageSetItem } from '~/scripts/local-storage';


const validation = useValidation();
const loadingStore = useLoadingStore();
loadingStore.hide();
const toast = useToast();
let showPasswords = ref(true);
let isPasswordFocused = ref(false);
function togglePassword() {
    showPasswords.value = !showPasswords.value;
}
const state = reactive({
    name: '',
    familyname: ''
})


async function onSubmit() {
    if (!state.name || !state.familyname) {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'Veillez vérifiez les informations!',
                icon: "i-heroicons-check-badge",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        )
        return;
    }

    useGqlToken({
        token: `${LocalStorageGetItem(environment.auth_token)}`,
        config: {
            type: 'Bearer',
            name: 'Authorization'
        }
    });
    loadingStore.show();
    GqlUserStudent({ name: state.name, familyName: state.familyname }).then(response => {
        LocalStorageSetItem(environment.parent_child_name, `${response.UserStudent?.Name} ${response.UserStudent?.FamilyName}`);
        LocalStorageSetItem(environment.parent_child_id, `${response.UserStudent?.Id}`);
        LocalStorageSetItem(environment.parent_child_email, `${response.UserStudent?.Email}`);
        LocalStorageSetItem(environment.parent_child_matricule, `${response.UserStudent?.Matricule}`);
        navigateTo("/authentications/register/parent/language");
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
