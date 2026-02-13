import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa/dist/index.cjs';
import UnoCSS from 'unocss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [UnoCSS({ configFile: './uno.config.ts' }), react(), VitePWA()],
});
