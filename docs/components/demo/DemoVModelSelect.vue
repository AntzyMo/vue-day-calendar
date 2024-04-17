<script setup lang="ts">
  import { computed, ref } from 'vue'

  import VueDayCalendar from 'vue-day-calendar'

  const selected = ref('2024-4-13')
  const selectedText = computed(() => {
    return selected.value
      ? `已选择：${selected.value}`
      : '请选择一天'
  })
</script>

<template>
  <VueDayCalendar v-model="selected">
    <template #footer>
      <span class="text-sm">{{ selectedText }}</span>
    </template>
  </VueDayCalendar>
</template>
