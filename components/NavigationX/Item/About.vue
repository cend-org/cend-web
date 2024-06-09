<template>
  <NavigationMenu>
    <NavigationMenuList class="bg-transparent">
      <NavigationMenuItem class="rounded-full cursor-pointer hover:bg-green-700 active:bg-green-700">
        <NavigationMenuTrigger class="p-3 rounded-full cursor-pointer bg-transparent hover:bg-green-700 hover:text-white active:bg-green-700 focus:bg-green-700 focus:text-white" style="background: transparent!important;">
          <span class="move font-normal">À propos de nous</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent class=" bg-transparent rounded">
          <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <NuxtLink
                active-class="bg-gray-100"
                v-for="component in aboutComponent"
                :key="component.title"
                :title="component.title"
                :href="component.href"
                class="px-5 py-2 hover:bg-gray-100 text-gray-700"
            >
              <div class="font-semibold">{{ component.title }}</div>
              <div class="font-light text-sm">
                {{ component.description }}
              </div>
            </NuxtLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem >
    </NavigationMenuList>
  </NavigationMenu>
</template>
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList, NavigationMenuTrigger
} from "~/components/ui/navigation-menu";
import { aboutComponent} from "~/constants/constants";
</script>