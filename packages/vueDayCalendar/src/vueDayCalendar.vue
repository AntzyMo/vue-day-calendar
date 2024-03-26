<script setup lang="ts">
  import { computed } from 'vue'

  import type { MonthsTrigger } from './useDayCalendar'
  import type { DayType, OnSelectValue, VueDayCalendarProps } from './types'

  import IconButton from './IconButton.vue'
  import useDayCalendar from './useDayCalendar'
  import { isSameDate, isToday } from './helper'

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

  // classes computed
  const weekClass = computed(() => props.classes?.week)
  const bodyClass = computed(() => props.classes?.body)
  const body_rowClass = computed(() => props.classes?.body_row)
  const body_colClass = computed(() => props.classes?.body_col)
  const dayClass = computed(() => props.classes?.day)
  const day_selectedClass = computed(() => props.classes?.day_selected)
  const day_outsideClass = computed(() => props.classes?.day_outside || 'opacity-50')
  const todayClass = computed(() => props.classes?.today || 'font-bold')

  const {
    year,
    weekday,
    monthsTrigger,
    dates
  } = useDayCalendar({
    format: props.format,
    defaultDate: new Date()
  })

  defineSlots<{
    head: (props: { date: string;tigger: MonthsTrigger }) => any
    week: (props: { weekday: string[] }) => any
    body: (props: { dates: DayType[][] }) => any
    footer: () => any
  }>()

  defineExpose({
    monthsTrigger
  })

  function onSelect(item: DayType) {
    const { date, type } = item
    emit('select', {
      date,
      type
    })
    modelSelect.value = item.date
  }
</script>

<template>
  <div class="cursor-default select-none w-full">
    <slot name="head" :date="year" :tigger="monthsTrigger">
      <div class="flex items-center justify-between mb-2">
        <div class="font-medium text-[10px]">
          {{ year }}
        </div>
        <div class="flex gap-[2px] items-center">
          <IconButton @click="monthsTrigger('prev')">
            <div class="i-mingcute-left-fill  text-sm"/>
          </IconButton>

          <IconButton @click="monthsTrigger('next')">
            <div class="i-mingcute-right-fill  text-sm"/>
          </IconButton>
        </div>
      </div>
    </slot>

    <table class="w-full">
      <slot name="week" :weekday>
        <thead>
          <tr class="flex gap-1 mb-2" :class="weekClass">
            <th
              v-for="item in weekday"
              :key="item"
              class="flex-1 font-normal text-[10px] text-center"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
      </slot>
      <slot name="body" :dates>
        <tbody :class="bodyClass">
          <tr
            v-for="(item, index) in dates"
            :key="index"
            class="flex"
            :class="body_rowClass"
          >
            <td
              v-for="it in item"
              :key="it.value"
              class="cursor-pointer flex flex-1 items-center justify-center"
              :class="body_colClass"
            >
              <div
                :aria-selected="isSameDate(modelSelect, it.date) || undefined"
                class="text-base"
                :class="[
                  dayClass,
                  it.type !== 'current' ? day_outsideClass : '',
                  isToday(it.date) ? todayClass : '',
                  isSameDate(modelSelect, it.date) ? day_selectedClass : '',
                ]"
                @click="onSelect(it)"
              >
                {{ it.value }}
              </div>
            </td>
          </tr>
        </tbody>
      </slot>
      <tfoot>
        <slot name="footer"/>
      </tfoot>
    </table>
  </div>
</template>
