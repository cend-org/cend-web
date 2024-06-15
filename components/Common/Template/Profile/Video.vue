<script setup lang="ts">
import { Play,Pause, Repeat1, Repeat, Fullscreen } from 'lucide-vue-next';
const props = defineProps({
  videoLink: {
    required: true,
    type: String,
  },
  classList: {
    required: false,
    type: String,
  }
})

const videoRef = ref<HTMLVideoElement | null>(null);
let videoState = ref('pause');
function pause() {
    if (videoRef.value) {
        videoRef.value.pause();
        videoState.value = 'pause'
    }
}

function reset() {
    if (videoRef.value) {
        videoRef.value.currentTime = 0;
        play()
    }
}

function play() {
    if (videoRef.value) {
        videoRef.value.play();
        videoState.value = 'play'
    }
}
function fullScreen() {
    if (videoRef.value) {
        videoRef.value.requestFullscreen();
    }
}

onMounted(() => {
    alert(props.videoLink) 
});
</script>

<template>
    <div class="video">
        <div :class="['relative', props.classList? props.classList : 'w-full h-[10rem]']">
            <!-- props.classList? props.classList : 'w-full h-[10rem] bg-gray-200 relative' -->
            <video class=" w-full h-[100%]" v-if="props.videoLink" ref="videoRef" controlslist="nodownload">
                <source v-bind:src="props.videoLink">
            </video>
            <div class="h-full w-[35px]  gap-2 absolute top-0 right-2 z-[3]">
                <div class="flex flex-col gap-2 py-2">
                    <Button @click="play()" v-if="videoState == 'pause'" type="button"variant="ghost" size="icon">
                        <Play class="w-4 h-4 text-green-600" />
                    </Button>
                    <Button @click="pause()"  v-if="videoState == 'play'"  type="button"variant="ghost" size="icon">
                        <Pause class="w-4 h-4 text-green-600" />
                    </Button>
                    <Button @click="reset()"  type="button"variant="ghost" size="icon">
                        <Repeat class="w-4 h-4 text-green-600" />
                    </Button>
                    <Button @click="fullScreen()" type="button"variant="ghost" size="icon">
                        <Fullscreen class="w-4 h-4 text-green-600" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>