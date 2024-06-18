<script setup lang="ts">
const usr = userStore()
const props = defineProps({
  userData: {
    required: true,
    type: Object,
  },
});
let image = ref('/image/avatar.svg');
let video = ref("/");

getMedias();

onUpdated(() => {
  getMedias();
});


function getMedias() {
  usr.getProfileImageThumb().then(resp => {
    if (resp) {
      image.value = resp as string;
    }
  }, error => {
    image.value = '/image/avatar.svg';
  });

  usr.getProfileVideo().then(resp => {
    if (resp) {
      video.value = resp as string;
    }
  }, error => {
    video.value = '' as any;
  });
}
</script>

<template>
  <div class="relative">
    <CommonTemplateProfileVideo classList="bg-light-green w-full h-[10rem]" v-bind:videoLink="video" />
    <CommonTemplateProfileImage v-bind:imageLink="image"
      class="absolute top-20 left-2 w-[18vh] h-[18vh] rounded-full overflow-hidden border-4 border-gray-200 bg-gray-200" />
    <div class="text-center ml-[22vw] mt-2 lg:ml-8 xl:ml-8 2xl:ml-8 text-lg font-bold mt-5">{{ `${props.userData.Name}
      ${props.userData.FamilyName}` }}</div>
  </div>
  <div class="text-xs h-[23vh] overflow-y-scroll" style="scrollbar-width: none !important;">
    <p>
      {{ `${props.userData.Profile}` }}
      {{ `${props.userData.AdditionalDescription}` }}
      {{ `${props.userData.ExperienceDetail}` }}
    </p>
  </div>
</template>