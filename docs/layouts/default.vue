<template>
  <div class="font-rubik h-100vh max-w-7xl mx-auto pt-4 px-4" flex="~ col">
    <header class="font-500" flex="~ items-center justify-between">
      <NuxtLink to="/" flex="~ items-center">
        <NuxtImg
          src="/logo.svg"
          fit="contain"
          width="50"
          height="50"
          preload
          class="mr-4"
        />
        <span class="text-xl">VueDayCalendar</span>
      </NuxtLink>
      <NuxtLink
        to="https://github.com/AntzyMo/vue-day-calendar"
        target="_blank"
        class="cursor-pointer gap-2 hover:bg-gray-100 px-2 py-1.5 rounded-md transition"
        flex="~ items-center"
      >
        <div class="i-carbon:logo-github text-2xl"/>
        <span class="text-md">Open Source</span>
      </NuxtLink>
    </header>
    <div class="flex-1">
      <slot/>
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
