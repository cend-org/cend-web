<script lang="ts" setup>
const { isAuthenticated } = useAuthStore()
</script>

<template>
  <div>
    <nav class="bg-color-main w-full flex flex-row items-center justify-between text-white px-3 py-2 gap-x-2 md:px-5 lg:px-20 xl:px-32">
      <div class="flex flex-row">
        <NavigationXItemTitle />
        <NavigationXItemLearnWithCend />
        <NavigationXItemTutoring />
        <NavigationXItemAbout  class="hidden lg:block"/>
      </div>
      <div class="flex flex-row gap-x-2" v-if="!isAuthenticated()">
        <NuxtLink  class="py-2 px-3 rounded-full cursor-pointer hover:bg-green-700 hidden lg:block">
          <span>Aide</span>
        </NuxtLink>
        <NavigationXItemLogin />
        <NavigationXItemRegister  />
        <div class="hidden">
          <NavigationXItemMenu />
        </div>
      </div>
      <div v-else>
        <NavigationXItemLogOut />
      </div>
    </nav>
  </div>
</template>