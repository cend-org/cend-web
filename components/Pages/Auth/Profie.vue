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
import { Sex } from "~/constants/Sex";


const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})



const formSchema = toTypedSchema(z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  //birthdate: z.string().refine(v => v, { message: 'A date of birth is required.' }),
  langue: z.string().min(1),
  // sex: z.string(),
  // language: z.string(),
}))

const { isFieldDirty, handleSubmit, values } = useForm({
  validationSchema: formSchema,
})

// const value = computed({
//   get: () => values.birthdate ? parseDate(values.birthdate) : undefined,
//   set: val => val,
// })

const onSubmit = handleSubmit( async (values) => {
  console.log(values)
  // loadingStore.show();
  // try{
  //   await store.authenticate(values.mail)
  //   registration.next()
  // }catch(e){
  //   loadingStore.show();
  //   toast({
  //     title: 'You submitted the following values:',
  //     description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
  //   })
  // }
})
</script>
<template>
  <LayoutAuthentication title="Veuillez remplir les informations suivantes :">
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
          <FormField v-slot="{ componentField }" name="langue" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Date de naissance</FormLabel>
              <FormControl v-bind="componentField">
                <CommonFormDatePicker    />
                <!-- placeholder="Votre Date de naissance" -->
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
<!--      <FormField  name="birthdate" >-->
<!--        <FormItem>-->
<!--          <FormLabel>Votre date de naissance</FormLabel>-->
<!--          <FormControl >-->
<!--            <Popover>-->
<!--              <PopoverTrigger as-child>-->
<!--                <FormControl>-->
<!--                  <Button-->
<!--                      variant="outline" :class="cn(-->
<!--                  'w-[240px] ps-3 text-start font-normal',-->
<!--                  !value && 'text-muted-foreground',-->
<!--                )"-->
<!--                  >-->
<!--                    <span>{{ value ? df.format(toDate(value)) : "Pick a date" }}</span>-->
<!--                    <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />-->
<!--                  </Button>-->
<!--                  <input hidden>-->
<!--                </FormControl>-->
<!--              </PopoverTrigger>-->
<!--              <PopoverContent class="w-auto p-0">-->
<!--                <Calendar-->
<!--                    v-model="value"-->
<!--                    calendar-label="Date of birth"-->
<!--                    initial-focus-->
<!--                    :min-value="new CalendarDate(1900, 1, 1)"-->
<!--                    :max-value="today(getLocalTimeZone())"-->
<!--                    @update:model-value="(v) => {-->
<!--                if (v) {-->
<!--                  setFieldValue('birthdate', v.toString())-->
<!--                }-->
<!--                else {-->
<!--                  setFieldValue('birthdate', undefined)-->
<!--                }-->
<!--              }"-->
<!--                />-->
<!--              </PopoverContent>-->
<!--            </Popover>-->
<!--          </FormControl>-->
<!--        </FormItem>-->
<!--      </FormField>-->

      <CommonFormSubmit />
    </form>
  </LayoutAuthentication>
</template>