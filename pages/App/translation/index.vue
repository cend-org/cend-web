<script setup lang="ts">
definePageMeta({
  layout: 'translation'
})

import {Newspaper,Settings} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
</script>

<template>
  <div class="grid h-screen w-full">
    <div class="flex flex-col">
      <header class="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
        <h1 class="text-xl font-semibold">
          Translation
        </h1>
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="ghost" size="icon" class="md:hidden">
              <Settings class="size-4" />
              <span class="sr-only">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent class="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Configuration</DrawerTitle>
              <DrawerDescription>
                Configure the settings for the model and messages.
              </DrawerDescription>
            </DrawerHeader>
            <PagesTranslationConfiguration />
          </DrawerContent>
        </Drawer>
        <div class="ml-auto gap-1.5 text-sm">
          <PagesTranslationNew />
        </div>
      </header>
      <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="relative hidden flex-col items-start gap-8 md:flex">
          <PagesTranslationConfiguration />
        </div>
        <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
          <PagesTranslationList />
        </div>
      </main>
    </div>
  </div>
</template>