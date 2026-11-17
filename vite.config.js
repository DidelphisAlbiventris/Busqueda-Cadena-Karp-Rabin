import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages project sites are served below /<repository-name>/.
  // Keep / for local development and allow the workflow to inject the repo path.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
})
