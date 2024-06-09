<template>
  <LayoutAuthentication title="">
    <form action="" class="w-full flex flex-col gap-2 pt-3">
      <UForm :state="state" class="space-y-6" @submit="onSubmit">
        <div class="text-lg text-gray-900 poppins-medium py-5">
          {{ $t('register_teacher_confirmation_without_student') }}
        </div>
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

const state = reactive({});
async function onSubmit() {
    loadingStore.show();
    setTimeout(() => {
        loadingStore.hide();
        navigateTo("/dashboard/landing");
    }, 500);
}
</script>
