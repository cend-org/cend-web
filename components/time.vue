<script lang="ts" setup>
import { format } from 'date-fns';
const timeStore = useTimeStore();
const time = ref(new Date());
defineProps({
  slot: {
    type: Number,
    default: 0
  }

})
const emit = defineEmits(['close', 'confirm'])

function onConfirm(slot: any) {
  timeStore.set(format(time.value, 'HH:mm'), slot);
  emit('confirm')
}

function onClose() {
  emit('close')
}
</script>
<style>
.vc-focus:focus {
  border-color: inherit;
  outline: none !important;
  box-shadow: none;
}

.vc-time-header {
  display: none;
}

.vc-time-picker {
  font-size: xx-large;
  font-weight: bold;
  font-family: 'poppins-medium';
}

.vc-base-icon {
  display: none;
}

/* .TIME-PICKER  div:nth-of-type(2) > div > div{
 width: 23vw !important;
 background-color: red !important;
} */
</style>
<template>
  <UModal prevent-close>
    <UCard>
      <VDatePicker v-model="time" cssPath="w-full h-full text-lg" locale="fr" mode="time" :is24hr="true" />
      <div class="w-full flex justify-between flex-row-reverse">
        <UButton @click="onConfirm(slot)" :label="$t('confirm')"
          class="w-[150px] bg-green-300 hover:bg-green-500 text-gray-900" block />
        <UButton @click="onClose()" :label="$t('back')" class="w-[150px] bg-green-300 hover:bg-green-500 text-gray-900"
          block />
      </div>
    </UCard>
  </UModal>

</template>