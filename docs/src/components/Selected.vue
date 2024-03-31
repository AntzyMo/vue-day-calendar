<script setup lang="ts">
  import { computed, ref } from 'vue'

  import { type DayType, VueDayCalendar } from 'vue-day-calendar'

  const selected = ref('2024-4-13')
  const selectedText = computed(() => {
    return selected.value ? `已选择：${selected.value}` : '请选择一天'
  })
  function handleSelect(item: DayType) {
    console.log('item', item)
  }
</script>

<template>
  <VueDayCalendar>
    <template #cell="{ item }">
      <div @click="handleSelect(item)">
        {{ item.value }}
      </div>
    </template>
    <template #footer>
      <span class="text-sm">{{ selectedText }}</span>
    </template>
  </VueDayCalendar>
</template>

<style lang="scss" scoped>

</style>
