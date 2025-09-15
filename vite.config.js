// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/QR-code-generator/', // must match repo name (case sensitive)
  plugins: [react()],
})
