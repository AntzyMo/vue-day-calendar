<p align=center>
<a href="https://github.com/AntzyMo/vue-day-calendar"><img src="./assets/logo.svg" width="140" /></a>
</p>

<h1 align="center">
vue-day-calendar
</h1>

<p align="center">
<a href="https://github.com/AntzyMo/vue-day-calendar">English</a> | 中文
</p>

`day-calendar` 是 `Vue` 日期选择组件，以日历的方式去呈现，它具有简洁的外观，并且支持 `tailwindcsss` 和 `unocss` 可定制化样式修改.


![screenshot](./assets/screenshot.png)

## ✨ 功能特点
-  以选择日期为主要的日历组件
-  使用 [dayjs](https://dayjs.gitee.io/zh-CN) 作为日期库
-  国际化多语言
-  高度可定制化样式

> **Note**  
> 文档还在完善中，可以先看 [demo](https://github.com/AntzyMo/vue-day-calendar/tree/main/example/src/components)

## 贡献指南
如果在使用过程中发现问题，欢迎提交 [issue](https://github.com/AntzyMo/vue-day-calendar/issues) 或 **pull request** 并第一时间解决
  

## 安装
```shell
pnpm add vue-day-calendar dayjs
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
| `modelValue` / `v-model` | 获取选中的值 | `string` | - |
| `yearAndMonthFormat` | class 名为'head_date'的日期格式，更多格式：https://day.js.org/docs/en/display/format | `string` | `MMMM YYYY` |
| `locale` | 加载语言配置，支持的语言：https://github.com/iamkun/dayjs/tree/dev/src/locale | `ILocale` | `en` |
| `classes` | 可配置化样式，支持的类名有：https://github.com/AntzyMo/vue-day-calendar/blob/53ce7e70e6afc7bccda717f3a019a4dbbed5ec6b/packages/vueDayCalendar/src/types.ts#L3-L17 | `Partial<classesTypes>` | - |
| `showOutsideDays` | 显示不是当前月份的天数 | `boolean` | `false` |
| `maxDate` | 限制最大日期 | `Date` / `Dayjs` | - |
| `minDate` | 限制最小日期 | `Date` / `Dayjs` | - |
| `disableNavigation` | 是否显示切换月份按钮 | `boolean` | - |
| `month` | 自定义当前月份 | `string` / `Date` / `Dayjs` | `new Date()` |

## 事件
| 事件名 | 说明 | 参数
| ----- | ---- | ----|
| `select` | 选中日期时触发 | `Function` |
| `change` | 选择月份时触发 | `Function` |

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


## License
[MIT](./LICENSE) License &copy; 2024-PRESENT [AntzyMo](https://github.com/AntzyMo)



