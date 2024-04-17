<script setup lang="ts">
  import VueDayCalendar from 'vue-day-calendar'

  const yearAndMonth = 'YYYY MM'
</script>

<template>
  <VueDayCalendar :year-and-month-format="yearAndMonth"/>
</template>
