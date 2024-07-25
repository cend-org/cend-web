<script setup lang="ts">
import { Sparkles, CalendarDays, Paperclip, LayoutDashboard, Ellipsis, UserRound, BarChartBig, Settings, HelpCircle, LogOut } from 'lucide-vue-next'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
    link: "/app/dashboard/profile"
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
  <div class="relative h-full border-r-2">
    <div class="h-full  flex flex-col justify-between">
      <section class="top w-full h-full">
        <div class=" flex flex-nowrap justify-between items-center gap-2 p-4 py-8">
          <div class="w-[70px] min-w-[70px] h-[70px] max-h-[70px] bg-red-300 rounded-full"
            style="background-image: url(/image/mock/pdp.jpg)"></div>
          <div class="w-full h-full flex flex-col align-center">
            <span class="text-lg font-semibold capitalize text-gray-600">DUM Man</span>
            <span class="text-sm font-normal capitalize text-gray-500">étudiant</span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                class="w-[30px] min-w-[30px] h-[30px] max-h-[30px] bg-gray-100 border-0 shadow-none text-gray-600 rounded-xl hover:bg-gray-100 hover:text-primary"
                size="icon">
                <Ellipsis class="w-6 h-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent asChild className="w-50" side="right">
              <div class="h-full w-full flex flex-col gap-0">
                <Button  variant="ghost">
                  <div class="w-full flex flex-row justify-start gap-4">
                    <HelpCircle/>
                    <span class="font-bold">Aide</span>
                  </div>
              </Button>
              <Button  variant="ghost">
                  <div class="w-full flex flex-row justify-start gap-4">
                    <LogOut/>
                    <span class="font-bold">Se déconnecter</span>
                  </div>
              </Button>
             
              </div>
            </PopoverContent>
          </Popover>
          
        </div>

        <div class="py-4 px-2">
          <Button class="rounded-none w-full h-full text-lg">
            Nouveau Tuteur ?
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
      <div class="w-full">
        <Separator />
        <section class="bottom">
          <NuxtLink v-for="navigation in navigationsBottom" :to="navigation.link"
            class=" border-l-2 border-transparent text-xl flex flex-row gap-x-3 cursor-pointer px-3 py-4 hover:bg-primary-foreground hover:border-l-2 hover:border-l-primary"
            active-class=" bg-primary-foreground border-l-2 border-l-primary">

            <Component :is="navigation.icon" />
            <span>{{ navigation.name }}</span>
          </NuxtLink>
        </section>
      </div>
    </div>
  </div>
</template>