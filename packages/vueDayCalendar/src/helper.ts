import dayjs from 'dayjs'

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
