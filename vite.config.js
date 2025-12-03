// vite.config.js (Correto)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v2': { // Corrigi o path para /v2, pois a API usa este prefixo.
        target: 'https://api.pokemontcg.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v2/, '/v2'), // Reescrita simples, mas a URL do fetch já usa '/v2/cards'
      },
    },
  },
});