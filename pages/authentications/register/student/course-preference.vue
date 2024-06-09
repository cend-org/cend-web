<template>
  <LayoutAuthentication :title="$t('register_prefered_course')">
    <form action="" class="w-full flex flex-col gap-2 pt-3">
      <UForm :state="state" class="space-y-2" @submit="onSubmit">
        <course-preference />
        <div
            class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
          <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
            {{ $t(`continue`) }}
          </UButton>
        </div>
      </UForm>
    </form>
  </LayoutAuthentication>
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
const loadingStore = useLoadingStore();
loadingStore.hide();
const toast = useToast();
const coursePreferenceStore = useCoursePreferenceStore();
const state = reactive({
});

async function onSubmit() {
    loadingStore.show();
    GqlUpdAcademicCoursePreference({ coursesPreferences: { IsOnline: coursePreferenceStore.selectedItem.value } }).then(response => {
        navigateTo("/authentications/register/student/disponibility");

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