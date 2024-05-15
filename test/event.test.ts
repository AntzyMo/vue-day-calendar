import dayjs from 'dayjs'
import { mount } from '@vue/test-utils'
import duration from 'dayjs/plugin/duration'
import { describe, expect, it } from 'vitest'

import VueDayCalendar from '../src/vueDayCalendar.vue'

dayjs.extend(duration)

describe('event', () => {
  it('should maxDate and minDate when click day', async () => {
    const maxDate = dayjs().add(2, 'month').format('YYYY-MM-DD')
    const minDate = dayjs().subtract(2, 'month').format('YYYY-MM-DD')
    const wrapper = mount(VueDayCalendar, {
      props: {
        maxDate,
        minDate
      }
    })

    const head_dateEl = wrapper.get('.head_date')

    // click next month
    expect(head_dateEl.text()).toMatchInlineSnapshot(`"May 2024"`)
    await Promise.all(Array.from({ length: 5 }).map(() => wrapper.findAll('.action_button')[1].trigger('click')))
    expect(head_dateEl.text()).toMatchInlineSnapshot(`"July 2024"`)

    // click prev month
    expect(head_dateEl.text()).toMatchInlineSnapshot(`"July 2024"`)
    await Promise.all(Array.from({ length: 5 }).map(() => wrapper.findAll('.action_button')[0].trigger('click')))
    expect(head_dateEl.text()).toMatchInlineSnapshot(`"March 2024"`)
  })
})

describe('month props event', () => {
  it('month change', async () => {
    const wrapper = mount(VueDayCalendar)
    await wrapper.findAll('.action_button')[1].trigger('click')
    expect(wrapper.emitted('change')).toMatchInlineSnapshot(`
      [
        [
          {
            "value": "2024-06",
          },
        ],
      ]
    `)
  })

  it('v-model:month', async () => {
    const wrapper = mount(VueDayCalendar, {
      props: {
        'month': '2024-05',
        'onUpdate:month': e => wrapper.setProps({ month: e })
      }
    })
    await wrapper.setProps({ month: '2024-06' })
    expect(wrapper.props('month')).toBe('2024-06')
  })
})

describe('select props event', () => {
  it('select change', async () => {
    const wrapper = mount(VueDayCalendar)
    await wrapper.findAll('.day')[14].trigger('click')
    expect(wrapper.emitted('select')).toMatchInlineSnapshot(`
      [
        [
          {
            "value": "2024-05-12",
          },
        ],
      ]
    `)
  })

  it('v-model', async () => {
    const wrapper = mount(VueDayCalendar, {
      props: {
        'modelValue': '2024-05-15',
        'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e })
      }
    })
    await wrapper.setValue('2024-05-20')
    expect(wrapper.props('modelValue')).toBe('2024-05-20')
  })
})

describe('mode props', () => {
  it('mode is multiple', async () => {
    const wrapper = mount(VueDayCalendar, {
      props: {
        'mode': 'multiple',
        'modelValue': [],
        'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e })

      }
    })
    await wrapper.findAll('.day')[14].trigger('click')
    await wrapper.findAll('.day')[20].trigger('click')
    expect(wrapper.props('modelValue')).toMatchInlineSnapshot(`
      [
        "2024-05-12",
        "2024-05-18",
      ]
    `)
  })

  it('mode is single if select one date', async () => {
    const wrapper = mount(VueDayCalendar, {
      props: {
        'mode': 'range',
        'modelValue': [],
        'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e })

      }
    })

    await wrapper.findAll('.day')[14].trigger('click')
    expect(wrapper.props('modelValue')).toMatchInlineSnapshot(`
      [
        "2024-05-12",
      ]
    `)
  })

  it('mode is range if select two date', async () => {
    const wrapper = mount(VueDayCalendar, {
      props: {
        'mode': 'range',
        'modelValue': [],
        'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e })
      }
    })

    await wrapper.findAll('.day')[14].trigger('click')
    await wrapper.findAll('.day')[20].trigger('click')
    expect(wrapper.props('modelValue')).toMatchInlineSnapshot(`
      [
        "2024-05-12",
        "2024-05-18",
      ]
    `)

    const [startDate, endDate] = wrapper.props('modelValue')!

    const dayDiffLength = dayjs(endDate).diff(dayjs(startDate), 'day') + 1

    expect(Array.from({ length: dayDiffLength }).map((_, index) => dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'))).toMatchInlineSnapshot(`
      [
        "2024-05-12",
        "2024-05-13",
        "2024-05-14",
        "2024-05-15",
        "2024-05-16",
        "2024-05-17",
        "2024-05-18",
      ]
    `)
  })
})
