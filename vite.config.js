import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/kuroshima-2026/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      // 開発サーバーでもService Workerを有効にし、オフライン動作をpreviewで確認できるようにする
      devOptions: { enabled: true, type: 'module' },
      manifest: {
        name: '黒島2026 運営アプリ',
        short_name: '黒島2026',
        description: '無人島イベント「黒島2026」当日運営用のスタッフ向けアプリ',
        theme_color: '#1B6B6B',
        background_color: '#F5EDD6',
        display: 'standalone',
        start_url: '.',
        icons: [
          { src: 'pwa-icon.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: 'pwa-icon.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
          { src: 'pwa-icon.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        // タイムテーブル等のJSONはJSにバンドルされるため、ビルド成果物一式を丸ごと事前キャッシュする
        globPatterns: ['**/*.{js,css,html,svg,ico}'],
      },
    }),
  ],
})
