<template>
    <div class="w-full h-full flex flex-row justify-between">
        <div class="w-full flex flex-row gap-0">
            <Avatar class="-ml-0">
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar class="-ml-7">
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar class="-ml-7">
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar class="-ml-7">
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        <div class="w-full flex justify-end">
            <Button
                class="w-[30px] min-w-[30px] h-[30px] max-h-[30px] bg-gray-100 border-0 shadow-none text-black rounded-xl hover:bg-gray-100 hover:text-primary"
                size="icon">
                <Ellipsis />
              </Button>
        </div>
    </div>
</template>
<script setup  lang="ts" >
import {Ellipsis} from 'lucide-vue-next'
</script>