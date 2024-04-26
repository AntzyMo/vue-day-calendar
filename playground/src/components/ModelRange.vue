<script setup lang="ts">
  import { computed, ref } from 'vue'

  import VueDayCalendar, { type EventSelect } from 'vue-day-calendar'

  const selected = ref()
  const selectedText = computed(() => {
    return selected.value ? `已选择：${selected.value}` : '请选择日期范围'
  })
  function handleSelect({ value }: EventSelect) {
    console.log('value', value)
  }
</script>

<template>
  <VueDayCalendar v-model="selected" mode="range" @select="handleSelect">
    <template #footer>
      <span class="text-sm">{{ selectedText }}</span>
    </template>
  </VueDayCalendar>
</template>
