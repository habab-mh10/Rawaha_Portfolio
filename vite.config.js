import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',

  build: {
    // Raise the warning threshold — chunk-size warnings are cosmetic
    chunkSizeWarningLimit: 700,

    rollupOptions: {
      output: {
        // Split heavy third-party libraries into separate cacheable chunks.
        // Returning a string from the function groups the module into that chunk.
        manualChunks(id) {
          // React ecosystem
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/react-router/')) {
            return 'vendor-react';
          }

          // GSAP animation runtime
          if (id.includes('node_modules/gsap/')) {
            return 'vendor-gsap';
          }

          // MUI (icons + core) — largest single dependency
          if (id.includes('node_modules/@mui/')) {
            return 'vendor-mui';
          }

          // Swiper — only used on Testimonials section
          if (id.includes('node_modules/swiper/')) {
            return 'vendor-swiper';
          }

          // Icon libraries
          if (id.includes('node_modules/@fortawesome/') ||
              id.includes('node_modules/react-icons/')) {
            return 'vendor-icons';
          }

          // HTTP client
          if (id.includes('node_modules/axios/')) {
            return 'vendor-axios';
          }

          // Toast notifications
          if (id.includes('node_modules/react-toastify/')) {
            return 'vendor-toast';
          }
        },
      },
    },
  },

  // Modern target — smaller output, no legacy polyfills
  esbuild: {
    target: 'es2020',
  },
});
