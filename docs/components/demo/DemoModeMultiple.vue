<script setup lang="ts">
  import { ref } from 'vue'

  import VueDayCalendar from 'vue-day-calendar'

  const selected = ref([])
</script>

<template>
  <VueDayCalendar v-model="selected" mode="multiple">
    <template #footer>
      <div class="text-sm">
        <div v-if="selected.length">
          <div class="mb-2">
            {{ $t('index.vueDayCalendarFooterText') }}:
          </div>
          <div class="gap-2 grid grid-cols-2">
            <span v-for="item in selected" :key="item" class="btn">
              {{ item }}
            </span>
          </div>
        </div>
        <div v-else>
          {{ $t('index.pickNotText') }}
        </div>
      </div>
    </template>
  </VueDayCalendar>
</template>
