<script setup lang="ts">
  import dayjs from 'dayjs'
  import { ref } from 'vue'

  import VueDayCalendar from 'vue-day-calendar'

  const month = ref('')
  function goToToday() {
    month.value = dayjs().format('YYYY-MM')
  }
</script>

<template>
  <VueDayCalendar v-model:month="month">
    <template #footer>
      <button class="btn cursor-pointer mt-2" @click="goToToday">
        Go to Today
      </button>
    </template>
  </VueDayCalendar>
</template>
