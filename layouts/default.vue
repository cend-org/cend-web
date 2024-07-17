<template>
<div class="w-full flex flex-col">
  <NavigationApp/>
  <div class="flex flex-row w-full">
    <NavigationAppSide/>
    <div class="p-5">
      <slot />
    </div>
  </div>
  <!-- <div class="w-full flex flex-row">
    <NavigationAppSide class="w-1/6" />
    <div class="w-full">
        <slot />
      </div>
  </div> -->
</div>
</template>