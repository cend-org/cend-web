<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
const days = [
  "DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"
]
</script>

<template>
  <div class="w-full px-0 lg:px-20 xl:px-20 3xl:px-20">
    <div class="w-full font-bold  flex  justify-between  items-center py-2">
      <div class="w-full text-2xl">
        <span class="text-gray-400">Hello, </span>
        <span class="text-gray-900">TAFITA Julis!</span>
      </div>
      <div class="w-full flex flex-col-reverse  lg:flex-row xl:flex-row 2xl:flex-row gap-4 items-end lg:items-center xl:items-center 2xl:items-center justify-end">
        <span class="text-xs text-gray-400">
          07 Nov 2021, Sunday
        </span>
        <Button class="font-bold">
          Voire tout
        </Button>
      </div>
    </div>



    <div class="w-full h-full pt-8">
      <div class="header w-full lg:flex xl:flex 2xl:flex  flex-row justif-between gap-20 ">  
        <!--  flex-row justif-between gap-20 -->
        <div class="w-full">
          <div class="w-full flex justify-between">
            <div>
              <div class=" font-bold">Votre emploi du temps</div>
              <div class="text-xs font-bold text-gray-400">aujourd'hui</div>
            </div>
            <div>
              <input class="border-2 rounded-full text-center w-[150px] text-sm font-bold" type="text"
                placeholder="10-11-2021">
            </div>
          </div>
          <div class="py-2">
            <div class="w-full flex flex-col gap-4">
              <div class="w-full flex flex-row items-center justify-between gap-4 py-4">
                <span class="font-bold text-gray-400 ">07:00</span>
                <Separator class="w-5/6"></Separator>
              </div>
              <div class="w-full flex flex-row items-center justify-start gap-8">
                <span class="font-bold text-gray-400">07:00</span>
                <Button variant="ghost" class="bg-purple-100  rounded-xl h-[80px] w-full">
                  <div class="w-full h-full flex flex-row items-center gap-4">
                    <div class="min-h-[40px] h-[40px] min-w-[40px] bg-purple-400 rounded-full"></div>
                    <div class=" h-full flex flex-col  items-start justify-center">
                      <span class="text-lg text-purple-700 font-bold">Géographie</span>
                      <span class="text-xs text-purple-500 font-bold">07:30 - 08:15</span>
                    </div>
                    <span class="w-full text-right text-purple-700 font-bold">
                      219
                    </span>
                  </div>
                </Button>
              </div>
              <div class="w-full flex flex-row items-center justify-start gap-8">
                <span class="font-bold text-gray-400">07:00</span>
                <Button variant="ghost" class="bg-orange-100  rounded-xl  h-[80px] w-full">
                  <div class="w-full h-full flex flex-row items-center gap-4">
                    <div class="min-h-[40px] h-[40px] min-w-[40px] bg-orange-400 rounded-full"></div>
                    <div class=" h-full flex flex-col items-start justify-center">
                      <span class="text-lg text-orange-700 font-bold ">Physics</span>
                      <span class="text-xs text-orange-500 font-bold ">07:30 - 08:15</span>
                    </div>
                    <span class="w-full text-right text-orange-700 font-bold">
                      135
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[5px] bg-gray-100"></div>
        <div class="w-full ">
          <div class="w-full pt-4">
            <div class="font-bold">Ce mois-çi</div>
            <div class="text-xs font-bold text-gray-400">05.11.2021 - 07.11.2021</div>
          </div>

          <div class="pt-4">
            <CommonTemplateCalendarSchedule />
          </div>

          <div class="pt-8">
            <div class="py-4">
              <div class="w-full pb-3">
                <div class="font-bold">Cours en ce moment !</div>
                <div class="text-xs font-bold text-gray-400">3h Français</div>
              </div>
              <Button variant="ghost" class="bg-orange-100  rounded-xl  h-[80px] w-full">
                <div class="w-full h-full flex flex-row items-center gap-4">
                  <div class="min-h-[40px] h-[40px] min-w-[40px] bg-orange-400 rounded-full"></div>
                  <div class=" h-full flex flex-col items-start justify-center">
                    <span class="text-lg text-orange-700 font-bold ">Physics</span>
                    <span class="text-xs text-orange-500 font-bold ">07:30 - 08:15</span>
                  </div>
                </div>
              </Button>
            </div>
            <div class="py-4">
              <div class="w-full pb-3">
                <div class="font-bold">Cours qui va venir!</div>
                <div class="text-xs font-bold text-gray-400">3h Français</div>
              </div>
              <Button variant="ghost" class="bg-orange-100  rounded-xl  h-[80px] w-full">
                <div class="w-full h-full flex flex-row items-center gap-4">
                  <div class="min-h-[40px] h-[40px] min-w-[40px] bg-orange-400 rounded-full"></div>
                  <div class=" h-full flex flex-col items-start justify-center">
                    <span class="text-lg text-orange-700 font-bold ">Physics</span>
                    <span class="text-xs text-orange-500 font-bold ">07:30 - 08:15</span>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>