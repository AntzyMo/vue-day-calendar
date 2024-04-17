<script setup lang="ts">
  import zhcn from 'dayjs/locale/zh-cn'

  import VueDayCalendar from 'vue-day-calendar'
</script>

<template>
  <VueDayCalendar :locale="zhcn" year-and-month-format="YYYY 年 M 月"/>
</template>
