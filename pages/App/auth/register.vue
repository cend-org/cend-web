<script setup lang="ts">
definePageMeta({
  layout: 'onboarding'
})

const { apply } = useRTGuard()
watchEffect(() => { apply() })

const registration = registrationStore()

</script>
<template>
  <Component :is="registration.compos.component"  />
</template>