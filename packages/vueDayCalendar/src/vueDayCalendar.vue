<script setup lang="ts">
  import dayjs from 'dayjs'
  import { computed, shallowRef } from 'vue'

  const dayjsRef = shallowRef(dayjs())

  const year = computed(() => dayjsRef.value.format('YYYY 年 M 月'))

  const weekday = []
  for (let i = 1; i <= 7; i++) {
    weekday.push(dayjsRef.value.day(i).format('dd'))
  }

  const dates = computed(() => {
    const totalDay = dayjsRef.value.daysInMonth()
    const startDay = dayjsRef.value.startOf('month').day()

    const datesArr = []
    for (let i = startDay - 1; i >= 1; i--) {
      const dateRaw = dayjsRef.value.startOf('month').subtract(i, 'day')
      datesArr.push({
        date: dateRaw.format('YYYY-MM-DD'),
        value: dateRaw.format('D'),
        type: 'prev'
      })
    }

    for (let day = 1; day <= totalDay; day++) {
      datesArr.push({
        date: dayjsRef.value.date(day).format('YYYY-MM-DD'),
        value: day,
        type: 'current'
      })
    }

    const nextOutsideDayNumber = 42 - datesArr.length

    for (let i = 1; i <= nextOutsideDayNumber; i++) {
      const dateRaw = dayjsRef.value.endOf('month').add(i, 'day')

      datesArr.push({
        date: dateRaw.format('YYYY-MM-DD'),
        value: dateRaw.format('D'),
        type: 'next'
      })
    }

    const arr = []
    while (datesArr.length) {
      arr.push(datesArr.splice(0, 7))
    }

    return arr
  })

  function prevMonth() {
    dayjsRef.value = dayjsRef.value.subtract(1, 'month')
  }

  function nextMonth() {
    dayjsRef.value = dayjsRef.value.add(1, 'month')
  }

  function isSameDate(date) {
    return dayjs().isSame(date, 'day')
  }
</script>

<template>
  <div class="border-b border-gray-200 cursor-default mb-4 pb-3 w-full">
    <div class="flex items-center justify-between mb-2 px-1.5">
      <div class="font-medium text-[10px]">
        {{ year }}
      </div>
      <div class="flex items-center">
        <IconButton class="h-5 w-5" name="i-mingcute-left-fill" @click="prevMonth"/>
        <IconButton class="h-5 w-5" name="i-mingcute-right-fill" @click="nextMonth"/>
      </div>
    </div>

    <div class="flex gap-1 mb-2">
      <div v-for="item in weekday" :key="item" class="flex-1 font-normal rounded-[5px] text-[9px] text-center">
        {{ item }}
      </div>
    </div>

    <div class="gap-[2px]  grid">
      <div
        v-for="(item, index) in dates"
        :key="index"
        class="flex gap-[2px]"
      >
        <div
          v-for="it in item"
          :key="it.value"
          class="cursor-pointer flex-1 h-7 hover:bg-buttonHoverBackground leading-7 rounded-[5px] text-[10px] text-center w-7"
        >
          <div
            class="h-full rounded-[5px] text-center w-full"
            :class="{
              'opacity-50': it.type !== 'current',
              '!text-white !bg-sky-400': isSameDate(it.date),
            }"
          >
            {{ it.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
