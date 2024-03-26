import dayjs from 'dayjs'
import { computed, shallowRef, toValue } from 'vue'
import type { DayType } from './types'

interface useDayCalendarOptons {
  format: string
  defaultDate: string | Date
}

export type MonthsTrigger = (type: 'prev' | 'next') => void

export default function useDayCalendar({ format }: useDayCalendarOptons) {
  const dayjsRef = shallowRef(dayjs())
  const year = computed(() => dayjsRef.value.format(format))

  const weekday: string[] = []
  for (let i = 1; i <= 7; i++) {
    weekday.push(dayjsRef.value.day(i).format('dd'))
  }

  const dates = computed<DayType[][]>(() => {
    const totalDay = dayjsRef.value.daysInMonth()
    const startDay = dayjsRef.value.startOf('month').day()

    const datesArr: DayType[] = []
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
        value: String(day),
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

    const arr: DayType[][] = []
    while (datesArr.length) {
      arr.push(datesArr.splice(0, 7))
    }

    return arr
  })

  const monthsTrigger = (type: 'prev' | 'next') => {
    const dayjs = toValue(dayjsRef)
    dayjsRef.value = type === 'prev' ? dayjs.subtract(1, 'month') : dayjs.add(1, 'month')
  }

  return {
    dayjsRef,
    year,
    weekday,
    monthsTrigger,
    dates
  }
}
