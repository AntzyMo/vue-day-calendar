<script setup lang="ts">
  import { ref } from 'vue'

  import VueDayCalendar from 'vue-day-calendar'

  const selected = ref([])
</script>

<template>
  <VueDayCalendar v-model="selected" mode="range">
    <template #footer>
      <div class="text-sm">
        <div v-if="selected.length">
          <p>{{ $t('index.vueDayCalendarFooterText') }}:</p>
          <div class="flex gap-2 items-center">
            <div>[</div>
            <span v-for="item in selected" :key="item" class="btn">
              {{ item }}
            </span>
            <div>]</div>
          </div>
        </div>
        <div v-else>
          {{ $t('index.pickNotText') }}
        </div>
      </div>
    </template>
  </VueDayCalendar>
</template>
