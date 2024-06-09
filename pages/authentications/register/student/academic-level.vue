<template>
  <LayoutAuthentication :title="$t('register_academic_level')">
    <form action="" class="w-full flex flex-col gap-2 pt-3">
      <UForm :state="state" class="space-y-2" @submit="onSubmit">
        <selection-single />
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
import { environment } from '~/scripts/environment';
import { LocalStorageSetItem } from '~/scripts/local-storage';
const loadingStore = useLoadingStore();
loadingStore.hide();
const toast = useToast();
const selectionSingleStore = useSelectionSingleStore();
const selectionMultipleStore = useSelectionMultipleStore();
const state = reactive({})

async function onSubmit() {
    loadingStore.show();
    GqlSetUserAcademicLevel({ academicLevelId: parseInt(selectionSingleStore.selectedItem.Id) }).then(response => {
        LocalStorageSetItem(environment.student_selected_academic_level, `${selectionSingleStore.selectedItem.Name}`);
        getAcademicCourses();
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

    function getAcademicCourses() {
        GqlAcademicCourses({ academicLevelId: parseInt(selectionSingleStore.selectedItem.Id) }).then(response => {
            selectionMultipleStore.list = response.AcademicCourses as Array<never>;
            navigateTo("/authentications/register/student/academic-course");

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
}
</script>
