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
    console.log('month change value', value)
  }
  function goToToday() {
    month.value = dayjs().format('YYYY-MM')
  }
</script>

<template>
  <div>
    <div class="mb-4" flex="~ justify-between">
      <button class="btn" @click="handleMonth('2023-01')">
        2023-01
      </button>
      <button class="btn" @click="goToToday">
        Go to Today
      </button>
    </div>
    <VueDayCalendar
      :month
      @change="monthChange"
    >
      <template #footer>
        <span class="text-sm">{{ $t(`index.currentMonth`) }}: {{ month }}</span>
      </template>
    </VueDayCalendar>
  </div>
</template>
