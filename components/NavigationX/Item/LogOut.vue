<script lang="ts" setup>
import {Button} from '@/components/ui/button'
import {LocalStorageremoveItem} from "~/scripts/local-storage";
import {environment} from "~/scripts/environment";
function logout() {
  console.log("ok")
  LocalStorageremoveItem(environment.auth_token);
  setTimeout(() => {
    navigateTo('/');
  }, 500);
}
</script>

<template>
  <Button  @click="logout()" class="move font-normal bg-secondary text-color-main px-5 py-2 rounded-full cursor-pointer hover:bg-green-700 hover:text-secondary shadow-none border-none">
    Se déconnecter
  </Button>
</template>
