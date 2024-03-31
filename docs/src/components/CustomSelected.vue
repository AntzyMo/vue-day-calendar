<script setup lang="ts">
  import { computed, ref } from 'vue'

  import { VueDayCalendar } from 'vue-day-calendar'

  const selected = ref()
  const vueDayCalendarRef = ref<InstanceType< typeof VueDayCalendar>>()
  const selectedText = computed(() => {
    return selected.value ? `已选择：${selected.value}` : '请选择一天'
  })
  function goToToday() {
    vueDayCalendarRef.value?.goToToday()
  }
</script>

<template>
  <VueDayCalendar ref="vueDayCalendarRef" v-model:selected="selected">
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
