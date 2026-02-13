import { defineConfig } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      darkBlue: '#101622',
      primaryWhite: '#F1F5F9',
      secondaryWhite: '#94A3B8',
      cardBlue: '#1E293B',
      primaryBlue: '#0D59F2',
      hoverBlue: '#1E293B',
      borderBlue: '#334155',
      primaryGreen: '#10B981',
      white: '#FFFFFF',
      black: '#000000',
    } as Record<string, string>,
  },
  rules: [
    [/^text-(.*)$/, ([, c], { theme }) => ({ color: theme.colors[c] || c })],
    [
      /^bg-(.*)$/,
      ([, c], { theme }) => ({ 'background-color': theme.colors[c] || c }),
    ],
    [/^m-(.*)$/, ([, c]) => ({ margin: c })],
    [/^p-(.*)$/, ([, c]) => ({ padding: c })],
    [/^w-(.*)$/, ([, c]) => ({ width: c })],
    [/^h-(.*)$/, ([, c]) => ({ height: c })],
    [/^rounded-(.*)$/, ([, c]) => ({ 'border-radius': c })],
    [
      /^border-(.*)$/,
      ([, c], { theme }) => {
        const [color, width = '1px'] = c.split('-');
        return { 'border-color': theme.colors[color] || color, 'border-width': width };
      },
    ],
  ],
});
