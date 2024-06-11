<script setup lang="ts">
const route = useRoute()
const registration = registrationStore()

const rt = <string>route.query['RT']

if (!route.query['RT'] || isNaN(parseInt(rt))) {
  // return to dashboard
  navigateTo("/")
}

if (![0,1,2,3].includes(parseInt(rt))){
  navigateTo("/")
}

registration.configure(parseInt(<string>route.query['RT']))

</script>
<template>
  <Component :is="registration.compos.component"  />
</template>