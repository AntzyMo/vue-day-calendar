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
  <div class="font-rubik h-100vh max-w-7xl mx-auto pt-4 px-4" flex="~ col">
    <div class="flex-1">
      <NuxtPage/>
    </div>
    <footer
      class="py-6 text-gray-500 text-xs"
      border-t="~ gray-200"
    >
      <div>
        <span>Made by</span>
        <NuxtLink to="https://github.com/AntzyMo" target="_blank" class="hover:text-gray-700">
          AntzyMo
        </NuxtLink>
        <span>&copy; 2024-PRESENT</span>
      </div>
    </footer>
  </div>
</template>
