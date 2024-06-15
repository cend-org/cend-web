<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import {toast} from "~/components/ui/toast";
import {h} from "vue";
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Button} from "~/components/ui/button";
import {Calendar} from "~/components/ui/calendar";
import {CalendarIcon} from "@radix-icons/vue";
import { ref } from 'vue'
import {
  CalendarDate,
  DateFormatter,
  type DateValue,
  getLocalTimeZone, parseDate, today,
} from '@internationalized/date'
import {cn} from "~/lib/utils";
import {toDate} from "date-fns";
import { Languages } from "~/constants/languages";
import { Sex } from "~/constants/sex";



const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();
loadingStore.hide();
let dateOfBirth = ref(undefined);
// const df = new DateFormatter('en-US', {
//   dateStyle: 'long',
// })



const formSchema = toTypedSchema(z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  birthdate: z.string().min(1),
  langue: z.string().min(1),
  sex: z.string().min(1),
  // language: z.string(),
}))

const { isFieldDirty, handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
});
watch(dateOfBirth, (newVal) => {
  setFieldValue('birthdate', `${newVal}`);
});

// const value = computed({
//   get: () => values.birthdate ? parseDate(values.birthdate) : undefined,
//   set: val => val,
// })

const onSubmit = handleSubmit( async (values) => {
  loadingStore.show();
  try{
    await usr.createProfile(values.name, values.lastname, parseInt(values.langue), parseInt(values.sex), new Date(values.birthdate))
    registration.next()
  }catch(e){
    loadingStore.hide();
    toast({
      title: 'You submitted the following values:',
      description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
    })
  }
})
</script>
<template>
    <form class="space-y-6" @submit="onSubmit">
      <div class="flex flex-row gap-x-2">
       
          <div class="w-1/2">
            <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl v-bind="componentField">
                  <CommonFormInput type="text" placeholder="Votre nom" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        <div class="w-1/2">

        
          <FormField v-slot="{ componentField }" name="lastname" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl v-bind="componentField">
                <CommonFormInput type="text" placeholder="Votre prénom" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
       
      </div>
      <div>
          <FormField v-slot="{ componentField }" name="dateOfBirth" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Date de naissance</FormLabel>
              <FormControl v-bind="componentField">
                <CommonFormDatePicker  v-model:modelValue="dateOfBirth"  text="Votre Date de naissance" type="birth-date"/>
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      <div>
          <FormField v-slot="{ componentField }" name="langue" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Langue</FormLabel>
              <FormControl v-bind="componentField">
                <CommonFormSelect :items="Languages"  placeholder="Sélectionnnez votre langue" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div>
          <FormField v-slot="{ componentField }" name="sex" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Sexe</FormLabel>
              <FormControl v-bind="componentField">
                <CommonFormSelect :items="Sex"  placeholder="Sélectionnnez votre sexe" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <CommonFormSubmit position="bottom" />
    </form>
</template>