<script setup lang="ts">
  import dayjs from 'dayjs'
  import { computed, shallowRef, toValue, watch } from 'vue'
  import type {
    DayType,
    EventChange,
    EventSelect,
    MonthsTrigger,
    VDateType,
    VueDayCalendarProps
  } from './types'

  import IconLeftArrow from '~icons/mingcute/left-fill'
  import IconRightArrow from '~icons/mingcute/right-fill'

  import { createDay, createNextDay, isSameDate, isToday } from './helper'

  const props = withDefaults(defineProps<VueDayCalendarProps>(), {
    showOutsideDays: false,
    disableNavigation: false
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
    monthsTrigger,
    goToToday
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

  // v-model selected day
  const modelValue = defineModel<string | Date>()
  // v-model month
  const modelMonth = defineModel<VDateType>('month')

  // 默认的日期
  const defaultDay = computed(() => {
    const dayjsInstance = dayjs(modelMonth.value || new Date())
    return props.locale ? dayjsInstance.locale(props.locale) : dayjsInstance
  })

  // 需要改变的日期
  const dayjsRef = shallowRef(defaultDay.value)

  watch(defaultDay, val => {
    dayjsRef.value = val
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

  function isAfterDate(maxDate?: VDateType) {
    return maxDate && dayjsRef.value.isAfter(dayjs(maxDate))
  }

  function isBeforeDate(minDate?: VDateType) {
    return minDate && dayjsRef.value.isBefore(dayjs(minDate))
  }

  function monthsTrigger(type: 'prev' | 'next') {
    if (type === 'next' && isAfterDate(props.maxDate)) return
    if (type === 'prev' && isBeforeDate(props.minDate)) return

    const dayjs = toValue(dayjsRef)

    dayjsRef.value = type === 'prev' ? dayjs.subtract(1, 'month') : dayjs.add(1, 'month')

    modelMonth.value = dayjsRef.value.format('YYYY-MM')

    emit('change', {
      type,
      value: dayjsRef.value.format('YYYY-MM')
    })
  }

  function onSelect(item: DayType) {
    const { date, type } = item
    if (type !== 'current') return

    emit('select', {
      date,
      type
    })

    modelValue.value = item.date
  }

  function goToToday() {
    dayjsRef.value = dayjs()
    modelMonth.value = dayjsRef.value.format('YYYY-MM')
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
              { exceedDate: isBeforeDate(props.minDate) },
              head_actionClass,
            ]"
            @click="monthsTrigger('prev')"
          />
          <IconRightArrow
            class="action_button"
            :class="[
              { exceedDate: isAfterDate(props.maxDate) },
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
              :aria-selected="isSameDate(it.date, modelValue) || undefined"
              class="day"
              :class="[
                dayClass,
                { hoverNotStyle: it.type !== 'current' },
                it.type !== 'current' ? day_outsideClass : '',
                isToday(it.date, defaultDay) ? todayClass : '',
                isSameDate(it.date, modelValue) ? day_selectedClass : '',
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
