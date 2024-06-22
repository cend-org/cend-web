<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {MessagesSquare} from "lucide-vue-next";
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <div
          class="flex flex-col justify-center items-center bg-transparent cursor-pointer relative px-3 py-3"
      >
        <MessagesSquare />
        <Badge class="absolute top-0 right-0 text-[10px] p-1 h-4 w-4">5</Badge>
      </div>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle></SheetTitle>
        <SheetDescription>
<!--          Make changes to your profile here. Click save when you're done.-->
        </SheetDescription>
      </SheetHeader>
      <MessageBox />
      <SheetFooter>
        <SheetClose as-child>
<!--          <Button type="submit">-->
<!--            Save changes-->
<!--          </Button>-->
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>