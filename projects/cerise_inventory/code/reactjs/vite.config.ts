import react from '@vitejs/plugin-react';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: path.resolve(__dirname, './src/components/'),
      public: path.resolve(__dirname, './public/'),
      pages: path.resolve(__dirname, './src/pages'),
      hooks: path.resolve(__dirname, './src/hooks'),
      assets: path.resolve(__dirname, './src/assets'),
      fonts: path.resolve(__dirname, './public/fonts')
    },
  },
});
