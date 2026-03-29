import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    sourcemap: true,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/framer-motion")
          ) {
            return "vendor";
          }
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
  },
});
