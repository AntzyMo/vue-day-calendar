<script setup lang="ts">
  import { ref } from 'vue'

  import 'vue-day-calendar/style.css'
  import VueDayCalendar from 'vue-day-calendar'

  const month = ref('2023-04-05')
  function handleMonth(value: string) {
    month.value = value
  }
</script>

<template>
  <button @click="handleMonth('2023-01-6')">
    2023-01-12
  </button>
  <button @click="handleMonth('2024-04-12')">
    2024-04-12
  </button>
  <VueDayCalendar :month/>
</template>
