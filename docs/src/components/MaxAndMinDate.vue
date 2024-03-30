<script setup lang="ts">
  import dayjs from 'dayjs'

  import { VueDayCalendar } from 'vue-day-calendar'

  const maxDate = dayjs('2024-5-1')
</script>

<template>
  <VueDayCalendar :max-date/>
</template>
