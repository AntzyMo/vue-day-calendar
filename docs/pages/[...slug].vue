<script setup lang="ts">
  const route = useRoute()
  const router = useRouter()

  const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
  const docsMenus = navigation.value?.filter(item => !!item?.children)

  const data = await useLocaleFetchContent(route.path)

  if (data.value && typeof data.value?._dir !== 'string') {
    router.replace(data.value._dir.navigation.redirect)
  }
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
  <div v-else class="h-full" flex="~ items-center justify-center">
    <h1>Page not found</h1>
  </div>
</template>

<style lang="postcss">
.docs{
  h1{
    @apply text-3xl font-500 mb-3;
  }

  h2{
    @apply text-lg font-500 mb-3 mt-5;
  }

  h3{
    @apply text-base font-500 mb-3 mt-5;
  }

  .preClass{
    @apply w-650px!;
  }

  :not(pre) > code{
    @apply bg-gray-100  rounded-md mx-1 px-1 py-0.5 text-xs border;
  }

  ul{
    @apply list-disc ml-6;
  }

  :not(h2) > a {
    @apply underline-none! underline-transparent!;

    code{
      @apply border-red border-dashed  bg-red-100 hover:bg-red-200;
    }
  }

  p{
    @apply text-base mb-4 leading-7 text-gray-700;

    a{
      @apply underline underline-dashed underline-offset-4 hover:underline-red-500 underline-red;
    }
  }
}
</style>
