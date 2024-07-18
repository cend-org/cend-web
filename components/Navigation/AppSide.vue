<script setup lang="ts">
import { Sparkles, CalendarDays, Paperclip, LayoutDashboard, Ellipsis, UserRound, BarChartBig, Settings } from 'lucide-vue-next'

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


const navigationsBottom = [
  {
    icon: UserRound,
    name: "Profile",
    link: "/app/dashboard"
  },
  {
    icon: BarChartBig,
    name: "Finance",
    link: "/app/dashboard/calendar"
  },
  {
    icon: Settings,
    name: "Setting",
    link: "/app/dashboard/document"
  },
]

</script>
<template>
  <!-- v-if="store.connected" -->
  <div class="h-screen border-r-2 shadow-md w-1/6">
    <div class="h-full flex flex-col justify-between">
      <section class="top w-full">
        <div class=" flex flex-nowrap justify-between items-center gap-2 p-4 py-8">
          <div class="w-[70px] min-w-[70px] h-[70px] max-h-[70px] bg-red-300 rounded-full"
            style="background-image: url(/image/mock/pdp.jpg)"></div>
          <div class="w-full h-full flex flex-col align-center">
            <span class="text-lg font-semibold capitalize text-gray-600">NAO Julius</span>
            <span class="text-sm font-normal capitalize text-gray-500">étudiant</span>
          </div>
          <Button
            class="w-[30px] min-w-[30px] h-[30px] max-h-[30px] bg-gray-100 border-0 shadow-none text-gray-600 rounded-xl hover:bg-gray-100 hover:text-primary"
            size="icon">
            <Ellipsis class="w-6 h-6" />
          </Button>
        </div>

        <NuxtLink v-for="navigation in navigations" :to="navigation.link"
          class=" border-l-2 border-transparent text-xl flex flex-row gap-x-3 cursor-pointer px-3 py-4 hover:bg-primary-foreground hover:border-l-2 hover:border-l-primary"
          active-class=" bg-primary-foreground border-l-2 border-l-primary">

          <Component :is="navigation.icon" />
          <span>{{ navigation.name }}</span>
          <Badge class="ml-auto rounded-full" v-if="navigation.badge > 0">{{ navigation.badge }}</Badge>
        </NuxtLink>
      </section>
      <div>
        <Separator />
        <section class="bottom px-10">
          <div class="w-full h-full py-4 flex flex-col gap-1 justify-center">
            <Button v-for="navigation in navigationsBottom"
              class=" flex justify-between w-full bg-transparent text-gray-700 border-none shadow-none hover:border-none hover:shadow-none hover:bg-transparent">
              <div class="w-full">
                <Component :is="navigation.icon" />
              </div>
              <div class="text-xl  w-full text-left">
               {{ navigation.name }}
              </div>
            </Button>
          </div>
        </section>
      </div>

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