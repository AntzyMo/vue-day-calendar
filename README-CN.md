<p align="center">
    <br> <a href="https://github.com/AntzyMo/vue-day-calendar">English</a> | 中文
</p>

# vue-day-calendar
`day-calendar` 是 `Vue` 日期选择组件，以日历的方式去呈现，它具有简洁的外观，并且支持 `tailwindcsss` 和 `unocss` 可定制化样式修改，内置`Dayjs`。

## 安装
```shell
pnpm add vue-day-calendar
```

## 例子
```vue
<script setup lang="ts">
  import 'vue-day-calendar/style.css'
  import VueDayCalendar from 'vue-day-calendar'
</script>

<template>
  <VueDayCalendar/>
</template>
```
## 属性
| 属性名 | 说明 | 类型 | 默认值
| ----- | ---- | ----| --- |
| `yearAndMonthFormat` | class 名为'head_date'的日期格式，更多格式：https://day.js.org/docs/en/display/format | `string` | `MMMM YYYY` |
| `locale` | 加载语言配置，支持的语言：https://github.com/iamkun/dayjs/tree/dev/src/locale | `ILocale` | `en` |
| `classes` | 可配置化样式，支持的类名有：https://github.com/AntzyMo/vue-day-calendar/blob/53ce7e70e6afc7bccda717f3a019a4dbbed5ec6b/packages/vueDayCalendar/src/types.ts#L3-L17 | `Partial<classesTypes>` | - |
| `showOutsideDays` | 显示不是当前月份的天数 | `boolean` | `false` |
| `maxDate` | 限制最大日期 | `Date` / `Dayjs` | - |
| `minDate` | 限制最小日期 | `Date` / `Dayjs` | - |
| `disableNavigation` | 是否显示切换月份按钮 | `boolean` | - |

## 插槽
| 名称 | 说明 | 参数 
| ----- | ---- | ----|  
| `head` | 自定义头部内容 | https://github.com/AntzyMo/vue-day-calendar/blob/53ce7e70e6afc7bccda717f3a019a4dbbed5ec6b/packages/vueDayCalendar/src/vueDayCalendar.vue#L21 | 
| `week` | 自定义周内容 | https://github.com/AntzyMo/vue-day-calendar/blob/53ce7e70e6afc7bccda717f3a019a4dbbed5ec6b/packages/vueDayCalendar/src/vueDayCalendar.vue#L22 | 
| `cell` | 自定义 day 内容 | https://github.com/AntzyMo/vue-day-calendar/blob/53ce7e70e6afc7bccda717f3a019a4dbbed5ec6b/packages/vueDayCalendar/src/vueDayCalendar.vue#L23C5-L23C9 | 
| `footer` | 自定义底部内容 | - | 

## ref
| 名称 | 说明 | 类型 
| ----- | ---- | ----|  
| `monthsTrigger` | 切换月份的方法 | `Function` | 
| `goToToday` | 回到今天的方法 | `Function` | 

## 贡献指南
- `git checkout` 创建新分支
- fix & feat 的提交会被用来生成 changelog
  
## License
[MIT](./LICENSE) License &copy; 2024-PRESENT [AntzyMo](https://github.com/AntzyMo)



