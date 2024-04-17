<script setup lang="ts">
  import { ref } from 'vue'

  import VueDayCalendar from 'vue-day-calendar'

  const weeknumber = ref(6)
</script>

<template>
  <VueDayCalendar :fixed-weeks="weeknumber" show-outside-days/>
  <button @click="weeknumber = 6">
    6 week
  </button>

  <button @click="weeknumber = 8">
    8 week
  </button>
</template>
