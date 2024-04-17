<script setup lang="ts">
  import type { EventSelect } from 'vue-day-calendar'

  import VueDayCalendar from 'vue-day-calendar'

  function handleSelect(value: EventSelect) {
    console.log('select value', value)
  }
</script>

<template>
  <VueDayCalendar @select="handleSelect"/>
</template>
