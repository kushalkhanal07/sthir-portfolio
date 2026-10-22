import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split vendor code so the app shell stays small and caches well.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/motion') || id.includes('framer-motion')) return 'motion';
          if (id.includes('/gsap') || id.includes('/lenis')) return 'scroll';
          if (id.includes('/react') || id.includes('/scheduler')) return 'react';
          return 'vendor';
        },
      },
    },
  },
});
