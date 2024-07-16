<script setup lang="ts">
import { useForm } from 'vee-validate';
import { boolean } from 'zod';
import { toast } from '~/components/ui/toast';

const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();

const props = defineProps({
    suggestedTutor: {
        type: Object as any,
        default: () => undefined
    },
});

let suggestedTutor = ref(props.suggestedTutor);

const emit = defineEmits(['update:suggestedTutor']);
watch(suggestedTutor, (newVal) => {
    emit('update:suggestedTutor', newVal);
});

await usr.getSuggestedTutor().then(resp => {
       // loadingStore.show();
        suggestedTutor = resp as any;
        emit('update:suggestedTutor', suggestedTutor);
        //loadingStore.hide();
});
const { isFieldDirty, handleSubmit, values } = useForm({
    validationSchema: null,
})


const onSubmit = handleSubmit(async (values) => {
    if (suggestedTutor?.value) {
        loadingStore.show();
        try {
            await usr.acceptTutor(suggestedTutor.value);
            registration.next()
        } catch (e) {
            loadingStore.hide();
            toast({
                title: 'You submitted the following values:',
                description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
            })
        }
    } else {
        registration.next()
    }

});


// loadingStore.hide();
function continueWithoutTutor() {
    loadingStore.show();
    setTimeout(() => {
        loadingStore.hide();
        suggestedTutor.value = undefined;
    }, 500);
   
}


function chooseOtherTutor() {
    loadingStore.show();
    usr.getNewSuggestedTutor().then(resp => {
        suggestedTutor = resp as any;
        
        emit('update:suggestedTutor', suggestedTutor);
        loadingStore.hide();

    });
}
loadingStore.hide();
</script>

<template>
    <div>
        <form class="space-y-6" @submit="onSubmit">
            <CommonTemplateProfile v-if="suggestedTutor" :userData="suggestedTutor" />
            <div class="w-full flex flex-col gap-1 text-xs justify-end" v-if="suggestedTutor">
                <div @click="chooseOtherTutor()" class="flex justify-end"><Button type="button"
                        class="h-8 bg-color-light text-gray-800">Choisir un autre tuteur
                        ?</Button></div>
                <div @click="continueWithoutTutor()" stype="button" class="flex justify-end"><Button
                        class="h-8 bg-color-light text-gray-800">Continuer sans tuteur
                        pour le moment ?</Button></div>
            </div>
            <CommonFormSubmit v-if="suggestedTutor" position="bottom" title="Accepter" classList="" />
            <CommonFormSubmit v-if="!suggestedTutor" position="bottom" title="Continuer sans tuteur pour le moment"
                classList="bg-color-light text-gray-800 font-bold" />
        </form>
    </div>
</template>