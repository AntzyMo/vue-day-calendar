<script setup lang="ts">
  import type { NavItem } from '@nuxt/content/types'

  defineProps<{
    menus?: NavItem[]
  }>()
</script>

<template>
  <div
    v-for="item in menus"
    :key="item._path"
  >
    <button class="mb-3  text-left  w-full">
      {{ item.title }}
    </button>
    <div
      class="gap-2 ml-3"
      flex="~ col"
      border-l="~ gray-200"
    >
      <NuxtLink
        v-for="it in item.children"
        :key="it._path"
        :to="it._path"
        class="-ml-px  pl-4  text-sm"
        border-l="~ transparent hover:gray-400"
        :class="{
          'text-red border-red!': $route.path === it._path,
        }"
      >
        {{ it.title }}
      </NuxtLink>
    </div>
  </div>
</template>
