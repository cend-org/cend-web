<template>
    <form class="space-y-6" @submit="onSubmit">
      <CommonFormLangList />
      <div class="px-5">
        <CommonFormSubmit position="bottom" />
      </div>
    </form>
  </template>
  <script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { toast } from '~/components/ui/toast';
  
  
  
  const usr = userStore()
  const registration = registrationStore()
  const loadingStore = useLoadingStore();

  loadingStore.hide();
  
  const { isFieldDirty, handleSubmit, values } = useForm({
    validationSchema: null,
  })
  
  
  const onSubmit = handleSubmit(async (values) => {
    loadingStore.show();
    registration.next();
  
  })
  </script>