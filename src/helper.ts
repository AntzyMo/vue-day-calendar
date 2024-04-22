import dayjs from 'dayjs'
import type { DayType } from './types'

type DateOption = string | Date

const DATE_FORMAT = 'YYYY-MM-DD'

export function toDayjs(date: DateOption) {
  if (!date) return dayjs()
  if (typeof date === 'string') return dayjs(date)
  return date
}

export function isSameDate(source: DateOption, target?: DateOption) {
  if (!target) return false
  return dayjs(target).isSame(source, 'day')
}

export function isToday(date: string | Date | undefined) {
  return dayjs().isSame(date, 'day')
}

export function createDay(type: 'prev' | 'current' | 'next', dateRaw: dayjs.Dayjs): DayType {
  return {
    date: dateRaw.format(DATE_FORMAT),
    value: dateRaw?.format('D'),
    type
  }
}

export function createNextDay(dateRaw: dayjs.Dayjs, day: number): DayType {
  return createDay('next', dateRaw.endOf('month').add(day + 1, 'day'))
}
