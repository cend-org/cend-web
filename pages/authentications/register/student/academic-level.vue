<template>
    <LayoutAuthentication :title="$t('register_academic_level')">
        <form class="space-y-4" @submit="onSubmit">
            <div class="flex flex-row gap-1 w-full">
                <FormField v-slot="{ componentField }" name="selectedAcademicLevel" :validate-on-blur="!isFieldDirty">
                    <FormItem class="w-full">
                        <FormControl v-bind="componentField">
                            <CommonFormSingleSelect searchPlaceholder="Filtre niveau scolaire..."
                                :items="academicLevelList" v-model:selectedItem="selectedAcademicLevel" />
                        </FormControl>
                    </FormItem>
                </FormField>
            </div>
            <CommonFormSubmit position="absolute" />
        </form>
    </LayoutAuthentication>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toast } from '~/components/ui/toast';
import { academicStore } from '~/stores/academic.store';
const loadingStore = useLoadingStore();

const store = authenticationStore();
const _academicStore = academicStore();
const academicLevelList = await _academicStore.getAcademicLevels() as Array<any>;
const selectedAcademicLevel = ref(null as any);
const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: null,
});

const onSubmit = handleSubmit(async () => {
    if (selectedAcademicLevel.value) {
        loadingStore.show();
        try {
            await _academicStore.setStudentAcademicLevels(selectedAcademicLevel.value.Id);
            navigateTo({ path: '/authentications/register/student/academic-course', query: { data: selectedAcademicLevel.value.Id } })
        } catch (e) {
            toast({
                title: 'You submitted the following values:',
                description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
            })
        }
    }

});
loadingStore.hide();
</script>
