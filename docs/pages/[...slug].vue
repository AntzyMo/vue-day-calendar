<script setup lang="ts">
  const route = useRoute()
  console.log('route', route)

  const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
  const docsMenus = navigation.value?.filter(item => !!item?.children)

  const { data } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
</script>

<template>
  <div class="flex flex-col lg:gap-8 lg:grid lg:grid-cols-10 mt-10">
    <div class="lg:col-span-2">
      <aside>
        <DocsAsideMenus :menus="docsMenus"/>
      </aside>
    </div>
    <div class="lg:col-span-8">
      <div class="prose">
        <ContentRenderer :value="data"/>
      </div>
    </div>
  </div>
</template>
