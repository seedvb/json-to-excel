import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // 默认输出目录，可不写
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|webp/i.test(extType)) {
            extType = 'img';
          }
          return `system/assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'system/js/[name]-[hash].js',
        entryFileNames: 'system/js/[name]-[hash].js',
        publicPath: './',
      },
    },
  },
})
