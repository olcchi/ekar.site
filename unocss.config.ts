import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetIcons(),
    presetUno(),
    presetAttributify(),
    presetWebFonts(
      {
        provider: 'fontshare',
        fonts: {
          sans: 'Satoshi',
          serif: 'Telma',
        },
      },
    ),
    presetTypography(),
  ],
  shortcuts: [
    {
      themeBase: 'bg-white text-black dark:bg-black dark:text-gray-2 ',
      borderBase: 'dark:border-dark-2 border-gray-2 ',
      linkBase: 'block decoration-none border-b border-gray-3 dark:border-dark-1 hover:border-gray-8 dark:hover:border-gray-3',
      linkMd: 'decoration-none border-b hover:border-gray-3 dark:hover:border-dark-1 border-gray-8 dark:border-gray-3',
    },
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    animation: {
      keyframes: {
        slideUp: '{ from {transform: translateY(10px);opacity:0;} to {transform: translateY(0px);opacity:100;}}',
      },
      durations: {
        slideUp: '0.8s',
      },
      timingFns: {
        slideUp: 'ease',
      },
    },
  },

})
