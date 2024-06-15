<template>
    <form class="space-y-6" @submit="onSubmit">
        <CommonTemplateCourseType :items="courseList"  v-model:selectedItem="selectedItem"/>
        <CommonFormSubmit   position="bottom"/>
    </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toast } from '~/components/ui/toast';
import { StudentCourseType } from '~/constants/course.type';
import { trasnformStore } from '~/stores/trasnform.store';

const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();
const transform = trasnformStore();


let selectedItem = ref(null as any);
let courseList = ref(StudentCourseType);
loadingStore.hide();

const { isFieldDirty, handleSubmit, values } = useForm({
    validationSchema: null,
})


const onSubmit = handleSubmit(async (values) => {
    if (selectedItem != null) {

        loadingStore.show();
        try {
            await usr.setCoursePreference(selectedItem.value.value);
            registration.next()
        } catch (e) {
            loadingStore.hide();
            toast({
                title: 'You submitted the following values:',
                description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
            })
        }
    };

})
</script>