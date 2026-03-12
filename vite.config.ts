/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment:'jsdom',
    setupFiles: './src/tests/setup.ts'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
