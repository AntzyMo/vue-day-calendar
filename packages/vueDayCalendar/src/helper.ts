import dayjs from 'dayjs'

export function transDayjs(date: string | Date) {
  return dayjs(date)
}

export function isSameDate(nextDate: string | Date | undefined, prevDate?: string | Date) {
  const date = prevDate || new Date()
  return dayjs(date).isSame(nextDate, 'day')
}
