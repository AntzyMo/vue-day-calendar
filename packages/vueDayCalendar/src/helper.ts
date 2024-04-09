import dayjs from 'dayjs'

import type { Dayjs } from 'dayjs'
import type { DayType } from './types'

type DateOption = string | Date

const DATE_FORMAT = 'YYYY-MM-DD'
export const YEAR_MONTH_FORMAT = 'MMMM YYYY'

export function toDayjs(date: DateOption) {
  if (!date) return dayjs()
  if (typeof date === 'string') return dayjs(date)
  return date
}

export function isSameDate(source: DateOption, target?: DateOption) {
  if (!target) return false
  return dayjs(target).isSame(source, 'day')
}

export function isToday(date: string | Date | undefined, target?: Dayjs) {
  return dayjs(target).isSame(date, 'day')
}

export function createDay(dateRaw: dayjs.Dayjs, type: 'prev' | 'current' | 'next'): DayType {
  return {
    date: dateRaw.format(DATE_FORMAT),
    value: dateRaw.format('D'),
    type
  }
}
