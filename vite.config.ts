/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Publicado en GitHub Pages como https://francosang.github.io/sushi-counter/
export default defineConfig({
  base: '/sushi-counter/',
  plugins: [
    react(),
    // PWA: el service worker precachea la app (el Catálogo va dentro del bundle JS)
    // y se actualiza solo en cada deploy para no quedar trabado en la versión vieja.
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['favicon.svg', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'Sushi Counter',
        short_name: 'Sushi',
        description: 'Contá los platos y las piezas que comés en el sushi libre.',
        lang: 'es',
        start_url: '/sushi-counter/',
        scope: '/sushi-counter/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#111111',
        theme_color: '#111111',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}'],
        navigateFallback: '/sushi-counter/index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
  test: {
    include: ['src/**/*.test.ts'],
  },
})
