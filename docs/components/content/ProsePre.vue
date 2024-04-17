<script setup lang="ts">
  interface ProsePreProps {
    code: string
    language?: string
    filename?: string
    highlights?: number[]
    meta?: string
  }
  const props = defineProps<ProsePreProps>()
  const { copy, copied } = useClipboard({ source: props.code })

  const copyIcon = computed(() => (copied.value ? 'i-carbon:checkmark' : 'i-carbon:copy'))
</script>

<template>
  <div class="group preClass relative w-600px">
    <button
      class="absolute bg-white cursor-pointer group-hover:block hidden p-1.5 right-1 top-1"
      border="~ rounded-md  gray-200"
      @click="copy(code)"
    >
      <div
        class="text-dark-800 text-sm"
        :class="copyIcon"
      />
    </button>

    <pre class="bg-gray-100  mb-4  p-2  pl-3  rounded-md"><slot/></pre>
  </div>
</template>

<style lang="postcss">
pre code {
  @apply text-md;
}
</style>
