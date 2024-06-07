<template>
  <div class="w-full flex justify-center mt-6">
    <div class="p-2 w-full lg:w-[25rem] xl:w-[25rem] 2xl:w-[25rem] flex flex-col gap-2">
      <form action="" class="w-full flex flex-col gap-2 pt-3">
        <h1 class="text-center text-xl text-gray-600 poppins-bold py-2">{{ $t('renumeration') }}
        </h1>
        <UForm :state="state" class="space-y-2" @submit="onSubmit">
          <div class="p-2">
            <div class=" flex flex-col gap-1">
              <div class="flex flex-row justify-content-between w-full gap-1" v-for="renumeration in renumerations">
                <div v-if="renumeration.name == 'first_try'" class="w-full p-2 border-2 border-gray-400">
                  {{ $t(renumeration.name) }}</div>
                <div v-if="renumeration.name != 'first_try'" class="w-full p-2 border-2 border-gray-400">
                  {{ renumeration.name }}</div>
                <div class="w-full p-2 border-2 border-gray-400 text-center">
                  <span v-if="!renumeration.editable">{{ renumeration.renumeration }} %</span>
                  <div v-if="renumeration.editable" class=" w-full h-full inline-flex gap-2 align-items-center">
                    <input autocomplete="off" class="w-full text-center rounded-lg bg-green-100" ref="moneyInput"
                      type="text" name="currency" v-model="state.renumeration" @input="onInput" @focus="onFocus"
                      @keydown="onKeydown">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute left-0 bottom-0 lg:relative xl:relative 2xl:relative p-3 lg:p-0 xl:p-0 2xl:p-0 w-full">
            <UButton size="lg" type="submit" class="bg-color-main hover:bg-green-500" block>
              {{ $t(`continue`) }}
            </UButton>
          </div>
        </UForm>
      </form>
    </div>
  </div>
</template>
<style>
.money-input {
  text-align: center;
}
</style>
<script setup lang="ts">
const loadingStore = useLoadingStore();
loadingStore.hide();
const toast = useToast();
const coursePreferenceStore = useCoursePreferenceStore();
const renumerations = ref([
  {
    "name": "first_try",
    "renumeration": "0",
    "editable": true,
    "type": 'number'
  },
  {
    "name": "0-20h",
    "renumeration": "50",
    "editable": false,
    "type": 'percentage'
  },
  {
    "name": "21-50h",
    "renumeration": "55",
    "editable": false,
    "type": 'percentage'
  },
  {
    "name": "50-200h",
    "renumeration": "58",
    "editable": false,
    "type": 'percentage'
  },
  {
    "name": "200-400h",
    "renumeration": "61",
    "editable": false,
    "type": 'percentage'
  },
  {
    "name": "400h +",
    "renumeration": "70",
    "editable": false,
    "type": 'percentage'
  }
]);
const state = reactive({
  renumeration: '0$'
});
const moneyInput = ref<HTMLInputElement | null>(null);
const money = ref(0)
function removeLeadingZeros(val: any) {
  if (val === '0$') {
    return val.replace(',', ".").replace(/\s+/g, ''); // Return the input value unchanged if it's exactly "0$"
  }
  return val.replace(/^0+(?!\.|$)/, '').replace(',', ".").replace(/\s+/g, '');
}
const onInput = (event: any) => {
  const { target } = event;
  let inputValue = target.value;

  // Ensure the $ sign is always at the end and not editable
  if (!inputValue.includes('$')) {
    inputValue += '$';
  } else {
    inputValue = inputValue.replace('$', '') + '$';
  }

  // Remove any extra $ signs if present
  const dollarIndex = inputValue.indexOf('$');
  inputValue = inputValue.slice(0, dollarIndex + 1) + inputValue.slice(dollarIndex + 1).replace(/\$/g, '');

  // Update state.renumeration
  state.renumeration = removeLeadingZeros(inputValue);

  // Update the cursor position
  nextTick(() => {
    if (moneyInput.value && typeof moneyInput.value.setSelectionRange === 'function') {
      const pos = inputValue.length - 1; // Cursor should be before the $ sign
      moneyInput.value.setSelectionRange(pos, pos);
    }
  });
};

const onFocus = () => {
  nextTick(() => {
    if (moneyInput.value && typeof moneyInput.value.setSelectionRange === 'function') {
      const pos = state.renumeration.length - 1; // Cursor should be before the $ sign
      moneyInput.value.setSelectionRange(pos, pos);
    }
  });
};

const onKeydown = (event: any) => {
  const { key, target } = event;
  const cursorPosition = target.selectionStart;

  // Prevent moving cursor past the $ sign
  if (key === 'ArrowRight' && cursorPosition === target.value.length - 1) {
    event.preventDefault();
  }

  // Prevent deleting the $ sign
  if ((key === 'Backspace' && cursorPosition === target.value.length) ||
    (key === 'Delete' && cursorPosition === target.value.length - 1)) {
    event.preventDefault();
  }
};

async function onSubmit() {
  const money = parseFloat(state.renumeration.replace(/\$/g, ''));
  loadingStore.show();
  setTimeout(() => {
    navigateTo("/authentications/register/tutor/verification");
  }, 500);

}

</script>