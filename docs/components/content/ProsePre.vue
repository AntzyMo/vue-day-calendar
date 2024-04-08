<script setup lang="ts">
  defineProps({
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: null
    },
    filename: {
      type: String,
      default: null
    },
    highlights: {
      type: Array as () => number[],
      default: () => []
    },
    meta: {
      type: String,
      default: null
    },
    class: {
      type: String,
      default: null
    }
  })
</script>

<template>
  <pre class="bg-gray-100 inline-block p-1.5 rounded-md" :class="$props.class"><slot/></pre>
</template>
