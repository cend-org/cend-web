<script setup lang="ts">
const props = defineProps({
  type: {
    required: true,
    type: String,
  },
  placeholder: {
    required: true,
    type: String,
  }
})

import {Input} from "~/components/ui/input";
import { Eye, EyeOff } from 'lucide-vue-next'
const show = ref(false)

</script>
<template>
  <Input v-if="type=='text' || type == 'email'"
      :type="props.type"
      :placeholder="props.placeholder"
      class="w-full h-12"
  />
  <div v-else class="relative w-full items-center">
    <Input :type="show?'text':'password'" placeholder="votre mot de passe" class="w-full h-12"  />
    <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer">
        <Button type="button" class="bg-transparent shadow-none hover:bg-transparent" @click="show = !show">
          <Eye v-if="!show" class="size-6 text-muted-foreground hover:bg-transparent" />
          <EyeOff class="size-6 text-muted-foreground hover:bg-transparent" v-else />
        </Button>
      </span>
  </div>
</template>