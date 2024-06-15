<script setup lang="ts">

import { toTypedSchema } from '@vee-validate/zod';
import { LogIn } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { date, z } from 'zod';
import { toast } from '~/components/ui/toast/use-toast'

const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();
const transform = trasnformStore();

const dispo_0 = ref({
    hour: 8,
    minute: 0,
});

const dispo_1 = ref({
    hour: 8,
    minute: 0,
});



const dispo_date = ref('' as any);

loadingStore.hide();

const formSchema = toTypedSchema(z.object({
    dispo_0: z.string().min(1),
    dispo_1: z.string().min(1),
    dispo_date: z.string().min(1)
}));

const { isFieldDirty, handleSubmit, setFieldValue, values } = useForm({
    validationSchema: formSchema,
});

const h0 = computed({
    get: () => `${dispo_0.value.hour}:${dispo_0.value.minute}`,
    set: val => val,
});
const h1 = computed({
    get: () => `${dispo_1.value.hour}:${dispo_1.value.minute}`,
    set: val => val,
});

onMounted(() => {
    setFieldValue('dispo_0', `${dispo_0.value.hour}:${dispo_0.value.minute}`);
    setFieldValue('dispo_1', `${dispo_1.value.hour}:${dispo_1.value.minute}`);
    setFieldValue('dispo_date', `${dispo_date}`);
});

watch(dispo_0.value, (newVal) => {
    setFieldValue('dispo_0', `${newVal.hour}:${newVal.minute}`)
});

watch(dispo_1.value, (newVal) => {
    setFieldValue('dispo_1', `${newVal.hour}:${newVal.minute}`)
});

const onSubmit = handleSubmit(async (values) => {
    loadingStore.show();
    try {
        await usr.createStudentDisponibility(transform.HoursToCurrentDate(values.dispo_0, new Date()));
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
                DATE EE: {{ dispo_date }}
                <div class="">Vous préférez demain à</div>
                <FormField v-slot="{ componentField }" name="dispo_0" :validate-on-blur="!isFieldDirty">
                    <FormItem>
                        <FormControl class="" v-bind="componentField">
                            <div
                                class="text-color-main text-center bg-gray-200 w-[100px] h-[25px] rounded-lg text-center">
                                <CommonFormTimePicker class="w-full h-full" v-model:h="dispo_0.hour"
                                    v-model:m="dispo_0.minute" />
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
                                    <CommonFormDatePicker class="w-full h-full" :hideIcon="false" />
                                    <!--  v-model:placeholder="dispo_date"  -->
                                </div>
                            </FormControl>
                        </FormItem>
                    </FormField>
                    <span>à</span>
                    <FormField v-slot="{ componentField }" name="dispo_1" :validate-on-blur="!isFieldDirty">
                        <FormItem>
                            <FormControl class="" v-bind="componentField">
                                <div
                                    class="text-color-main text-center bg-gray-200 w-[100px] h-[25px] rounded-lg text-center">
                                    <CommonFormTimePicker class="w-full h-full" v-model:h="dispo_1.hour"
                                        v-model:m="dispo_1.minute" />
                                </div>
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
