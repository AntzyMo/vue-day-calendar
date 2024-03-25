interface classesTypes {
  week?: string
  body?: string
  body_row?: string
  body_col?: string
  day?: string
  day_selected?: string
  day_outside?: string

}
export interface VueDayCalendarProps {
  locale?: string
  size?: 'large' | 'middle' | 'small'
  classes?: classesTypes
  format?: string
}

export interface DayType {
  date: string
  value: string
  type: 'prev' | 'current' | 'next'
  selected: boolean
}

export type OnSelectValue = Pick<DayType, 'date' | 'type'>
