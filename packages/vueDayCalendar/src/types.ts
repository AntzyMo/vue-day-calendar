import type { Dayjs } from 'dayjs'

export interface classesTypes {
  root: string
  head: string
  head_date: string
  head_action: string
  week: string
  week_day: string
  body: string
  body_row: string
  body_col: string
  day: string
  day_selected: string
  day_outside: string
  today: string
}

export type EventSelect = Pick<DayType, 'date' | 'type'>
export interface EventChange {
  type: 'prev' | 'next'
  value: string
}

export type VDateType = Date | Dayjs
export interface VueDayCalendarProps {
  /**
   * yearAndMonthFormat
   * @description YearAndMonth format.
   * Docs: https://day.js.org/docs/en/display/format
   */
  yearAndMonthFormat?: string
  /**
   * locale
   * @description The locale of the calendar.
   *  You can see https://github.com/iamkun/dayjs/tree/dev/src/locale
   * @default 'en'
   */
  locale?: ILocale

  /**
   * classes
   * @description Custom classes.
   */
  classes?: Partial<classesTypes>

  /**
   * showOutsideDays
   * @description Show the number of days excluding today's date.
   */
  showOutsideDays?: boolean

  maxDate?: VDateType

  minDate?: VDateType

  /**
   * disableNavigation
   * @description Disable navigation buttons
   */
  disableNavigation?: boolean

  month?: VDateType | string
}

export interface DayType {
  date: string
  value: string
  type: 'prev' | 'current' | 'next'
}

export type MonthsTrigger = (type: 'prev' | 'next') => void
