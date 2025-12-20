import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This ensures Vite looks in the correct node_modules
      'ethers': path.resolve(__dirname, 'node_modules/ethers'),
    },
  },
})