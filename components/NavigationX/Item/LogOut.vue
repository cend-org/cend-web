<script lang="ts" setup>
import {Button} from '@/components/ui/button'
import {authenticationStore} from "~/stores/authentication.store";
const store = authenticationStore()

function logout() {
  store.logout()
  navigateTo('/');
}
</script>

<template>
  <Button  @click="logout()" class="move font-normal bg-secondary text-color-main px-5 py-2 rounded-full cursor-pointer hover:bg-green-700 hover:text-secondary shadow-none border-none">
    Se déconnecter
  </Button>
</template>
