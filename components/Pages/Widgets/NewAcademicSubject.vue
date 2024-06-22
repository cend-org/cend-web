<template>
    <form class="space-y-6" @submit="onSubmit">
        <CommonTemplateSelectionMultiple v-model:selectedItem="selectedSchoolSubject" :items="subjectList"
            searchPlaceholder="Filtre matières" />
        <CommonFormSubmit   position="bottom"/>
    </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toast } from '~/components/ui/toast';
import { trasnformStore } from '~/stores/trasnform.store';

const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();
const transform = trasnformStore();


let selectedSchoolSubject = ref([] as Array<any>);

let subjectList = ref([]);
usr.getAcademicSubject().then(resp => {
    subjectList.value = resp as Array<never>;
})
loadingStore.hide();

const { isFieldDirty, handleSubmit, values } = useForm({
    validationSchema: null,
})


const onSubmit = handleSubmit(async (values) => {
    if (selectedSchoolSubject.value.length > 0) {

        loadingStore.show();
        try {
            await usr.setAcademicSubject(transform.ToArrayObject(selectedSchoolSubject.value, 'CourseId', "Id"));
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