import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import UnoCSS from 'unocss/vite';

const manifestForPlugIn = {
  registerType: 'prompt' as const,
  includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
  manifest: {
    name: 'Streaks',
    short_name: 'streaks',
    description: 'Daily habit tracker to build and maintain good habits',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    theme_color: '#0D59F2',
    background_color: '#101622',
    display: 'standalone' as const,
    scope: '/',
    start_url: '/',
    orientation: 'portrait' as const,
  },
  workbox: {
    // defining cached files formats
    globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
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
