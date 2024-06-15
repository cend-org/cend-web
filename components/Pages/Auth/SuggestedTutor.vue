<template>
    <LayoutAuthentication :title="suggestedTutor? 'Voici le meilleur tuteur pour convenir à vos besoins:':'Malheureusement, nous n\'avons pas trouver un tuteur qui comble vos attentes.'">
      <PagesWidgetsNewSuggestedTutor v-model:suggestedTutor="suggestedTutor"/>
    </LayoutAuthentication>
</template>
<script setup lang="ts">
 let suggestedTutor = ref(undefined as any);
</script>