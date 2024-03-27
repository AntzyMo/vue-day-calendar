<script setup lang="ts">
  import 'vue-day-calendar/style.css'
  import { VueDayCalendar } from 'vue-day-calendar'

  import Classes from './components/Classes/index.vue'

  // 2. 怎么去获取选中的状态 并添加选中后的样式
  // 3. 可以自定义日期 是否需要v-model
  // 4. 可以隐藏灰色的日期
  // 5. 限制最大最小日期
  </script>

<template>
  <div class="flex flex-col justify-center mt-10">
    <div class="w-[220px]">
      <h2>classes</h2>
      <Classes/>
    </div>

    <div class="w-[250px]">
      <h2>base</h2>
      <VueDayCalendar/>
    </div>
  </div>
</template>
