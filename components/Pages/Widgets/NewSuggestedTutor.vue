<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toast } from '~/components/ui/toast';

const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();

const props = defineProps({
    suggestedTutor: {
        type: Object as any,
        default: () => undefined
    }
});

let suggestedTutor = ref(props.suggestedTutor);

const emit = defineEmits(['update:suggestedTutor']);
watch(suggestedTutor, (newVal) => {
    emit('update:suggestedTutor', newVal);
});


usr.getSuggestedTutor().then(resp => {
    loadingStore.show();
    suggestedTutor = {
        Id: '5',
        FamilyName: "JACK",
        Name: "BEVERLY",
        Profile: "555555555555555555",
        AdditionalDescription: "22222222222222222222222",
        ExperienceDetail: "3265665515165151",

    } as any;
    emit('update:suggestedTutor', suggestedTutor);
    loadingStore.hide();

});

const { isFieldDirty, handleSubmit, values } = useForm({
    validationSchema: null,
})


const onSubmit = handleSubmit(async (values) => {
    registration.next()
    // loadingStore.show();
    // try {
    //     await usr.acceptTutorStudent();
    //     registration.next()
    // } catch (e) {
    //     loadingStore.hide();
    //     toast({
    //         title: 'You submitted the following values:',
    //         description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(e, null, 2))),
    //     })
    // }
});

loadingStore.hide();
function continueWithoutTutor(){
    suggestedTutor.value = undefined;
}
function chooseOtherTutor(){
    loadingStore.show();
    usr.getNewSuggestedTutor().then(resp => {
    suggestedTutor = {
        Id: '5',
        FamilyName: "JACK 6",
        Name: "BEVERLY",
        Profile: "555555555555555555",
        AdditionalDescription: "22222222222222222222222",
        ExperienceDetail: "3265665515165151",

    } as any;
    emit('update:suggestedTutor', suggestedTutor);
    loadingStore.hide();

});
}

</script>

<template>
    <div>
        <form class="space-y-6" @submit="onSubmit">
            <CommonTemplateProfile v-if="suggestedTutor" :userData="suggestedTutor" />
            <div class="w-full flex flex-col gap-1 text-xs justify-end">
                <div @click="chooseOtherTutor()" class="flex justify-end"><Button type="button"class="h-8 bg-color-light text-gray-800">Choisir un autre tuteur
                        ?</Button></div>
                <div @click="continueWithoutTutor()" class="flex justify-end"><Button class="h-8 bg-color-light text-gray-800">Continuer sans tuteur
                        pour le moment ?</Button></div>
            </div>

            <CommonFormSubmit position="bottom" title="Accepter" classList="" />

        </form>
    </div>
</template>