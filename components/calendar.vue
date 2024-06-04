<script lang="ts" setup>
import { format } from 'date-fns';
const calendarStore = useCalendarStore();
const date = ref(new Date());
const attrs = ref([
    {
      mask: 'MM/DD/YYYY',
      key: 'today',
      highlight: {
        color: 'green',
        fillMode: 'solid'
      },

      dates: new Date()
    }
  ])

defineProps({ 
  date: {
    type: Date, 
    default: new Date(),
  }

})
const emit = defineEmits(['close', 'confirm'])

function onConfirm(){
    calendarStore.set(date.value);
    emit('confirm')
}

function onClose(){
    emit('close')
}
</script>
<style>
.vc-container, .vc-container *{
    width: 100% !important;
}
.vc-bordered{
    border: none !important;
}
</style>
<template>
  <UModal  prevent-close>
    <UCard>
        <VDatePicker v-model="date" :attributes="attrs" cssPath="w-full h-full" locale="fr"/>
        <div class="w-full flex justify-between flex-row-reverse">
            <UButton @click="onConfirm()" :label="$t('confirm')"  class="w-[150px] bg-green-300 hover:bg-green-500 text-gray-900" block />
            <UButton @click="onClose()" :label="$t('back')" class="w-[150px] bg-green-300 hover:bg-green-500 text-gray-900" block/>
        </div>
    </UCard>
  </UModal>
</template>