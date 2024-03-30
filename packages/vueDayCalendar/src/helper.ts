import dayjs from 'dayjs'
import type { DayType } from './types'

type DateOption = string | Date | undefined

const DATE_FORMAT = 'YYYY-MM-DD'

export function toDayjs(date: DateOption) {
  if (!date) return dayjs()
  if (typeof date === 'string') return dayjs(date)
  return date
}

export function isSameDate(target: DateOption, source: DateOption) {
  return dayjs(target).isSame(source, 'day')
}

export function isToday(date: string | Date | undefined) {
  return dayjs().isSame(date, 'day')
}

export function createDay(dateRaw: dayjs.Dayjs, type: 'prev' | 'current' | 'next'): DayType {
  return {
    date: dateRaw.format(DATE_FORMAT),
    value: dateRaw.format('D'),
    type
  }
}
