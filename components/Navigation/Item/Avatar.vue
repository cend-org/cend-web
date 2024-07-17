<script setup lang="ts">
import { CircleUser, SquareUser, Bolt, LogOut, UserRound } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {authenticationStore} from "~/stores/authentication.store";

const store = authenticationStore()
 
function logout() {
  store.logout()
  navigateTo('/');
}

const navigations = [
  {
    icon: SquareUser,
    name: "Mon profile",
    link: "/app/dashboard/profile",
  },
  {
    icon: Bolt,
    name: "Paramètre",
    link: "/app/dashboard/setting",
  },
]

</script>
<template>
  <DropdownMenu  v-if="!store.isAuthRoute">
    <DropdownMenuTrigger as-child>
      <!-- <Button variant="secondary" size="icon" class="rounded-full">
        <CircleUser class="h-5 w-5" />
      </Button> -->
      <Button class="bg-gray-100 border-0 shadow-none text-gray-600 rounded-xl hover:bg-gray-100 hover:text-primary" size="icon">
        <UserRound class="w-6 h-6  hover:rotate-12" />
    </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="border-none shadow w-[200px] rounded-sm">
<!--      <DropdownMenuLabel>-->
<!--      </DropdownMenuLabel>-->
<!--      <DropdownMenuSeparator />-->
      <DropdownMenuItem v-for="navigation in navigations">
        <NuxtLink class="w-full h-full" :to="navigation.link">
          <div class="flex flex-row w-full">
            <div >{{ navigation.name }}</div>
            <Component class="ml-auto" :is="navigation.icon" />
          </div>
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="logout()">
        <div class="flex flex-row w-full">
          <div>Se déconnecter</div>
          <LogOut class="ml-auto" />
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>