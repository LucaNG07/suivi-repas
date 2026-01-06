import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Définit ngrokHost depuis l'environnement, sinon null
const ngrokHost = process.env.NGROK_HOST || null;

export default defineConfig({
  // base relative pour éviter les 404 sur GitHub Pages
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: ngrokHost ? { protocol: 'wss', host: ngrokHost, port: 443 } : true,
    fs: { strict: false },
    cors: true,
    allowedHosts: 'all'
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    cors: true
  }
})
