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
    ogImage: '/screenshot.png'

  })
</script>

<template>
  <NuxtLoadingIndicator :throttle="100"/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style>
html{
  scrollbar-gutter: stable
}
</style>
