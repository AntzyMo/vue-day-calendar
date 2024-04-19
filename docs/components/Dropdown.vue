<script lang="ts" setup>
  const modelShowDropdown = defineModel()
</script>

<template>
  <div class="relative">
    <slot/>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="modelShowDropdown"
        class="absolute bg-white mt-2 right-0 ring-1 ring-black ring-opacity-5 rounded-md shadow-lg z-10"
      >
        <slot name="overlay"/>
      </div>
    </transition>
  </div>
</template>
