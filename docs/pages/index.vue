<script setup lang="ts">
  import dayjs from 'dayjs'

  import 'vue-day-calendar/style.css'
  import VueDayCalendar from 'vue-day-calendar'

  const yearAndMonthDate = dayjs().format('YYYY-MM')
  const selected = ref(`${yearAndMonthDate}-24`)

  const vueDayCalendarRef = ref<InstanceType<typeof VueDayCalendar>>()

  function goToToday() {
    vueDayCalendarRef.value?.goToToday()
  }
</script>

<template>
  <main>
    <section class="mt-20 pr-20 px-10" flex="~ justify-between items-center">
      <div class="font-bold leading-12 text-4xl">
        <p class="w-400px">
          The Vue <span class="text-red">day picker </span>
        </p>
        <p>
          component that presents dates
        </p>
        <p>
          in a calendar format.
        </p>
      </div>
      <VueDayCalendar ref="vueDayCalendarRef" v-model="selected">
        <template #footer>
          <div class="w-230px">
            <!-- todo: 需要改为format一样的格式 -->
            <p class="my-2">
              You picked {{ selected }}
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
  @apply font-rubik;

  h1 {
    @apply text-xl mb-2;
  }
}
</style>
