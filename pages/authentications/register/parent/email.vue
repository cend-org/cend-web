<template>
  <LayoutAuthentication :title="$t('register_student_header_email_or_phone')" >
    <form action="" class="w-full flex flex-col gap-2">
      <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup :label="$t(`auth_email`)" name="email">
          <UInput autocomplete="off" class="" size="lg" v-model="state.email"
                  :placeholder="$t(`auth_your_email`)" />
        </UFormGroup>
        <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
          {{ $t(`continue`) }}
        </UButton>
      </UForm>
    </form>
    <CommonAuth />
  </LayoutAuthentication>
</template>
<script setup lang="ts">

import { useValidation } from '~/composables/validations';
import { environment } from '~/scripts/environment';
import { LocalStorageSetItem } from '~/scripts/local-storage';

const validation = useValidation();
const toast = useToast();
const loadingStore = useLoadingStore();

const state = reactive({
    email: '',
})

async function onSubmit() {

    if (!validation.checkEmail(state.email)) {
        toast.add(
            {
                id: "1",
                title: 'Validation',
                description: 'Veillez vérifiez votre email!',
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
    GqlNewParent({ email: state.email }).then(response => {
        LocalStorageSetItem(environment.auth_token, response.NewParent?.T);
        navigateTo("/authentications/register/parent/password");
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
