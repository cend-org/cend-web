<template>
<div class="w-full flex flex-col">
  <NavigationApp/>
  <div class="flex flex-row w-full">
    <div class="w-1/6 hidden lg:block xl:block 2xl:block">
    <NavigationAppSide/>
    </div>
    <div class="w-full p-5  lg:w-5/6 xl:w-5/6 2xl:w-5/6">
      <slot />
    </div>
  </div>
</div>
</template>