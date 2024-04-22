
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

export interface VueDayCalendarProps {
  /**
   * YearAndMonth format.
   * Docs: https://day.js.org/docs/en/display/format
   */
  yearAndMonthFormat?: string
  /**
   * The locale of the calendar.
   * You can see https://github.com/iamkun/dayjs/tree/dev/src/locale
   * @default 'en'
   */
  locale?: ILocale

  /**
   * Custom classes.
   */
  classes?: Partial<classesTypes>

  /**
   * Show the number of days excluding today's date.
   */
  showOutsideDays?: boolean

  /**
   * Maximum display date.
   */
  maxDate?: string

  /**
   * Minimum display date.
   */
  minDate?: string

  /**
   * Disable navigation buttons
   */
  disableNavigation?: boolean

  /**
   * Fixed number of weeks.
   */
  fixedWeeks?: boolean | number
}

export interface DayType {
  date: string
  value: string
  type: 'prev' | 'current' | 'next'
}

export type MonthsTrigger = (type: 'prev' | 'next') => void
