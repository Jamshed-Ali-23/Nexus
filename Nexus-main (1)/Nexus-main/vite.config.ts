import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs-extra';

// https://vitejs.dev/config/
// Custom plugin to copy styles directory to build output
const copyStylesPlugin = () => {
  return {
    name: 'copy-styles-plugin',
    closeBundle: async () => {
      const srcDir = resolve(__dirname, 'src/styles');
      const destDir = resolve(__dirname, 'dist/styles');
      await fs.copy(srcDir, destDir);
      console.log('✅ Styles directory copied to build output');
    }
  };
};

export default defineConfig({
  plugins: [react(), copyStylesPlugin()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['@heroicons/react', 'lucide-react'],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});
