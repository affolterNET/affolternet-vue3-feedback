import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname),
      '@components': resolve(__dirname, 'src/components'),
    },
  },
  plugins: [vue(), dts({})],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'affolternetVue3Feedback',
      // Drives EVERY filename in dist — and therefore the main/module/style/
      // exports/unpkg/jsdelivr entries in package.json. Changing it without
      // updating all of them silently breaks `import 'pkg/css'`.
      fileName: 'affolternet-vue3-feedback',
    },
    rollupOptions: {
      // vue stays external; everything else (incl. mitt) is bundled.
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
