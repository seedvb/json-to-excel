import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  build: {
    outDir: 'dist', // 默认输出目录，可不写
    rollupOptions: {
      output: {
        publicPath: './',
      },
    },
  },
})
