<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {loginComponent} from "~/constants/constants";
</script>
<template>
  <div class="w-full px-4 md:px-32">
    <div class="flex flex-col-reverse md:flex-row  w-full py-20 md:pt-40 md:pb-32">
      <div class="w-full text-3xl md:w-1/2 md:text-7xl font-semibold text-center">Connectez-vous <br /> pour accéder <br /> <span class="text-primary-700">à votre compte !</span> </div>
      <div class="w-full md:w-1/2 flex flex-row justify-center items-center">
        <div class="">
        </div>
        <!--        <img src="/image/cend_logo.png" alt="" class="w-1/3" />-->
      </div>
    </div>
    <div class="grid gap-3 p-4 md:grid-cols-2 px-1 md:px-32">
      <NuxtLink v-for="item in loginComponent" :to="item.href">
        <Card class="shadow-none rounded-sm hover:shadow h-full">
          <CardHeader>
            <CardTitle class="font-bold md:text-2xl">{{ item.title }}</CardTitle>
            <CardDescription>
              {{ item.description }}
            </CardDescription>
          </CardHeader>
        </Card>
      </NuxtLink>
    </div>
  </div>
  <div class="w-full pt-32">
    <div class="bg-primary-700 py-11 px-4 md:px-32 text-white">
    </div>
  </div>
</template>