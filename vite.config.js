import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ngrokHost = process.env.NGROK_HOST // ex: 'abc-123.ngrok.io'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: ngrokHost ? { protocol: 'wss', host: ngrokHost, port: 443 } : true,
    fs: { strict: false },
    cors: true,
    // allow ngrok host when provided via NGROK_HOST env
    allowedHosts: ngrokHost ? ['localhost', ngrokHost] : 'all'
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    cors: true
  }
})
