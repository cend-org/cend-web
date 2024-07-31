<template>
    <div class="w-full flex flex-row gap-0">
        <Button variant="ghost" size="icon" class="rounded-full">
            <Video />
        </Button>
        <Button variant="ghost" size="icon" class="rounded-full">
            <Map />
        </Button>
        <Button variant="ghost" size="icon" class="rounded-full">
            <CalendarCheck2 />
        </Button>
    </div>
</template>
<script setup  lang="ts" >
    import {Video, CalendarCheck2, Map} from 'lucide-vue-next'
</script>