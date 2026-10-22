
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Your website is served from the root domain: https://rawaha.me
  base: '/',

  build: {
    chunkSizeWarningLimit: 700,

    // Let Vite handle dependency chunking automatically.
    // This avoids the custom vendor-mui chunk for now.
  },

  esbuild: {
    target: 'es2020',
  },
});
