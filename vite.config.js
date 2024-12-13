import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio_v2/',
  plugins: [react()],
  server: {
    port: 5175,
    host: true,
    open: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
