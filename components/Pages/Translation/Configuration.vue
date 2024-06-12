<script setup lang="ts">
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import { Activity } from "lucide-vue-next";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import {Textarea} from "~/components/ui/textarea";

const languages = [
  {
    name: "Français FR",
    value: 0
  },
  {
    name: "Français CA",
    value: 1
  },
  {
    name: "English",
    value: 2
  },
]

</script>
<template>
  <form class="grid w-full items-start gap-6">
    <fieldset class="grid gap-6 rounded-lg border p-4">
      <legend class="-ml-1 px-1 text-sm font-medium">
        Settings
      </legend>
      <div class="grid gap-3">
        <Label for="model">Langue</Label>
        <Select default-value="0">
          <SelectTrigger id="model" class="items-start [&_[data-description]]:hidden">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem :value="lang.value.toString()" v-for="lang in languages" class="cursor-pointer py-3">
              <div class="flex items-start gap-x-3 text-muted-foreground">
                <Activity class="size-5" />
                <div class="grid gap-0.5">
                  <p><span class="font-medium text-foreground">{{ lang.name }}</span></p>
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </fieldset>
  </form>
</template>
