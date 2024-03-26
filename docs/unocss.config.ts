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
  shortcuts: [
    {
      itemHoverBackground: 'hsl(0deg 0% 0% / 5%)'

    }
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts()
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ]
})
