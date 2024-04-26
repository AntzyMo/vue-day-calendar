<script setup lang="ts">
  import { computed, ref } from 'vue'

  import VueDayCalendar, { type EventSelect } from 'vue-day-calendar'

  const selected = ref(['2024-04-03'])
  const selectedText = computed(() => {
    return selected.value ? `已选择：${selected.value}` : '请选择一天'
  })
  function handleSelect({ value }: EventSelect) {
    console.log('value', value)
  }
</script>

<template>
  <VueDayCalendar v-model="selected" mode="multiple" @select="handleSelect">
    <template #footer>
      <span class="text-sm">{{ selectedText }}</span>
    </template>
  </VueDayCalendar>
</template>
