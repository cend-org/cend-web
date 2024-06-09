<template>
  <Popover>
    <PopoverTrigger>
      <div class="move font-normal px-3 py-2 rounded-full cursor-pointer hover:bg-green-700">
        Se connecter
      </div>
    </PopoverTrigger>
    <PopoverContent class="shadow border-none" >
      <div class="flex flex-col">
        <NuxtLink class="flex flex-col cursor-pointer font-semibold px-2 py-2 hover:bg-gray-100 text-gray-700"
                  :to="item.href"
                  v-for="item in loginComponent">
          <div class="font-semibold">{{ item.title }}</div>
          <div class="font-light text-sm">
            {{ item.description }}
          </div>
        </NuxtLink>
      </div>
    </PopoverContent>
  </Popover>
</template>
<script setup lang="ts">
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import  { loginComponent } from "~/constants/constants";
</script>