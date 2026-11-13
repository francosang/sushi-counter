/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Publicado en GitHub Pages como https://francosang.github.io/sushi-counter/
export default defineConfig({
  base: '/sushi-counter/',
  plugins: [react()],
  test: {
    include: ['src/**/*.test.ts'],
  },
})
