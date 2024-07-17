<script setup lang="ts">
import { Sparkles, CalendarDays, Paperclip, LayoutDashboard } from 'lucide-vue-next'
const store = authenticationStore()

const navigations = [
  {
    icon: LayoutDashboard,
    name: "Mon dashboard",
    badge: 0,
    link: "/app/dashboard"
  },
  {
    icon: CalendarDays,
    name: "Mon calendrier",
    badge: 9,
    link: "/app/dashboard/calendar"
  },
  {
    icon: Paperclip,
    name: "Mes documents",
    badge: 1,
    link: "/app/dashboard/document"
  },
]

</script>
<template>
  <!-- v-if="store.connected" -->
  <div class="h-screen border-r-2 shadow-md"  >
    <div class="h-full flex flex-col justify-between">
        <section class="top w-full">
            <div class="">
              <div class="w-[100px] h-[100px] bg-red-300"></div>
            </div>
        </section>

        <section class="bottom">
            dsqdsq
        </section>
    </div>
    <!-- <div class="flex flex-col gap-y-10 py-4 px-5">
      <div class="flex flex-col">
        <span class="text-4xl font-bold text-primary">CEND</span>
        <span class="text-sm font-semibold text-gray-400">Compte étudiant</span>
      </div>
      <div>
        <Button class="border-none rounded-none w-full h-12 flex flex-row gap-x-2">
          <Sparkles />
          <span>Trouver un tuteur</span>
        </Button>
      </div>
      <div class="py-4">
        <NuxtLink v-for="navigation in navigations" :to="navigation.link"
          class="border-l-2 border-transparent text-xl flex flex-row gap-x-3 cursor-pointer px-3 py-4 hover:bg-primary-foreground hover:border-l-2 hover:border-l-primary"
          active-class="bg-primary-foreground border-l-2 border-l-primary">
          <Component :is="navigation.icon" />
          <span>{{ navigation.name }}</span>
          <Badge class="ml-auto rounded-full" v-if="navigation.badge > 0">{{ navigation.badge }}</Badge>
        </NuxtLink>
      </div>
    </div> -->
  </div>

</template>