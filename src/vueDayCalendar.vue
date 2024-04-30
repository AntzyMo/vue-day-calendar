<script setup lang="ts">
  import dayjs from 'dayjs'
  import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
  import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
  import { computed, shallowRef, toValue, watch } from 'vue'
  import type {
    CalendarMode,
    DayType,
    EventChange,
    EventSelect,
    MonthsTrigger,
    VueDayCalendarProps
  } from './types'

  import IconLeftArrow from '~icons/mingcute/left-fill'
  import IconRightArrow from '~icons/mingcute/right-fill'

  import {
    createDay,
    createNextDay,
    isSameDate,
    isToday,
    toArray
  } from './helper'

  const props = withDefaults(defineProps<VueDayCalendarProps>(), {
    showOutsideDays: false,
    disableNavigation: false,
    mode: 'single'
  })

  const emit = defineEmits<{
    /** select change */
    select: [value: EventSelect]
    /** month change */
    change: [value: EventChange]
  }>()

  const YEAR_MONTH_FORMAT = 'MMMM YYYY'
  const FIXED_WEEKS = 6

  defineSlots<{
    head: (props: { date: string; tigger: MonthsTrigger }) => any
    week: (props: { weekday: string[] }) => any
    cell: (props: { item: DayType }) => any
    footer: () => any
  }>()

  defineExpose({
    monthsTrigger
  })

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
  // props mode range class
  const modeRangeClass = computed(() => props.classes?.mode_range || 'mode_range')
  const firstModeRangeClass = computed(() => props.classes?.first_mode_range || 'first_mode_range')
  const lastModeRangeClass = computed(() => props.classes?.last_mode_range || 'last_mode_range')

  // v-model selected day YYYY-MM-DD
  const modelValue = defineModel<string | string[] | null>({ default: null })
  // v-model month YYYY-MM
  const modelMonth = defineModel<string>('month')

  // 创建日期
  function createCalendarDate() {
    dayjs.extend(isSameOrAfter)
    dayjs.extend(isSameOrBefore)
    const dayjsInstance = dayjs(modelMonth.value || new Date())
    return props.locale ? dayjsInstance.locale(props.locale) : dayjsInstance
  }

  const dayjsRef = shallowRef(createCalendarDate())

  watch(modelMonth, () => {
    dayjsRef.value = createCalendarDate()
  })

  const year = computed(() => dayjsRef.value.format(props.yearAndMonthFormat || YEAR_MONTH_FORMAT))

  const weekday: string[] = Array.from({ length: 7 }, (_, i) => dayjsRef.value.day(i).format('dd'))

  const days = computed<DayType[][]>(() => {
    const totalDay = dayjsRef.value.daysInMonth()
    const startDay = dayjsRef.value.startOf('month').day()

    const startDays = Array.from({ length: startDay }, (_, i) => createDay('prev', dayjsRef.value.startOf('month').subtract(startDay - i, 'day')))

    const currentMonthDays = Array.from({ length: totalDay }, (_, i) => createDay('current', dayjsRef.value.date(i + 1)))

    const monthDays = [...startDays, ...currentMonthDays]

    if (props.showOutsideDays && props.fixedWeeks) {
      const totalDay = (typeof props.fixedWeeks === 'boolean' ? FIXED_WEEKS : props.fixedWeeks) * 7
      if (monthDays.length < totalDay) {
        monthDays.push(...Array.from({ length: totalDay - monthDays.length }, (_, i) => createNextDay(dayjsRef.value, i)))
      }
    }

    const weekDays: DayType[][] = []
    while (monthDays.length) {
      weekDays.push(monthDays.splice(0, 7))
    }

    weekDays.forEach(days => {
      if (days.length < 7) {
        days.push(...Array.from({ length: 7 - days.length }, (_, i) => createNextDay(dayjsRef.value, i)))
      }

      if (!props.showOutsideDays) {
        days.forEach(day => {
          if (day.type !== 'current') {
            day.value = ''
          }
        })
      }
    })

    return weekDays
  })

  const isAfterMonth = computed(() => {
    return props.maxDate && dayjsRef.value.isSameOrAfter(dayjs(props.maxDate), 'month')
  })

  const isBeforeMonth = computed(() => {
    return props.minDate && dayjsRef.value.isSameOrBefore(dayjs(props.minDate), 'month')
  })

  function monthsTrigger(type: 'prev' | 'next') {
    if (type === 'next' && isAfterMonth.value) return
    if (type === 'prev' && isBeforeMonth.value) return

    const dayjs = toValue(dayjsRef)

    dayjsRef.value = type === 'prev' ? dayjs.subtract(1, 'month') : dayjs.add(1, 'month')

    modelMonth.value = dayjsRef.value.format('YYYY-MM')

    emit('change', {
      value: dayjsRef.value.format('YYYY-MM')
    })
  }

  let selectedDays: string[] = [...toArray(modelValue.value || [])]

  function isSelectedDay(day: string) {
    const toSelectedArr = modelValue.value ? toArray(modelValue.value) : []
    if (props.mode === 'range') {
      const [starSelectedDay, endSelectedDay] = selectedDays
      if (starSelectedDay && endSelectedDay) {
        return isSameDate(day, starSelectedDay) || isSameDate(day, endSelectedDay) || (dayjs(day).isAfter(dayjs(starSelectedDay)) && dayjs(day).isBefore(dayjs(endSelectedDay)))
      }
    }
    return toSelectedArr.some(item => isSameDate(day, item))
  }

  const isAfterDay = (date: string) => props.maxDate && dayjs(date).isAfter(dayjs(props.maxDate, 'day'))
  const isBeforeDay = (date: string) => props.minDate && dayjs(date).isBefore(dayjs(props.minDate, 'day'))
  function onSelect(item: DayType) {
    const { date, type } = item
    if (type !== 'current') return

    if (isAfterDay(date) || isBeforeDay(date)) return

    const modeValue = handleMode(props.mode, date)
    modelValue.value = modeValue
    emit('select', {
      value: modeValue
    })
  }

  // handle props mode
  let sameDateFlag = 0
  function handleMode(mode: CalendarMode, date: string) {
    let modeValue: string | string[] | null = []
    if (mode === 'multiple') {
      const selectedIdx = selectedDays.findIndex(item => item === date)
      if (selectedIdx === -1) {
        selectedDays.push(date)
      } else {
        selectedDays.splice(selectedIdx, 1)
      }
      modeValue = selectedDays.toSorted()
    } else if (mode === 'range') {
      if (!selectedDays.length) {
        selectedDays.push(date)
      } else {
        if (selectedDays.includes(date)) {
          sameDateFlag++
          if (sameDateFlag > 1) {
            selectedDays = []
          } else {
            selectedDays = selectedDays.length === 1 ? [] : [date]
          }
          sameDateFlag = 0
        } else {
          if (dayjs(date).isBefore(dayjs(selectedDays[0]))) {
            if (selectedDays.length > 1) {
              selectedDays[0] = date
            } else {
              selectedDays = [date, ...selectedDays]
            }
          } else {
            selectedDays[1] = date
          }
        }
      }
      modeValue = [...selectedDays]
    } else {
      if (selectedDays.includes(date)) {
        selectedDays = []
      } else {
        selectedDays = [date]
      }
      modeValue = selectedDays[0] || null
    }
    return modeValue
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
              { exceedDate: isBeforeMonth },
              head_actionClass,
            ]"
            @click="monthsTrigger('prev')"
          />
          <IconRightArrow
            class="action_button"
            :class="[
              { exceedDate: isAfterMonth },
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
              mode === 'range' && modelValue?.length === 2 && isSelectedDay(it.date) ? modeRangeClass : '',
              mode === 'range' && modelValue?.length === 2 && it.date === modelValue?.[0] ? firstModeRangeClass : '',
              mode === 'range' && modelValue?.length === 2 && it.date === modelValue?.[1] ? lastModeRangeClass : '',
              body_colClass,
            ]"
          >
            <div
              class="day"
              :class="[
                dayClass,
                { hoverNotStyle: it.type !== 'current' },
                { disabled: isAfterDay(it.date) || isBeforeDay(it.date) },
                it.type !== 'current' ? day_outsideClass : '',
                isToday(it.date) ? todayClass : '',
                isSelectedDay(it.date) ? day_selectedClass : '',
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
    </table>

    <slot name="footer"/>
  </div>
</template>

<style lang="scss" scoped>
$selected-bg: #e5e5e5;

.v-day-calendar {
  cursor: default;
  user-select: none;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: bold;

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
        width: calc(100% / 7);
      }
    }

    .calendar_body {
      .body_row {
        display: flex;
      }

      .body_col {
        width: calc(100% / 7);
        cursor: pointer;
        display: flex;
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
    background: $selected-bg!important;
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

  .mode_range {
    background: $selected-bg;
  }

  .first_mode_range{
    border-top-left-radius: 5px;
  }

  .last_mode_range{
    border-bottom-right-radius: 5px;
  }

  .disabled{
    cursor: not-allowed;
    opacity: 50%;
  }
}
</style>
