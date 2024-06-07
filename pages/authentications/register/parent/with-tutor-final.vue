<template>
    <div class="w-full flex justify-center mt-6">
        <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
            <form action="" class="w-full flex flex-col gap-2 pt-3">
                <UForm :state="state" class="space-y-6" @submit="onSubmit">
                    <div class="text-lg text-gray-900 poppins-medium pt-5">
                        {{ $t('register_student_felicitation_a') }}
                    </div>
                    <div class="text-lg text-gray-900 poppins-medium py-1">
                        {{ $t('register_student_felicitation_b') }}

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
const loadingStore = useLoadingStore();
const state = reactive({})
async function onSubmit() {
    loadingStore.show();
    setTimeout(() => {
        loadingStore.hide();
        navigateTo("/dashboard/landing");
    }, 500);
}
</script>
