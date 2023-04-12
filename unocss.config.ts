import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  presets: [
    presetIcons(),
    presetUno(),
    presetAttributify(),
    presetWebFonts(
      {
        provider: 'bunny',
        fonts: {
          serif: 'Alice',
        },
      },
    ),
    presetTypography(),
  ],
  shortcuts: [
    {
      defaultDark: 'dark:bg-dark-800 dark:text-white transition-all ease-in-out duration-200',
      defaultLight: 'bg-white text-black transition-all ease-in-out duration-200',
      defaultAnimation: 'transition-all duration-200 ease-in-out',
    },
  ],
})
