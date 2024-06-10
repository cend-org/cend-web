<script lang="ts" setup>
import {authenticationStore} from "~/stores/authentication.store";
const store = authenticationStore()
</script>

<template>
  <div>
    <nav class="bg-color-main w-full flex flex-row items-center justify-between text-white px-3 py-2 gap-x-2 md:px-5 lg:px-20 xl:px-32">
      <div class="flex flex-row">
        <NavigationItemTitle />
        <NavigationItemLearnWithCend />
        <NavigationItemTutoring />
        <NavigationItemAbout  class="hidden lg:block"/>
      </div>
      <div class="flex flex-row gap-x-2" v-if="!store.connected">
        <NuxtLink  class="py-2 px-3 rounded-full cursor-pointer hover:bg-green-700 hidden lg:block">
          <span>Aide</span>
        </NuxtLink>
        <NavigationItemLogin />
        <NavigationItemRegister  />
        <div class="hidden">
          <NavigationItemMenu />
        </div>
      </div>
      <div v-else>
        <NavigationItemAvatar />
      </div>
    </nav>
  </div>
</template>