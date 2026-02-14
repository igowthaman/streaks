import presetWebFonts from '@unocss/preset-web-fonts';
import presetWind3 from '@unocss/preset-wind3';
import presetIcons from '@unocss/preset-icons/browser';
import { defineConfig } from 'unocss';
import { IconifyJSON } from '@iconify-json/material-symbols';

export default defineConfig({
  theme: {
    colors: {
      darkBlue: '#101622',
      primaryWhite: '#F1F5F9',
      secondaryWhite: '#94A3B8',
      cardBlue: '#1e293b7e',
      primaryBlue: '#0D59F2',
      primaryOrange: '#F97316',
      hoverBlue: '#1E293B',
      borderBlue: '#334155',
      navBlue: '#0F172A',
      primaryGreen: '#10B981',
      white: '#FFFFFF',
      black: '#000000',
    } as Record<string, string>,
  },
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] };
      },
    ],
    [
      /^bg-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { 'background-color': theme.colors[c] };
      },
    ],
    [
      /^border-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { 'border-color': theme.colors[c] };
      },
    ],
  ],
  presets: [
    presetWind3(),
    presetWebFonts({
      fonts: {
        sans: 'Quicksand',
      },
    }),
    presetIcons({
        collections: {
            'material-symbols': () => import('@iconify-json/material-symbols/icons.json').then(i => i.default as IconifyJSON),
        }
    }),
  ],
});
