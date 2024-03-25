// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        mingcute: () => import('@iconify-json/mingcute/icons.json').then(i => i.default)
      }
    }),
    presetTypography(),
    presetWebFonts()
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ]
})
