<script setup lang="ts">
  import dayjs from 'dayjs'
  import { computed, shallowRef, toValue } from 'vue'
  import type { DayType, MonthsTrigger, OnSelectValue, VueDayCalendarProps } from './types'

  import IconLeftArrow from '~icons/mingcute/left-fill'
  import IconRightArrow from '~icons/mingcute/right-fill'

  import { createDay, isSameDate, isToday } from './helper'

  const props = withDefaults(defineProps<VueDayCalendarProps>(), {
    locale: 'en',
    format: 'YYYY 年 M 月',
    showOutsideDays: false,
    disableNavigation: false
  })

  const emit = defineEmits<{
    select: [value: OnSelectValue]
  }>()

  defineSlots<{
    head: (props: { date: string; tigger: MonthsTrigger }) => any
    week: (props: { weekday: string[] }) => any
    cell: (props: { item: DayType }) => any
    footer: () => any
  }>()

  defineExpose({
    monthsTrigger
  })

  console.log('props', props)

  // classes computed
  const rootClass = computed(() => props.classes?.root)
  const headClass = computed(() => props.classes?.head)
  const head_dateClass = computed(() => props.classes?.head_date)
  const head_actionClass = computed(() => props.classes?.head_action)
  const weekClass = computed(() => props.classes?.week)
  const week_dayClass = computed(() => props.classes?.week_day)
  const bodyClass = computed(() => props.classes?.body)
  const body_rowClass = computed(() => props.classes?.body_row)
  const body_colClass = computed(() => props.classes?.body_col)
  const dayClass = computed(() => props.classes?.day)
  const day_selectedClass = computed(() => props.classes?.day_selected || 'selectedDay')
  const day_outsideClass = computed(() => props.classes?.day_outside || 'day_outside')
  const todayClass = computed(() => props.classes?.today || 'today')

  // selected day
  const modelSelect = defineModel<string | Date>('selected')

  const dayjsRef = shallowRef(dayjs())
  const year = computed(() => dayjsRef.value.format(props.format))

  const weekday: string[] = []
  for (let i = 1; i <= 7; i++) {
    weekday.push(dayjsRef.value.day(i).format('dd'))
  }

  const days = computed<DayType[][]>(() => {
    const totalDay = dayjsRef.value.daysInMonth()
    const startDay = dayjsRef.value.startOf('month').day()

    const daysArr: DayType[] = []

    for (let i = startDay - 1; i >= 1; i--) {
      const dateRaw = dayjsRef.value.startOf('month').subtract(i, 'day')
      daysArr.push(createDay(dateRaw, 'prev'))
    }

    for (let day = 1; day <= totalDay; day++) {
      const dateRaw = dayjsRef.value.date(day)
      daysArr.push(createDay(dateRaw, 'current'))
    }

    const nextOutsideDayNumber = 42 - daysArr.length

    for (let i = 1; i <= nextOutsideDayNumber; i++) {
      const dateRaw = dayjsRef.value.endOf('month').add(i, 'day')
      daysArr.push(createDay(dateRaw, 'next'))
    }

    let sevenMapArr: DayType[][] = []
    while (daysArr.length) {
      sevenMapArr.push(daysArr.splice(0, 7))
    }

    if (!props.showOutsideDays) {
      const handledCurrentArr = sevenMapArr.map(days => {
        return days.map(day => {
          if (day.type === 'current') {
            return day
          }
          return {
            ...day,
            value: ''
          }
        })
      })
      console.log('handledCurrentArr', handledCurrentArr)

      sevenMapArr = handledCurrentArr.filter(days => days.some(day => day.type === 'current'))
    }

    console.log('sevenMapArr', sevenMapArr)
    return sevenMapArr
  })

  function isExceedDate(maxAndMinDate?: Date) {
    return maxAndMinDate ? dayjsRef.value.isAfter(maxAndMinDate) : false
  }

  function monthsTrigger(type: 'prev' | 'next') {
    if (isExceedDate(props?.maxDate)) return
    if (isExceedDate(props?.minDate)) return

    const dayjs = toValue(dayjsRef)

    dayjsRef.value = type === 'prev' ? dayjs.subtract(1, 'month') : dayjs.add(1, 'month')
  }

  function onSelect(item: DayType) {
    const { date, type, value } = item
    if (!value) return
    emit('select', {
      date,
      type
    })
    modelSelect.value = item.date
  }
</script>

<template>
  <div class="v-day-calendar" :class="rootClass">
    <slot name="head" :date="year" :tigger="monthsTrigger">
      <div class="head" :class="headClass">
        <div class="head_date" :class="head_dateClass">
          {{ year }}
        </div>
        <div v-if="!disableNavigation" class="action_block">
          <IconLeftArrow
            class="action_button"
            :class="[
              { exceedDate: isExceedDate(props?.minDate) },
              head_actionClass,
            ]"
            @click="monthsTrigger('prev')"
          />
          <IconRightArrow
            class="action_button"
            :class="[
              { exceedDate: isExceedDate(props?.maxDate) },
              head_actionClass,
            ]"
            @click="monthsTrigger('next')"
          />
        </div>
      </div>
    </slot>

    <table class="table_layout">
      <slot name="week" :weekday>
        <thead>
          <tr class="week" :class="weekClass">
            <th
              v-for="item in weekday"
              :key="item"
              class="week_day"
              :class="week_dayClass"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
      </slot>
      <tbody class="calendar_body" :class="bodyClass">
        <tr
          v-for="(item, index) in days"
          :key="index"
          class="body_row"
          :class="body_rowClass"
        >
          <td
            v-for="it in item"
            :key="it.date"
            class="body_col"
            :class="[
              { hoverNotStyle: !it.value },
              body_colClass,
            ]"
          >
            <div
              :aria-selected="isSameDate(it.date, modelSelect) || undefined"
              class="day"
              :class="[
                dayClass,
                { hoverNotStyle: !it.value },
                it.type !== 'current' ? day_outsideClass : '',
                isToday(it.date) ? todayClass : '',
                isSameDate(it.date, modelSelect) ? day_selectedClass : '',
              ]"
              @click="onSelect(it)"
            >
              <slot name="cell" :item="it">
                {{ it.value }}
              </slot>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <slot name="footer"/>
      </tfoot>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.v-day-calendar {
  cursor: default;
  user-select: none;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .action_block {
      display: flex;
      gap: 2px;
      align-items: center;

      .action_button {
        cursor: pointer;
        padding: 2px;
        border-radius: 6px;
        color: #a3a3a3;

        &:hover {
          background: #e5e5e5;
        }
      }

    }
  }

  .table_layout {
    width: 100%;

    .week {
      display: flex;
      gap: 4px;
      margin-bottom: 8px;

      .week_day {
        font-size: 12px;
        text-align: center;
        flex: 1;
      }
    }

    .calendar_body {
      .body_row {
        display: flex;
      }

      .body_col {
        cursor: pointer;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;

        .day {
          height: 30px;
          width: 30px;
          line-height: 30px;
          border-radius: 5px;
          font-size: 12px;
          text-align: center;

          &:hover {
            background: hsl(0deg 0% 0% / 5%);
          }
        }

        .day_outside {
          opacity: 50%;
        }

        .today {
          font-weight: bold !important;
        }

      }
    }

  }

  .selectedDay {
    background: #e5e5e5 !important;
  }

  .hoverNotStyle {
    cursor: default !important;
    background: none !important;
  }

  .exceedDate {
    cursor: not-allowed;
    opacity: 50%;

    &:hover {
      background: none;
    }
  }
}
</style>
