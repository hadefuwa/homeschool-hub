import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for Electron file:// protocol
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Monaco Editor into its own chunk (it's very large)
          'monaco-editor': ['@monaco-editor/react'],
          // Separate Phaser game engine into its own chunk
          'phaser': ['phaser'],
          // Separate React vendor libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit since we're splitting chunks
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true, // Fail if port 3000 is already in use
  },
});

