<script setup lang="ts">
  import dayjs from 'dayjs'

  import VueDayCalendar from 'vue-day-calendar'

  const maxDate = dayjs().add(2, 'month').format('YYYY-MM-DD')
  const minDate = dayjs().subtract(2, 'month').format('YYYY-MM-DD')
</script>

<template>
  <div>
    <div class="mb-2 text-sm">
      <div>
        <span>{{ maxDate }}</span>
        <span class="ml-2 text-xs">maxDate</span>
      </div>
      <div>
        <span>{{ minDate }}</span>
        <span class="ml-2.2 text-xs">minDate</span>
      </div>
    </div>
    <VueDayCalendar :max-date :min-date/>
  </div>
</template>
