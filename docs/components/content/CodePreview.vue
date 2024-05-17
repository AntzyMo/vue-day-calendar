<script setup lang="ts">
  const props = defineProps<{
    componentName: string
  }>()
  const demoComponent = resolveComponent(props.componentName)

  const MAX_CODE_BLOCK_HEIGHT = 520

  const codeBlockRef = ref<HTMLDivElement | null>()

  const isCollapsedMask = ref(false)
  const isCollapsed = ref(true)

  onMounted(async () => {
    await nextTick()
    const codeBlock = toValue(codeBlockRef)
    if (codeBlock!.clientHeight > MAX_CODE_BLOCK_HEIGHT) {
      isCollapsedMask.value = true
    }
  })
</script>

<template>
  <div class="pr-2" flex="~  justify-between">
    <div
      ref="codeBlockRef"
      class="mb-4  relative  rounded-md"
      :style="[isCollapsedMask && isCollapsed ? { height: `${MAX_CODE_BLOCK_HEIGHT}px`, overflow: 'hidden' } : { height: 'auto', overflow: 'auto' }]"
    >
      <ContentSlot/>
      <div
        v-if="isCollapsedMask"
        class="absolute bottom-0 h-130px left-0 right-0 z-1"
        :class="{ 'bg-gradient-to-t from-gray-100 to-transparent': isCollapsed }"
        flex="~ items-end justify-center"
      >
        <button
          class="bg-gray-200 hover-bg-gray-300 px-2 py-1.5 rounded-md text-sm transition"
          :class="[isCollapsed ? 'mb-3' : 'mb-6']"
          @click="isCollapsed = !isCollapsed"
        >
          {{ isCollapsed ? 'Show more' : 'Show less' }}
        </button>
      </div>
    </div>
    <component :is="demoComponent"/>
  </div>
</template>
