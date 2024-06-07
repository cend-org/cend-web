<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">{{ $t('register_teacher_search_student')
                    }}
                </h1>
                <UForm :state="state" class="space-y-2" @submit="onSubmit">
                    <student-search />
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

const selectionstudentStore = useSelectionStudentStore();
const loadingStore = useLoadingStore();
loadingStore.hide();
const toast = useToast();

const state = reactive({})
async function onSubmit() {
    let studentId = selectionstudentStore.selectedItem.Id;
    if (!studentId || studentId == '') {
        toast.add(
            {
                id: "1",
                title: 'Erreur!',
                description: 'Veuillez selectionner votre étudiant!',
                icon: "i-heroicons-exclamation-triangle",
                color: "red",
                ui: {
                    background: "bg-red-100"
                }
            }
        );
        return;
    }
    loadingStore.show();
    GqlNewStudentProfessor({ studentId: parseInt(studentId) }).then(response => {
        navigateTo("/authentications/register/teacher/verification");
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
