<script setup lang="ts">
  const props = defineProps<{
    componentName: string
  }>()
  const demoComponent = resolveComponent(props.componentName)
</script>

<template>
  <div class="pr-2" flex="~ items-center justify-between ">
    <div>
      <ContentSlot/>
    </div>
    <component :is="demoComponent"/>
  </div>
</template>
