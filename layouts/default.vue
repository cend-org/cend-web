<template>
  <div class="grid grid-cols-6">
    <NavigationAppSide />
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