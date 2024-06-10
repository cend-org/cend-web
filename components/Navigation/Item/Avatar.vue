<script setup lang="ts">
import { CircleUser  } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {authenticationStore} from "~/stores/authentication.store";

const store = authenticationStore()

function logout() {
  store.logout()
  navigateTo('/');
}

</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary" size="icon" class="rounded-full">
        <CircleUser class="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="border-none shadow w-[200px] rounded-sm">
      <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
<!--      <DropdownMenuSeparator />-->
<!--      <DropdownMenuItem>Settings</DropdownMenuItem>-->
<!--      <DropdownMenuItem>Support</DropdownMenuItem>-->
      <DropdownMenuSeparator />
      <DropdownMenuItem class="p-0">
        <Button @click="logout()" class="bg-transparent hover:bg-transparent shadow-none border-none w-full">
          Se déconnecter
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>