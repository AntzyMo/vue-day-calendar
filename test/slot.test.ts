import { expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import VueDayCalendar from '../src/vueDayCalendar.vue'

it('slots props', () => {
  const slots = {
    head: '<div>Header</div>',
    week: '<div>week</div>',
    cell: '<div>Cell</div>',
    footer: '<div>Footer</div>'

  }

  const wrapper = mount(VueDayCalendar, { slots })

  for (const key in slots) {
    expect(wrapper.html()).toContain(slots[key])
  }
})
