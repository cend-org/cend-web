<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <UForm :state="state" class="space-y-6" @submit="onSubmit">
                    <div class="text-lg text-gray-900 poppins-medium py-5">
                        Malheureusement, nous n’avons pas trouver un tuteur qui comble vos attentes.
                    </div>
                    <div
                        class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
                        <UButton size="lg" type="submit" class="bg-light-green hover:bg-green-300 text-gray-900" block>
                            Continuer sans tuteur pour le moment ?
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
const loadingStore = useLoadingStore();
loadingStore.hide();
const state = reactive({
    name: undefined,
    familyName: undefined,
    birthDate: '',
})
async function onSubmit() {
    loadingStore.show();
    setTimeout(() => {
        navigateTo("/authentications/register/student/no-tutor-final");
    }, 500);
}
</script>
