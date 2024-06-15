<script setup lang="ts">
const usr = userStore()
const props = defineProps({
  userData: {
    required: true,
    type: Object,
  },
});
let imageLink = ref("");
let videoLink = ref("");
onMounted(() => {
    usr.getProfileVideo().then(resp=>{
        if(resp){
            videoLink.value = resp as string;
        }
    });
    usr.getProfileImage().then(resp=>{
        if(resp){
            imageLink.value = resp as string;
        }
    });

});
</script>

<template>
    <div class="relative">
        <CommonTemplateProfileVideo :videoLink="videoLink"/>
        <CommonTemplateProfileImage :imageLink="imageLink" class="absolute top-20 left-2 w-[18vh] h-[18vh] rounded-full overflow-hidden border-4 border-gray-200 bg-gray-200"/>
        <div class="text-center ml-[22vw] mt-2 lg:ml-8 xl:ml-8 2xl:ml-8 text-lg font-bold mt-5">{{ `${props.userData.Name} ${props.userData.FamilyName}` }}</div>
   </div>
   <div class="text-xs h-[25vh] overflow-y-scroll" style="scrollbar-width: none !important;">
          <p>
            {{ `${props.userData.Profile}`}}
            {{ `${props.userData.AdditionalDescription}`}}
            {{ `${props.userData.ExperienceDetail}`}}
          </p>
        </div>
</template>