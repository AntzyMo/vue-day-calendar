<script setup lang="ts">
  const route = useRoute()

  const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
  const docsMenus = navigation.value?.filter(item => !!item?.children)

  const { data } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
</script>

<template>
  <div v-if="data" class="flex flex-col lg:gap-8 lg:grid lg:grid-cols-10 mt-10">
    <div class="lg:col-span-2">
      <aside class="gap-6 grid lg:sticky lg:top-4">
        <DocsAsideMenus :menus="docsMenus"/>
      </aside>
    </div>
    <div class="lg:col-span-8">
      <div class="docs">
        <ContentRenderer :value="data"/>
      </div>
    </div>
  </div>
  <div v-else>
    暂无数据
  </div>
</template>

<style lang="postcss">
.docs{
  h1{
    @apply text-3xl font-500 mb-3;
  }
  h2{
    @apply text-lg font-bold;
  }
  p{
    @apply text-base mb-4;
  }
  .preClass{
    @apply w-650px!;
  }
}
</style>
