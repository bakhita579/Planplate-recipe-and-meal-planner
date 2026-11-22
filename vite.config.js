import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
    test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
    mockReset: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/main.jsx',
        'src/tests/**',
        'src/**/*.test.{js,jsx}',
        'src/services/firebase.js',
      ],
      reporter: ['text', 'html'],
    },
  },
})