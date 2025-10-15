import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
      interval: 500,
    },
    proxy: {
      "/affirmation": {
        target: "http://localhost:3001", // Backend server URL
        changeOrigin: true,
        secure: false,
      },
      "/journal": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
