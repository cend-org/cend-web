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
    password: z.string().min(5),
    passwordConfirm: z.string().min(5),
}));

const { isFieldDirty, handleSubmit, values } = useForm({
    validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
    loadingStore.show();
    try {
        await usr.createPassword(values.password)
        registration.next()
    } catch (e) {
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
        <div class="flex flex-col gap-4">
            <div class="flex flex-row gap-2">
                <div class="">Vous préférez demain à </div>
                <FormField v-slot="{ componentField }" name="hour0" :validate-on-blur="!isFieldDirty">
                    <FormItem>
                        <FormControl class="" v-bind="componentField">
                            <div
                                class="text-color-main text-center bg-gray-200 w-[100px] h-[25px] rounded-lg text-center">
                                <CommonFormTimePicker class="w-full h-full" />
                            </div>
                            <!-- class="text-color-main text-center bg-gray-200 w-[100px] h-[25px] rounded-lg text-center " -->
                            <!-- <input  :value="'timeValue0'" type="text" name="hour0"
                                class="text-color-main text-center hour-input bg-gray-200 w-[100px] h-[25px] rounded-lg text-center"> -->
                        </FormControl>
                    </FormItem>
                </FormField>
                <span>h?</span>
            </div>
            <div class="w-full flex justify-end">
                <div class="flex flex-row gap-2">
                    <span> ou </span>
                    <FormField v-slot="{ componentField }" name="date" :validate-on-blur="!isFieldDirty">
                        <FormItem>
                            <FormControl class="" v-bind="componentField">
                                <div
                                    class="text-color-main text-center bg-gray-200 w-[150px] h-[25px] rounded-lg text-center">
                                    <CommonFormDatePicker class="w-full h-full"  :hideIcon="false"/>
                                </div>
                            </FormControl>
                        </FormItem>
                    </FormField>
                    <span>à</span>
                    <FormField v-slot="{ componentField }" name="hour2" :validate-on-blur="!isFieldDirty">
                        <FormItem>
                            <FormControl class="" v-bind="componentField">
                                <div
                                    class="text-color-main text-center bg-gray-200 w-[100px] h-[25px] rounded-lg text-center">
                                    <CommonFormTimePicker class="w-full h-full" />
                                </div>
                                <!-- class="text-color-main text-center bg-gray-200 w-[100px] h-[25px] rounded-lg text-center " -->
                                <!-- <input  :value="'timeValue0'" type="text" name="hour0"
                                class="text-color-main text-center hour-input bg-gray-200 w-[100px] h-[25px] rounded-lg text-center"> -->
                            </FormControl>
                        </FormItem>
                    </FormField>
                    <span>h?</span>
                </div>
            </div>

        </div>
        <CommonFormSubmit position="bottom" />
    </form>
</template>
