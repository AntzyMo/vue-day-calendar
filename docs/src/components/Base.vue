<script setup lang="ts">
  import { computed, ref } from 'vue'

  import 'vue-day-calendar/style.css'
  import { VueDayCalendar } from 'vue-day-calendar'

  const selected = ref()
  const selectedText = computed(() => {
    return selected.value ? `已选择：${selected.value}` : '请选择一天'
  })
</script>

<template>
  <VueDayCalendar v-model:selected="selected">
    <template #footer>
      <span class="text-sm">{{ selectedText }}</span>
    </template>
  </VueDayCalendar>
</template>

<style lang="scss" scoped>

</style>
