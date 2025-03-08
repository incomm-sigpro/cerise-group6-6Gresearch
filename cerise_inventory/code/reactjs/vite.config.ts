import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: `${path.resolve(__dirname, './src/components/')}`,
      public: `${path.resolve(__dirname, './public/')}`,
      pages: `${path.resolve(__dirname, './src/pages')}`,
      hooks: path.resolve(__dirname, './src/hooks'),
      assets: path.resolve(__dirname, './src/assets'),
      fonts: `${path.resolve(__dirname, './public/fonts')}`
    },
  },
});
