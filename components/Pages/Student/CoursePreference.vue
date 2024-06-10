<template>
  <LayoutAuthentication :title="$t('register_prefered_course')">
    <form class="space-y-4" @submit="onSubmit">
            <div class="flex flex-row gap-1 w-full">
                <FormField v-slot="{ componentField }" name="selectedCourseType" :validate-on-blur="!isFieldDirty">
                    <FormItem class="w-full">
                        <FormControl v-bind="componentField">
                            <CommonFormCoursePreference
                                :items="coursetype" v-model:selectedItem="selectedCourseType" />
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
import { toast } from '~/components/ui/toast';
import { studentTypeComponent } from '~/constants/constants';

const registration = registrationStore()

const _authenticationStore = authenticationStore();
const loadingStore = useLoadingStore();
const coursetype = studentTypeComponent;
const selectedCourseType = ref(null as any);
const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: null,
});


loadingStore.hide();
const onSubmit = handleSubmit(async () => {
    if (selectedCourseType.value) {
        loadingStore.show();
        try {
            await _authenticationStore.setCoursePreference(selectedCourseType.value.value);
            registration.next()
            // navigateTo( "/authentications/register/student/disponibility")
        } catch (e) {
          loadingStore.hide();
            toast({
                title: 'You submitted the following values:',
                description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
            })
        }
    }

});
</script>