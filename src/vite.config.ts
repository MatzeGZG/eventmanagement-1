import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-state': ['zustand'],
          'vendor-map': ['mapbox-gl', 'react-map-gl', '@turf/turf'],
          'vendor-ui': ['framer-motion'],
          'vendor-utils': ['date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand', 'mapbox-gl', 'react-map-gl', '@turf/turf', 'framer-motion', 'date-fns']
  }
});