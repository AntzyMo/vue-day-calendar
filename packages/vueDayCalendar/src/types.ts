interface classesTypes {
  week: string
  body: string
  body_row: string
  body_col: string
  day: string
  day_selected: string
  day_outside: string
  today: string
}

export type SizeType = 'large' | 'middle' | 'small'
export type OnSelectValue = Pick<DayType, 'date' | 'type'>

export interface VueDayCalendarProps {
  locale?: string
  size?: SizeType
  classes?: Partial<classesTypes>
  format?: string
}

export interface DayType {
  date: string
  value: string
  type: 'prev' | 'current' | 'next'
}
