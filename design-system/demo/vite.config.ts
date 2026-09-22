import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: process.env.VITE_BASE_PATH || '/',
})
