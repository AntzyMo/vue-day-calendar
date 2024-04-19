<script setup lang="ts">
  import { ref } from 'vue'

  import 'vue-day-calendar/style.css'
  import VueDayCalendar from 'vue-day-calendar'

  const vueDayCalendarRef = ref<InstanceType<typeof VueDayCalendar>>()

  const month = ref('2023-04')

  function handleMonth(value: string) {
    month.value = value
  }

  function goToToday() {
    vueDayCalendarRef.value!.goToToday()
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
      ref="vueDayCalendarRef"
      v-model:month="month"
    >
      <template #footer>
        <span class="text-sm">{{ $t(`index.currentMonth`) }}: {{ month }}</span>
      </template>
    </VueDayCalendar>
  </div>
</template>
