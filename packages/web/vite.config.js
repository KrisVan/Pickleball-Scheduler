import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
  },
  preview: {
    host: true,
    port: 5173,
    strictPort: true,
    origin: process.env.VITE_ORIGIN_URL,
    proxy: {
      '/api': {
        target: process.env.VITE_API_HOST_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    origin: process.env.VITE_ORIGIN_URL,
    proxy: {
      '/api': {
        target: process.env.VITE_API_HOST_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
