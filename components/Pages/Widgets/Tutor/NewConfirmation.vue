<template>
   <form class="space-y-6" @submit="onSubmit">
            <p>
                Nous allons vérifier que tout est bon. Notre équipe vous enverra un e-mail de confirmation !
            </p>
           
            <CommonFormSubmit position="bottom" classList="" />
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
});

const onSubmit = handleSubmit( async (values) => {
  loadingStore.show();
  try{
    // await usr.createProfileDescription(values.descriptionProfile, values.experiences, values.motivations);
    registration.next()
  }catch(e){
    loadingStore.hide();
    toast({
      title: 'You submitted the following values:',
      description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
    })
  }
});

</script>