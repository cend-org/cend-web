<script setup lang="ts">

import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toast } from '~/components/ui/toast/use-toast'
import { TutorRenumerations } from '~/constants/renumerations';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();
loadingStore.hide();

// const formSchema = toTypedSchema(z.object({
//     descriptionProfile: z.string().min(5),
//     experiences: z.string().min(5),
//     motivations: z.string().min(5),
// }));

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
<style>
.currency-field{
    padding: 0px !important;
    border: none;
    box-shadow: none;
}
</style>
<template>
  <form class="space-y-6" @submit="onSubmit">
    <div class="p-2">
            <div class=" flex flex-col gap-1">
              <div class="flex flex-row justify-content-between w-full gap-1" v-for="renumeration in TutorRenumerations">
                <div v-if="renumeration.name == 'first_try'" class="w-full p-2 border-2 border-gray-400">
                  {{ renumeration.name }}</div>
                <div v-if="renumeration.name != 'first_try'" class="w-full p-2 border-2 border-gray-400">
                  {{ renumeration.name }}</div>
                <div class="w-full p-2 border-2 border-gray-400 text-center">
                  <span v-if="!renumeration.editable">{{ renumeration.renumeration }} %</span>
                  <div  v-if="renumeration.editable"  class=" w-full h-full">
                    <NumberField
                        id="balance"
                        :default-value="0"
                        :format-options="{
                        style: 'currency',
                        currency: 'USD',
                        currencyDisplay: 'code',
                        currencySign: 'accounting',
                        }"
                    >
                    <NumberFieldInput class="currency-field" />
                    </NumberField>
                    <!-- <input autocomplete="off" class="w-full text-center rounded-lg bg-green-100" ref="moneyInput"
                      type="text" name="currency" v-model="state.renumeration" @input="onInput" @focus="onFocus"
                      @keydown="onKeydown"> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
    <CommonFormSubmit  position="bottom"/>
  </form>
</template>
