<script setup lang="ts">
  import VueDayCalendar from 'vue-day-calendar'
  import { type VueDayCalendarProps } from 'vue-day-calendar'

  const classes: VueDayCalendarProps['classes'] = {
    week_day: '!text-[10px]',
    day_selected: '!bg-red text-white',
    today: '!text-white !bg-sky-400',
    day: '!h-6 !leading-6 rounded-5px rounded-5px !text-10px text-center !w-6'
  }
</script>

<template>
  <VueDayCalendar :classes/>
</template>
