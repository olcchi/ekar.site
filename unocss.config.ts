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
      defaultDark: 'dark:bg-black dark:text-gray-2',
      defaultLight: 'bg-white text-black ',
      defaultBorder: 'dark:border-dark-2 border-gray-2 ',
      defaultLayer: 'w-5/6 lg:w-1/2 xl:w-2/5',
    },
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    animation: {
      keyframes: {
        slideInUp: '{ from {transform: translateY(10px);opacity:0;} to {transform: translateY(0px);opacity:100;}}',
      },
      durations: {
        slideInUp: '0.8s',
      },
      timingFns: {
        slideInUp: 'ease',
      },
    },
  },

})
