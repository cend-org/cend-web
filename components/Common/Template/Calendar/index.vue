<template>
    <div class="w-full">
        <div class="w-full hidden lg:block xl:block 2xl:block">
            <table class="w-full ">
                <thead>
                    <tr class="">
                        <th class="p-2 border-separate border-spacing-2 border border-slate-400 font-bold text-xl text-gray-400 rounded-t-xl"
                            v-for="day in DAYS_NAME" :key="day">{{ day }}</th>
                    </tr>
                </thead>
                <tbody class="w-full">
                    <tr>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">
                            <CommonTemplateCalendarContent />
                        </td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                    </tr>
                    <tr>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">
                            <CommonTemplateCalendarContent />
                        </td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                    </tr>
                    <tr>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">
                            <CommonTemplateCalendarContent />
                        </td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                        <td class="p-2 border-separate border-spacing-2 border border-slate-400">Indianapolis</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-full">

            <table class="w-full lg:hidden xl:hidden 2xl:hidden">
                <thead class="w-full">
                    <tr class="w-full">
                        <th class=" p-2 border-spacing-2 border border-slate-400 font-bold text-xl text-gray-400 rounded-t-xl">
                            <div class="w-full h-full flex items-center justify-between justify-center">
                                <Button variant="ghost" size="icon" class="rounded-full">
                                    <ArrowLeft class="w-8 h-8"/>
                                </Button>
                                <p class="w-full p-2">
                                  {{ DAYS_NAME[0] }}
                                </p>
                                <Button variant="ghost" size="icon" class="rounded-full">
                                    <ArrowRight class="w-8 h-8" />
                                </Button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="w-full">
                    <tr>
                        <td class="p-2 border-separate  border border-slate-400">
                            <CommonTemplateCalendarContent />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
const DAYS_NAME = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THUR"
]
</script>
