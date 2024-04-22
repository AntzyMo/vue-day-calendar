<script setup lang="ts">
  import dayjs from 'dayjs'
  import { computed, ref } from 'vue'

  import VueDayCalendar from 'vue-day-calendar'

  const selected = ref()
  const selectedText = computed(() => {
    return selected.value ? `已选择：${selected.value}` : '请选择一天'
  })
  function goToToday() {
    selected.value = dayjs().format('YYYY-MM-DD')
  }
</script>

<template>
  <VueDayCalendar v-model="selected">
    <template #cell="{ item }">
      <div class="relative">
        <span>{{ item.value }}</span>
        <div v-if="item.value === '31'" class="absolute bg-sky-300 bottom-0 h-1 left-50% rounded w-1"/>
      </div>
    </template>

    <template #footer>
      <span class="mr-2 text-sm">{{ selectedText }}</span>
      <button @click="goToToday">
        go to today
      </button>
    </template>
  </VueDayCalendar>
</template>

<style lang="scss" scoped>

</style>
