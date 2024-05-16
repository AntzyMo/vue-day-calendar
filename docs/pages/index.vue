<script setup lang="ts">
  import dayjs from 'dayjs'
  import { ref } from 'vue'

  import 'vue-day-calendar/style.css'
  import VueDayCalendar from 'vue-day-calendar'

  const yearAndMonthDate = dayjs().format('YYYY-MM')
  const selected = ref(`${yearAndMonthDate}-24`)
  const month = ref('')
  function goToToday() {
    selected.value = `${dayjs().format('YYYY-MM')}-24`
    month.value = dayjs().format('YYYY-MM')
  }
</script>

<template>
  <main>
    <section class="mt-20 pr-20 px-10" flex="~ justify-between items-center">
      <div>
        <div class="font-bold leading-12 mb-5 text-4xl">
          <p class="w-400px">
            {{ $t('index.title') }} <span class="text-red">{{ $t('index.title1') }}</span>
          </p>
          <p>
            {{ $t('index.title2') }}
          </p>
          <p>
            {{ $t('index.title3') }}
          </p>
        </div>
        <NuxtLink to="/guide/getting-started" class="bg-red hover:bg-red-500/90 px-4 py-2 rounded-md text-white">
          {{ $t('index.button') }}
        </NuxtLink>
      </div>
      <VueDayCalendar v-model="selected" v-model:month="month">
        <template #footer>
          <div>
            <p class="my-2">
              {{ $t('index.vueDayCalendarFooterText') }} {{ selected }}
            </p>
            <button class="bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md" @click="goToToday">
              Go to Today
            </button>
          </div>
        </template>
      </VueDayCalendar>
    </section>
    <section class="md-class">
      <ContentDoc/>
    </section>
  </main>
</template>

<style lang="postcss">
::selection{
  @apply bg-red! text-white!;
}

.md-class {
  @apply font-rubikAndNotoSansCC;

  h1 {
    @apply text-xl mb-2;
  }
}
</style>
