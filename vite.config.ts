import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa/dist/index.cjs';
import UnoCSS from 'unocss/vite';

const manifestForPlugIn = {
  registerType: 'prompt' as const,
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Streaks',
    short_name: 'streaks',
    description: 'Daily habit tracker to build and maintain good habits',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/maskable_icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#0D59F2',
    background_color: '#101622',
    display: 'standalone' as const,
    scope: '/',
    start_url: '/',
    orientation: 'portrait' as const,
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({ configFile: './uno.config.ts' }),
    react(),
    VitePWA(manifestForPlugIn),
  ],
});
