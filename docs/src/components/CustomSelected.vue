<script setup lang="ts">
  import { computed, ref } from 'vue'

  import { type OnSelectValue, VueDayCalendar } from 'vue-day-calendar'

  const selected = ref()
  const selectedText = computed(() => {
    return selected.value ? `已选择：${selected.value}` : '请选择一天'
  })
  function handleSelect(value: OnSelectValue) {
    console.log('vlaue', value)
  }
</script>

<template>
  <VueDayCalendar v-model:selected="selected" @select="handleSelect">
    <template #cell="{ item }">
      <div class="relative">
        <span>{{ item.value }}</span>
        <div v-if="item.value === '31'" class="absolute bg-sky-300 bottom-0 h-1 left-50% rounded w-1"/>
      </div>
    </template>

    <template #footer>
      <span class="text-sm">{{ selectedText }}</span>
    </template>
  </VueDayCalendar>
</template>

<style lang="scss" scoped>

</style>
