import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // VITE will automatically load .env variables prefixed with VITE_
  // Use import.meta.env.VITE_BACKEND_URL in your code
})
