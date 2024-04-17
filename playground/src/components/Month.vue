<script setup lang="ts">
  import { ref } from 'vue'
  import type { EventChange } from 'vue-day-calendar'

  import 'vue-day-calendar/style.css'
  import VueDayCalendar from 'vue-day-calendar'

  const vueDayCalendarRef = ref<InstanceType<typeof VueDayCalendar>>()

  const month = ref('2023-04')

  function handleMonth(value: string) {
    month.value = value
  }

  function monthChange(value: EventChange) {
    console.log('value', value)
  }
  function goToToday() {
    vueDayCalendarRef.value!.goToToday()
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
    ref="vueDayCalendarRef"
    v-model:month="month"
    @change="monthChange"
  >
    <template #footer>
      <span class="text-sm">当前月份为：{{ month }}</span>
    </template>
  </VueDayCalendar>
</template>
