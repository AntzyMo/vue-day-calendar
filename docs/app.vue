<script setup lang="ts">
  useHead({
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/logo.svg'
      }
    ]
  })

  useSeoMeta({
    title: 'VueDayCalendar · Vue Calendar Component',
    ogTitle: 'VueDayCalendar · Vue Calendar Component',
    description: 'VueDayCalendar is a Vue date picker component that presents dates in a calendar format. It features a clean appearance and supports customizable styling with tailwindcss and unocss.',
    ogDescription: 'VueDayCalendar is a Vue date picker component that presents dates in a calendar format. It features a clean appearance and supports customizable styling with tailwindcss and unocss.',
    ogImage: '/logo.svg'

  })
</script>

<template>
  <div class="font-rubik max-w-7xl mx-auto px-4 py-4">
    <NuxtPage/>
  </div>
</template>
