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
  shortcuts: {
    btn: 'bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md'
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        rubikAndNotoSansCC: [
          {
            name: 'Rubik',
            weights: ['400', '500', '700']
          },
          {
            name: 'Noto Sans SC',
            weights: ['400', '500', '700']
          }
        ]
      }
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ]
})
