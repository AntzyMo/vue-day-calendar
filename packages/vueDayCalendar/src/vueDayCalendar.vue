<script setup lang="ts">
  import { computed } from 'vue'

  import type { MonthsTrigger } from './useDayCalendar'
  import type { DayType, OnSelectValue, VueDayCalendarProps } from './types'

  import IconLeftArrow from '~icons/mingcute/left-fill'
  import IconRightArrow from '~icons/mingcute/right-fill'

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
  const day_selectedClass = computed(() => props.classes?.day_selected)
  const day_outsideClass = computed(() => props.classes?.day_outside || 'day_outside')
  const todayClass = computed(() => props.classes?.today || 'today')

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
    head: (props: { date: string; tigger: MonthsTrigger }) => any
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
  <div class="v-day-calendar" :class="rootClass">
    <slot name="head" :date="year" :tigger="monthsTrigger">
      <div class="head" :class="headClass">
        <div class="head_date" :class="head_dateClass">
          {{ year }}
        </div>
        <div class="action_block">
          <IconLeftArrow class="action_button" :class="head_actionClass" @click="monthsTrigger('prev')"/>
          <IconRightArrow class="action_button" :class="head_actionClass" @click="monthsTrigger('next')"/>
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
      <slot name="body" :dates>
        <tbody :class="bodyClass">
          <tr
            v-for="(item, index) in dates"
            :key="index"
            class="body_row"
            :class="body_rowClass"
          >
            <td
              v-for="it in item"
              :key="it.value"
              class="body_col"
              :class="body_colClass"
            >
              <div
                :aria-selected="isSameDate(modelSelect, it.date) || undefined"
                class="day"
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

      .action_button{
        cursor: pointer;
        padding: 2px;
        border-radius: 6px;
        color: #a3a3a3;

        &:hover{
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
        flex:1;
      }
    }

    .body_row{
      display: flex;
    }
    .body_col{
      cursor: pointer;
      display: flex;
      flex:1;
      align-items: center;
      justify-content: center;

      .day{
        height: 24px;
        width: 24px;
        line-height: 24px;
        border-radius: 5px;
        font-size: 12px;
        text-align: center;

        &:hover{
          background:hsl(0deg 0% 0% / 5%) ;
        }
      }

      .day_outside{
        opacity: 50%;
      }

      .today{
        color: #fff;
        background: #38bdf8;
      }

    }
  }
}
</style>
