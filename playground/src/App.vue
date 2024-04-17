<script setup lang="ts">
  import Base from './components/Base.vue'
  import Month from './components/Month.vue'
  import Locale from './components/Locale.vue'
  import Selected from './components/Selected.vue'
  import Classes from './components/Classes/index.vue'
  import FixedWeeks from './components/FixedWeeks.vue'
  import SelectedDays from './components/SelectedDays.vue'
  import MaxAndMinDate from './components/MaxAndMinDate.vue'
  import CustomSelected from './components/CustomSelected.vue'
  import ShowOutsideDays from './components/ShowOutsideDays.vue'
</script>

<template>
  <div class="grid grid-cols-4 ml-10 mt-11">
    <div class="w-[250px]">
      <h2>base</h2>
      <Base/>
    </div>

    <div class="w-[220px]">
      <h2>classes</h2>
      <Classes/>
    </div>

    <div class="w-[250px]">
      <h2>showOutsideDays</h2>
      <ShowOutsideDays/>
    </div>

    <div class="w-[250px]">
      <h2>MaxAndMinDate</h2>
      <MaxAndMinDate/>
    </div>

    <div class="w-[250px]">
      <h2>Selected</h2>
      <Selected/>
    </div>

    <div class="w-[250px]">
      <h2>Custom Selected</h2>
      <CustomSelected/>
    </div>

    <div class="w-[250px]">
      <h2>Locale</h2>
      <Locale/>
    </div>

    <div class="w-[250px]">
      <h2>Month</h2>
      <Month/>
    </div>

    <div class="w-[250px]">
      <h2>fixedweeks</h2>
      <FixedWeeks/>
    </div>

    <div class="w-[250px]">
      <h2>SelectedDays</h2>
      <SelectedDays/>
    </div>
  </div>
</template>
