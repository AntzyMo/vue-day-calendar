<script setup lang="ts">
  import IconButton from './IconButton.vue'
  import { VueDayCalendar, type VueDayCalendarProps } from 'vue-day-calendar'

  const classes: VueDayCalendarProps['classes'] = {
    week_day: '!text-[10px]',
    day: '!h-6 hover:hoverItemBackground  !leading-6 rounded-[5px] rounded-[5px] !text-[10px] text-center  !w-6'
  }
</script>

<template>
  <VueDayCalendar :classes="classes">
    <template #head="{ date, tigger }">
      <div class="flex items-center justify-between mb-2 mx-1.5">
        <div class="font-medium text-[10px]">
          {{ date }}
        </div>
        <div class="flex gap-[2px] items-center">
          <IconButton @click="tigger('prev')">
            <div class="i-mingcute-left-fill  text-sm"/>
          </IconButton>

          <IconButton @click="tigger('next')">
            <div class="i-mingcute-right-fill  text-sm"/>
          </IconButton>
        </div>
      </div>
    </template>
  </VueDayCalendar>
</template>
