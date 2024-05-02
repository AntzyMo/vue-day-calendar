<script setup lang="ts">
  const slotIdx = ref(0)
</script>

<template>
  <div>
    <div class="flex gap-2 items-center mb-4">
      <div
        v-for="(item, index) in Object.keys($slots)"
        :key="index"
        class="btn cursor-pointer hover:bg-gray-300/70"
        :class="{
          'bg-gray-200': slotIdx === index,
        }"
        @click="slotIdx = index"
      >
        {{ item }}
      </div>
    </div>
    <slot :name="Object.keys($slots)[slotIdx]"/>
  </div>
</template>
