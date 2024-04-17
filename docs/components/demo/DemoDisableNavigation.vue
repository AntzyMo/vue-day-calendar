<script setup lang="ts">
  import VueDayCalendar from 'vue-day-calendar'

  const disableNavigation = ref(true)
</script>

<template>
  <div>
    <button class="btn" @click="disableNavigation = !disableNavigation">
      Toggle Disable Navigation
    </button>
    <VueDayCalendar :disable-navigation/>
  </div>
</template>
