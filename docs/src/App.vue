<script setup lang="ts">
  import { ref } from 'vue'
  import type { VueDayCalendarProps } from '../../packages/vueDayCalendar/dist/types'

  import 'vue-day-calendar/style.css'
  import { vueDayCalendar } from 'vue-day-calendar'

  const date = ref(new Date())
  function onChange(value) {
    console.log('value', value)
  }
  const selected = ref('2024-3-26')
  function onSelected(val) {
    console.log('val onSelected', val)
  }

  const classes: VueDayCalendarProps['classes'] = {
    day_selected: 'daySelect',
    week: 'bg-red'
  }
  // 1. 样式
  // 2. 怎么去获取选中的状态 并添加选中后的样式
  // 3. 可以自定义日期 是否需要v-model
  // 4. 可以隐藏灰色的日期
  // 5. 限制最大最小日期
  </script>

<template>
  <div class="flex justify-center mt-10">
    <div class="w-200px">
      <vueDayCalendar
        v-model:selected="selected"
        class="vue-day-calendar"
        :classes="classes"
        @selected="onSelected"
        @select="onChange"
      />
    </div>
    <div> modelSelected: {{ selected }}</div>
  </div>
</template>

<style lang="scss" scoped>
.vue-day-calendar{
  :deep(.daySelect){
    color:red;
    background: yellow;
  }
}
</style>
