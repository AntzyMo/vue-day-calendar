<script setup lang="ts">
  const locales = [
    {
      title: 'English',
      value: 'en'
    },
    {
      title: '简体中文',
      value: 'zh'
    }
  ]
  const { locale, setLocale } = useI18n()
  const isDropdownOpen = ref(false)

  function changeLocale(lang) {
    setLocale(lang)
    isDropdownOpen.value = false
  }
</script>

<template>
  <div class="font-rubikAndNotoSansCC h-100vh max-w-7xl mx-auto pt-4 px-4" flex="~ col">
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

      <div class="gap-1" flex="~ items-center">
        <Dropdown v-model="isDropdownOpen">
          <button
            class="hover:bg-gray-100 px-2 py-1.5 rounded-md transition"
            flex="~ items-center"
            @click="isDropdownOpen = !isDropdownOpen"
          >
            <span class="i-carbon:language text-2xl"/>
          </button>
          <template #overlay>
            <div
              class="gap-2  py-2  text-sm  w-100px"
              flex="~  col justify-center"
            >
              <button
                v-for="lang in locales"
                :key="lang.value"
                class="hover:bg-gray-200/70 mx-1 py-1.5 rounded-md transition"
                :class="{
                  'bg-gray-100': locale.includes(lang.value),
                }"
                @click="changeLocale(lang.value)"
              >
                {{ lang.title }}
              </button>
            </div>
          </template>
        </Dropdown>
        <NuxtLink
          to="https://github.com/AntzyMo/vue-day-calendar"
          target="_blank"
          class="cursor-pointer gap-2 hover:bg-gray-100 px-2 py-1.5 rounded-md transition"
          flex="~ items-center"
        >
          <span class="i-carbon:logo-github text-2xl"/>
          <span class="text-md">Open Source</span>
        </NuxtLink>
      </div>
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
