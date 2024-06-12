<script setup lang="ts">
const registration = registrationStore()

const { apply } = useRTGuard()

watchEffect(() => { apply() })

</script>
<template>
  <Component :is="registration.compos.component"  />
</template>