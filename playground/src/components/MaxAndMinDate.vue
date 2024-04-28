<script setup lang="ts">
  import dayjs from 'dayjs'

  import VueDayCalendar, { type EventSelect } from 'vue-day-calendar'

  const maxDate = dayjs().add(2, 'month').format('YYYY-MM-DD')
  const minDate = dayjs().subtract(2, 'month').format('YYYY-MM-DD')
  function handleSelect(value: EventSelect) {
    console.log('vale', value)
  }
</script>

<template>
  <div>
    <div>{{ maxDate }} maxDate</div>
    <div>{{ minDate }} minDate</div>
  </div>
  <VueDayCalendar :max-date :min-date @select="handleSelect"/>
</template>
