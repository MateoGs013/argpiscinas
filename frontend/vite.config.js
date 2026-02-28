import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const devProxyTarget = (process.env.VITE_DEV_PROXY_TARGET || process.env.VITE_API_URL || 'http://localhost:3001')
  .replace(/\/api\/?$/, '')

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: devProxyTarget,
        changeOrigin: true
      },
      '/uploads': {
        target: devProxyTarget,
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap'],
          'vendor': ['vue', 'vue-router', 'pinia', 'axios']
        }
      }
    }
  }
})
