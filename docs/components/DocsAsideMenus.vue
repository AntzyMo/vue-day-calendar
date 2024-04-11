<script setup lang="ts">
  import type { NavItem } from '@nuxt/content/types'

  defineProps<{
    menus?: NavItem[]
  }>()

  const isExpand = ref(true)
</script>

<template>
  <div
    v-for="item in menus"
    :key="item._path"
  >
    <button class="mb-3  w-full" flex="~ justify-between items-center" @click="isExpand = !isExpand">
      <span class="text-base">{{ item.title }}</span>
      <span
        :class="{ '-rotate-90': !isExpand }"
        class="i-carbon:chevron-down text-base transition"
        flex="~ justify-between items-center"
      />
    </button>
    <Transition>
      <div
        v-show="isExpand"
        class="gap-1.5 ml-3"
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
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: height 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  height: 0;
}
</style>
