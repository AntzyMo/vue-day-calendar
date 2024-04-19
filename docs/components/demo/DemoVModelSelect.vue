<script setup lang="ts">
  import { computed, ref } from 'vue'

  import VueDayCalendar from 'vue-day-calendar'

  const { t } = useI18n()

  const selected = ref('2024-4-13')
  const selectedText = computed(() => {
    return selected.value
      ? `${t('index.vueDayCalendarFooterText')}：${selected.value}`
      : `${t('index.pickNotText')}`
  })
</script>

<template>
  <VueDayCalendar v-model="selected">
    <template #footer>
      <span class="text-sm">{{ selectedText }}</span>
    </template>
  </VueDayCalendar>
</template>
