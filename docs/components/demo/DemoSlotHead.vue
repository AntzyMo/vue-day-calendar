<script setup lang="ts">
  import VueDayCalendar from 'vue-day-calendar'
</script>

<template>
  <VueDayCalendar>
    <template #head="{ date }">
      <span class="mr-2 text-sm">{{ date }}</span>
    </template>
  </VueDayCalendar>
</template>
