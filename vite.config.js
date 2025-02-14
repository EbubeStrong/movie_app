import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
    proxy: {
      // Proxy the '/me' endpoint to bypass CORS
      "/me": {
        target: "https://ea06f524-93a0-4733-976b-709615840a5f.hanko.io",
        changeOrigin: true,
        secure: true, // Set to false if using a self-signed certificate
        rewrite: (path) => path.replace(/^\/me/, ""), // Optional: remove '/me' prefix
      },
    },
  },
});
