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

export type OnSelectValue = Pick<DayType, 'date' | 'type'>

export interface VueDayCalendarProps {
  locale?: string
  classes?: Partial<classesTypes>
  format?: string
  showOutsideDays?: boolean
}

export interface DayType {
  date: string
  value: string
  type: 'prev' | 'current' | 'next'
}

export type MonthsTrigger = (type: 'prev' | 'next') => void
