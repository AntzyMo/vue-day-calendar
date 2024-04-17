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
      <div>
        <div class="font-bold leading-12 mb-5 text-4xl">
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
        <NuxtLink to="/guide/getting-started" class="bg-red hover:bg-red-500/90 px-4 py-2 rounded-md text-white">
          Get Started
        </NuxtLink>
      </div>
      <VueDayCalendar ref="vueDayCalendarRef" v-model="selected">
        <template #footer>
          <div class="w-230px">
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
