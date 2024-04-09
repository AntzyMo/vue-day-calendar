<script setup lang="ts">
  import { ref } from 'vue'

  import 'vue-day-calendar/style.css'
  import VueDayCalendar from 'vue-day-calendar'

  const month = ref('2023-04-05')
  function handleMonth(value: string) {
    month.value = value
  }
  function onMonthChange(val) {
    console.log('val Month', val)
  }
</script>

<template>
  <button @click="handleMonth('2023-01-06')">
    2023-01-06
  </button>
  <button @click="handleMonth('2024-04-12')">
    2024-04-12
  </button>
  <VueDayCalendar :month @change="onMonthChange"/>
</template>
