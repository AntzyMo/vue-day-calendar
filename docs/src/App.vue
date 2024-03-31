<script setup lang="ts">
  import Base from './components/Base.vue'
  import Selected from './components/Selected.vue'
  import Classes from './components/Classes/index.vue'
  import MaxAndMinDate from './components/MaxAndMinDate.vue'
  import CustomSelected from './components/CustomSelected.vue'
  import ShowOutsideDays from './components/ShowOutsideDays.vue'
</script>

<template>
  <div class="flex flex-col justify-center mt-10">
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
  </div>
</template>
