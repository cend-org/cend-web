<script setup lang="ts">
definePageMeta({
  layout: 'onboarding'
})

const registration = registrationStore()

const { apply } = useRTGuard()

watchEffect(() => { apply() })

</script>
<template>
  <Component :is="registration.compos.component"  />
</template>