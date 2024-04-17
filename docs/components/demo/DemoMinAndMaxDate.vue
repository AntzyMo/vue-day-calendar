<script setup lang="ts">
  import dayjs from 'dayjs'

  import VueDayCalendar from 'vue-day-calendar'

  const maxDate = dayjs().add(2, 'month')
  const minDate = dayjs().subtract(2, 'month')
</script>

<template>
  <div>
    <div class="mb-2 text-sm">
      <div>
        <span>{{ maxDate.format('YYYY-MM-DD') }}</span>
        <span class="ml-2 text-xs">maxDate</span>
      </div>
      <div>
        <span>{{ minDate.format('YYYY-MM-DD') }}</span>
        <span class="ml-2.2 text-xs">minDate</span>
      </div>
    </div>
    <VueDayCalendar :max-date :min-date/>
  </div>
</template>
