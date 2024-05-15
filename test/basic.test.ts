import dayjs from 'dayjs'
import zhcn from 'dayjs/locale/zh-cn'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { VueDayCalendarProps } from '../src/types'

import VueDayCalendar from '../src/vueDayCalendar.vue'

it('vueDayCalenadr render', () => {
  const wrapper = mount(VueDayCalendar)
  expect(wrapper.attributes('class')).toBe('v-day-calendar')
})

describe('basic props', () => {
  it.each(['YYYY-MM', 'YYYY/MM'])('should format year and month %s', format => {
    const wrapper = mount(VueDayCalendar, {
      props: {
        yearAndMonthFormat: format
      }
    })

    const head_dateValue = wrapper.get('.head_date').text()

    expect(head_dateValue).toBe(dayjs().format(format))
  })

  it.each([true, false])('should show outside days when showOutsideDays is %s', showOutsideDaysProps => {
    const wrapper = mount(VueDayCalendar, {
      props: {
        showOutsideDays: showOutsideDaysProps
      }
    })

    const outsideDays = wrapper.findAll('.day_outside')
    const outsideDaysVal = outsideDays.map(day => day.text()).filter(Boolean)

    if (showOutsideDaysProps) {
      expect(outsideDays.length).toBe(outsideDaysVal.length)
    } else {
      expect(outsideDaysVal.length).toBe(0)
    }
  })

  it.each([true, false])('should disable navigation buttons when disableNavigation is %s', disableNavigationProps => {
    const wrapper = mount(VueDayCalendar, {
      props: {
        disableNavigation: disableNavigationProps
      }
    })

    const isAction_block = wrapper.find('.action_block').exists()
    if (disableNavigationProps) {
      expect(isAction_block).toBe(false)
    } else {
      expect(isAction_block).toBe(true)
    }
  })

  it('should set locale', () => {
    const wrapper = mount(VueDayCalendar, {
      props: {
        locale: zhcn
      }
    })

    const week_dayIsSunday = wrapper.findAll('.week_day')[0].text()
    expect(week_dayIsSunday).toBe('日')
  })
})

describe('should show fixedWeek outside days', () => {
  const fixedweekLength = (props: VueDayCalendarProps) => {
    const wrapper = mount(VueDayCalendar, { props })
    const fixedweekNumber = wrapper.findAll('.body_row').length
    return fixedweekNumber
  }

  it('fixedWeeks true and not outsideDays', () => {
    expect(fixedweekLength({ fixedWeeks: true })).not.toBe(6)
  })

  it('fixedWeeks true and outsideDays', () => {
    expect(fixedweekLength({
      fixedWeeks: true,
      showOutsideDays: true
    })).toBe(6)
  })

  it('if the value of fixedWeeks is 8', () => {
    expect(fixedweekLength({
      fixedWeeks: 8,
      showOutsideDays: true
    })).toBe(8)
  })
})
