<script setup lang="ts">
  import VueDayCalendar from 'vue-day-calendar'
</script>

<template>
  <VueDayCalendar>
    <template #cell="{ item }">
      <div class="relative">
        <span>{{ item.value }}</span>
        <div v-if="item.value === '28'" class="absolute bg-sky-300 bottom-0 h-1 left-50% rounded w-1"/>
      </div>
    </template>
  </VueDayCalendar>
</template>
