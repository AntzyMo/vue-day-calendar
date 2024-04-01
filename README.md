<p align="center">
    <br> English | <a href="README-CN.md">中文</a>
</p>

# vue-day-calendar
`day-calendar` is a `Vue` date picker component that presents dates in a calendar format. It features a clean appearance and supports customizable styling with `tailwindcss` and `unocss`. It comes with built-in `Dayjs`.

## Installation
```shell
pnpm add vue-day-calendar
```

## Example
```vue
<script setup lang="ts">
  import 'vue-day-calendar/style.css'
  import VueDayCalendar from 'vue-day-calendar'
</script>

<template>
  <VueDayCalendar/>
</template>
```
## Attributes
| Name | Description | Type | Default
| ----- | ---- | ----| --- |
| `yearAndMonthFormat` | The class named 'head_date' with a date format, more formats at: https://day.js.org/docs/en/display/format | `string` | `MMMM YYYY` |
| `locale` | Loading language configuration, supported languages: https://github.com/iamkun/dayjs/tree/dev/src/locale | `ILocale` | `en` |
| `classes` | Configurable styles, supported class names are: https://github.com/AntzyMo/vue-day-calendar/blob/53ce7e70e6afc7bccda717f3a019a4dbbed5ec6b/packages/vueDayCalendar/src/types.ts#L3-L17 | `Partial<classesTypes>` | - |
| `showOutsideDays` | Display the number of days that are not in the current month | `boolean` | `false` |
| `maxDate` | Limit the maximum date | `Date` / `Dayjs` | - |
| `minDate` | Limit the minimum date | `Date` / `Dayjs` | - |
| `disableNavigation` | Whether to display the switch month button | `boolean` | - |

## 插槽
| Name | Description | Params 
| ----- | ---- | ----|  
| `head` | Customize header content | https://github.com/AntzyMo/vue-day-calendar/blob/53ce7e70e6afc7bccda717f3a019a4dbbed5ec6b/packages/vueDayCalendar/src/vueDayCalendar.vue#L21 | 
| `week` | Customize week content | https://github.com/AntzyMo/vue-day-calendar/blob/53ce7e70e6afc7bccda717f3a019a4dbbed5ec6b/packages/vueDayCalendar/src/vueDayCalendar.vue#L22 | 
| `cell` | Customize day content | https://github.com/AntzyMo/vue-day-calendar/blob/53ce7e70e6afc7bccda717f3a019a4dbbed5ec6b/packages/vueDayCalendar/src/vueDayCalendar.vue#L23C5-L23C9 | 
| `footer` | Customize footer content | - | 

## ref
| Name | Description | Type 
| ----- | ---- | ----|  
| `monthsTrigger` | Method of switching months | `Function` | 
| `goToToday` | Method to return to today | `Function` | 

## Contribution guide
- `git checkout` create a new branch
- The commits of fix & feat will be used to generate the changelog
  
## License
[MIT](./LICENSE) License &copy; 2024-PRESENT [AntzyMo](https://github.com/AntzyMo)



