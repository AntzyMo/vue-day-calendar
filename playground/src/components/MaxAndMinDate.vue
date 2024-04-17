<script setup lang="ts">
  import dayjs from 'dayjs'

  import VueDayCalendar from 'vue-day-calendar'

  const maxDate = dayjs().add(2, 'month')
  const minDate = dayjs().subtract(2, 'month')
</script>

<template>
  <VueDayCalendar :max-date :min-date/>
</template>
