<template>
  <LayoutAuthentication :title="$t('register_academic_courses')">
    <form class="space-y-4" @submit="onSubmit">
      <div class="flex flex-row gap-2 w-full">
        <FormField v-slot="{ componentField }" name="selectedAcademicCourse" :validate-on-blur="!isFieldDirty">
          <FormItem class="w-full">
            <FormControl v-bind="componentField">
              <CommonFormMultipleSelect searchPlaceholder="Filtre des matières..." :items="academicCourseList"
                v-model:selectedItems="selectedAcademicCourse" />
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
const registration = registrationStore()

const route = useRoute();
const academicLevelId: number = registration.cache;
const loadingStore = useLoadingStore();
const _academicStore = academicStore();
const academicCourseList = await _academicStore.getAcademicCourse(academicLevelId) as Array<any>;
const selectedAcademicCourse = ref([] as Array<any>);

loadingStore.hide();


const selectedAcademicLevel = ref(null as any);
const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: null,
});

const onSubmit = handleSubmit(async () => {
  if (selectedAcademicCourse.value.length > 0) {
    loadingStore.show();
    try {
      let courseIds: Array<any> = [];
      selectedAcademicCourse.value.forEach(el => {
        courseIds.push({ CourseId: el["Id"] })
      });
      await _academicStore.setStudentAcademicCourse(courseIds);
      registration.next()
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
