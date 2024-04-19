export async function useLocaleFetchContent(path: string) {
  const { locale } = useI18n()

  const { data, refresh } = await useAsyncData(path, () => queryContent(path).where({ _locale: locale.value }).findOne())

  watch(locale, () => {
    refresh()
  })

  return data
}
