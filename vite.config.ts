import path from 'node:path'
import dts from 'vite-plugin-dts'
import Icons from 'unplugin-icons/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: 'src',
      rollupTypes: true
    }),
    Icons()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'dayjs'],
      output: {
        globals: {
          vue: 'Vue',
          dayjs: 'dayjs'
        }
      }
    }

  }
})
