<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { signupComponent } from "~/constants/constants";
import { ArrowRight } from "lucide-vue-next";
const registration = registrationStore()
const loadingStore = useLoadingStore();

let selctedLanguage = ref("4");
</script>
<template>
  <div class="w-full">
    <div class="w-full flex justify-center items-center pt-20">
            <img src="/image/cend_logo.png" alt="" class="w-32 h-42" />
        </div>
        <div class="text-lg font-normal text-center px-5 py-10">
            Connectez-vous pour accéder à votre compte:
        </div>
        <div class="flex flex-col gap-4 w-full h-full px-5">
          <NuxtLink @click="registration.next()" v-for="item in signupComponent" :to="item.href" class="flex flex-row gap-2 items-center">
            <div class="w-full h-full">
                <div class="text-2xl font-bold">{{ item.title }}</div>
                <div class="py-1 text-xl text-gray-600" >
                  {{ item.description }}
                </div>
            </div>
            <ArrowRight  class="w-8 h-8 text-gray-600"/>
      </NuxtLink>
      </div>
  </div>
  <div class="w-full pt-32">
    <div class="bg-primary-700 py-11 px-4 md:px-32 text-white">
    </div>
  </div>
</template>