import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' -> relative asset paths, so the build works on GitHub Pages
// (any subpath), locally, and when opened directly. HashRouter handles routes.
export default defineConfig({
  base: './',
  plugins: [react()],
})
