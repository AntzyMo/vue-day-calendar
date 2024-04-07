<script setup lang="ts">
  interface CodeBlockProps {
    title: string
    code: string
  }
  const props = defineProps<CodeBlockProps>()
</script>

<template>
  <div>
    <p class="mb-3 text-xl">
      {{ props.title }}
    </p>
    <code class="bg-gray-100 p-2 rounded-md">
      <slot name="code">
        {{ props.code }}
      </slot>
    </code>
  </div>
</template>
