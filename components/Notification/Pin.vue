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
import { Bell } from "lucide-vue-next";
</script>
<style>
    .p-6{
        padding: 0.8rem !important;
    }
</style>
<template>
    <Sheet>
        <SheetTrigger asChild>
            <Button
                class="relative bg-gray-100 border-0 shadow-none text-gray-600 rounded-xl hover:bg-gray-100 hover:text-primary"
                size="icon">
                <Bell class="w-6 h-6  hover:rotate-12" />
                <Badge class="absolute top-0 right-0 text-[10px] p-1 h-3 w-3 rounded-full"></Badge>
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription>
                </SheetDescription>
            </SheetHeader>
            <NotificationBox />
            <SheetFooter>
                <SheetClose asChild></SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>