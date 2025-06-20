import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // 配置代理，将/api开头的请求转发到后端服务器
      '/api': {
        // 目标服务器地址
        target: 'http://localhost:8080',
        // 允许跨域
        changeOrigin: true,
        // 重写路径，去掉/api前缀
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
