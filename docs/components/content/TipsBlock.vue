<script setup lang="ts">
  defineProps<{
    type: string
    title: string
  }>()
</script>

<template>
  <div class="bg-gray-100  pl-3  py-1.5  rounded-md  w-650px">
    {{ title }}
  </div>
</template>
