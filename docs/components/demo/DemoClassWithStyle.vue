<script setup lang="ts">
  import VueDayCalendar from 'vue-day-calendar'
</script>

<template>
  <VueDayCalendar/>
</template>

<style lang="scss" scoped>
:deep(.today) {
  background-color: red;
  color: #fff
}
</style>
