import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/cards': {
        target: 'https://api.pokemontcg.io/v2/cards',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cards/, ''),
        headers: {
          'X-Api-Key': '862ea40d-ee22-4d4b-9137-7905835d8970' // sua key local
        }
      }
    }
  }
})
