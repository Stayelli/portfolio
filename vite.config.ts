import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',          // since you’re serving at the root domain
  plugins: [react()],
})
