import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 🔁 Add your GitHub repo name here
const repoName = 'passwarden'

export default defineConfig({
  base: `/${repoName}/`,  // 👈 ensures paths work on GitHub Pages
  plugins: [react(), tailwindcss()],
})
