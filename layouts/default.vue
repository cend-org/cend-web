<template>
  <div class="grid grid-cols-6">
    <div class="w-full h-screen shadow-lg">
      <NavigationAppSide />
    </div>
    <div class="col-span-5 px-20">
      <div>
        <NavigationApp />
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>