import dayjs from 'dayjs'
import type { DayType } from './types'

type DateOption = string | Date | undefined

export function transDayjs(date: DateOption) {
  return dayjs(date)
}

export function isSameDate(target: DateOption, source: DateOption) {
  return dayjs(target).isSame(source, 'day')
}

export function isToday(date: string | Date | undefined) {
  return dayjs().isSame(date, 'day')
}

export function createDay(dateRaw: dayjs.Dayjs, type: 'prev' | 'current' | 'next'): DayType {
  return {
    date: dateRaw.format('YYYY-MM-DD'),
    value: dateRaw.format('D'),
    type
  }
}
