<script setup lang="ts">
  import { ref } from 'vue'
  import dayjs from 'dayjs'
  import type { EventChange } from 'vue-day-calendar'

  import 'vue-day-calendar/style.css'
  import VueDayCalendar from 'vue-day-calendar'

  const month = ref('2023-04')

  function handleMonth(value: string) {
    month.value = value
  }

  function monthChange(value: EventChange) {
    console.log('value', value)
  }

  function goToToday() {
    month.value = dayjs().format('YYYY-MM')
  }
</script>

<template>
  <button @click="handleMonth('2023-01-06')">
    2023-01-06
  </button>
  <button
    class="bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md"
    @click="goToToday"
  >
    Go to Today
  </button>

  <VueDayCalendar
    v-model:month="month"
    @change="monthChange"
  >
    <template #footer>
      <span class="text-sm">当前月份为：{{ month }}</span>
    </template>
  </VueDayCalendar>
</template>
