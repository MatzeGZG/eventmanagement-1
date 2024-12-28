import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-state': ['zustand'],
          'vendor-map': ['mapbox-gl', 'react-map-gl', '@turf/turf'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
          'vendor-utils': ['date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    sourcemap: true,
    minify: 'terser',
    cssMinify: true,
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand', 'mapbox-gl', 'react-map-gl', '@turf/turf', 'framer-motion', 'date-fns']
  }
});