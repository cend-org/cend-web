<script setup lang="ts">

import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toast } from '~/components/ui/toast/use-toast'

const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();
loadingStore.hide();

const formSchema = toTypedSchema(z.object({
    descriptionProfile: z.string().min(5),
    experiences: z.string().min(5),
    motivations: z.string().min(5),
}));

const { isFieldDirty, handleSubmit, values } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit( async (values) => {
  loadingStore.show();
  try{
    await usr.createProfileDescription(values.descriptionProfile, values.experiences, values.motivations);
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
<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="descriptionProfile" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel class="text-sm">1. Description du profile </FormLabel>
        <FormControl v-bind="componentField">
            <Textarea
                placeholder=""
                class="resize-none h-[17vh]"
                v-bind="componentField"
             />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="experiences" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel class="text-sm">2. Expérience d'enseignement</FormLabel>
        <FormControl v-bind="componentField">
            <Textarea
                placeholder=""
                class="resize-none h-[17vh]"
                v-bind="componentField"
             />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="motivations" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel class="text-sm">3. Motive les futurs étudiants</FormLabel>
        <FormControl v-bind="componentField">
            <Textarea
                placeholder=""
                class="resize-none h-[17vh]"
                v-bind="componentField"
             />
        </FormControl>
      </FormItem>
    </FormField>
    <CommonFormSubmit  position="bottom"/>
  </form>
</template>
