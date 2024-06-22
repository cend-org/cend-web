<template>
    <form @submit="onSubmit">
        <div v-if="state == 'without_tutor'">
            Félicitation de faire confiance à CEND, nous vous enverrons un email de confirmation.
            <CommonFormSubmit position="bottom" classList="" />
        </div>
        <div v-if="state == 'with_tutor_congrats'">
            <p>
                Premiére rencontre est à 50% de l'investissement et vous pouvez changer gratuitement pour un autre
                tuteur si jamais ça ne marche pas avec {{ cacheData.tutorName }} ce qui nous étonnerait.
                
            </p>
            <br>
            <p>
                Passer au payement par carte de crédit ou de débit pour la premiére rencontre ce  {{ new Date(cacheData.date).toDateString() }} à {{ new Date(cacheData.date).getHours }}: {{ new Date(cacheData.date).getMinutes }} avec
                {{ cacheData.tutorName }}.
            </p>
            <CommonFormSubmit position="bottom" classList="" />
        </div>
        <div v-if="state == 'with_tutor_tarif'">
            <p class="text-lg font-bold">
                Tarif est de 250 $, pour  {{ cacheData.academicCourses }} , de niveau {{ cacheData.academicLevelNames }},
            </p>
            <br>
            <p>
                Premiére rencontre est à 50% de l'investissement et vous pouvez changer gratuitement pour un autre
                tuteur si jamais ça ne marche pas avec  {{ cacheData.tutorName }} ce qui nous étonnerait.
            </p>
            <br>
            <p class="pb-5">
                Passer au payement par carte de crédit ou de débit pour la premiére rencontre ce {{ new Date(cacheData.date).toDateString() }} à {{ new Date(cacheData.date).getHours }}: {{ new Date(cacheData.date).getMinutes }} avec
                {{ cacheData.tutorName }}.
            </p>
            <CommonFormSubmit position="bottom" classList="" />
        </div>

        
    </form>

</template>
<script setup lang="ts">

import { useForm } from 'vee-validate';


const state = ref("with_tutor_tarif");


const usr = userStore()
const registration = registrationStore()
const loadingStore = useLoadingStore();
loadingStore.hide();

const cacheData = ref(usr.getCachedData());
state.value = cacheData.value.hasTutor? "with_tutor_tarif" : 'without_tutor';
watch(cacheData.value, (newValue) => {
    state.value = newValue.hasTutor? "with_tutor_tarif" : 'without_tutor';
  //currentPage.value = 1; // Reset page index on filter change
});


//console.log("CACHE_DATA", cacheData.hasTutor)
const { isFieldDirty, handleSubmit, values } = useForm({
    validationSchema: null,
});

const onSubmit = handleSubmit(async (values) => {
    if (state.value == 'with_tutor_tarif') {
        state.value = 'with_tutor_congrats'
    }

    if (state.value == 'with_tutor_congrats') {
        registration.next();
        usr.destroyCachedData();
    }

    if(state.value == 'without_tutor'){
        registration.next();
        usr.destroyCachedData();
    }
});
</script>