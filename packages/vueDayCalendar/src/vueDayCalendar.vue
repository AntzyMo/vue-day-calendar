<script setup lang="ts">
  import { watchEffect } from 'vue'
  import type { DayType, OnSelectValue, VueDayCalendarProps } from './types'

  import { isSameDate } from './helper'
  import IconButton from './IconButton.vue'
  import useDayCalendar from './useDayCalendar'

  const props = withDefaults(defineProps<VueDayCalendarProps>(), {
    locale: 'en',
    size: 'small',
    format: 'YYYY 年 M 月'
  })

  const emit = defineEmits<{
    select: [value: OnSelectValue]
  }>()

  console.log('props', props)
  const modelSelect = defineModel<string | Date>('selected')

  watchEffect(() => {
    console.log(props.size, 'size watch')
  })

  const {
    year,
    weekday,
    prevMonthTrigger,
    nextMonthTrigger,
    dates
  } = useDayCalendar({
    format: props.format,
    defaultDate: new Date()
  })

  defineSlots<{
    head: (props: { date: string }) => any
    week: (props: { weekday: string[] }) => any
    body: (props: { dates: DayType[][] }) => any
  }>()

  defineExpose({
    prevMonthTrigger,
    nextMonthTrigger
  })

  function onSelect(item: DayType) {
    const { date, type } = item
    emit('select', {
      date,
      type
    })
    modelSelect.value = item.date
    item.selected = true
  }
</script>

<template>
  <div class="cursor-default select-none w-full">
    <slot name="head" :date="year">
      <div class="flex items-center justify-between mb-2">
        <div class="font-medium text-[10px]">
          {{ year }}
        </div>
        <div class="flex gap-[2px] items-center">
          <IconButton @click="prevMonthTrigger">
            <div class="i-mingcute-left-fill  text-sm"/>
          </IconButton>

          <IconButton @click="nextMonthTrigger">
            <div class="i-mingcute-right-fill  text-sm"/>
          </IconButton>
        </div>
      </div>
    </slot>

    <slot name="week" :weekday>
      <div class="flex gap-1 mb-2" :class="props.classes?.week">
        <div
          v-for="item in weekday"
          :key="item"
          class="flex-1 font-normal rounded-[5px] text-[9px] text-center"
        >
          {{ item }}
        </div>
      </div>
    </slot>

    <slot name="body" :dates>
      <div class="gap-[2px] grid">
        <div
          v-for="(item, index) in dates"
          :key="index"
          class="flex"
        >
          <div
            v-for="it in item"
            :key="it.value"
            class="cursor-pointer flex flex-1 items-center justify-center"
          >
            <div
              :selected="isSameDate(modelSelect, it.date)"
              class="h-6 hover:bg-gray-400 leading-6 rounded-[5px] rounded-[5px] text-[10px] text-center text-center w-6"
              :class="[
                {
                  'opacity-50': it.type !== 'current',
                  '!text-white !bg-sky-400': isSameDate(it.date),
                },
                isSameDate(modelSelect, it.date) ? props.classes?.day_selected : '',
              ]"
              @click="onSelect(it)"
            >
              {{ it.value }}
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
