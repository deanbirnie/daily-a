import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { PORT } from '../backend/app.config.js'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        secure: false,
      },
    },
  },
  plugins: [react()],
})
