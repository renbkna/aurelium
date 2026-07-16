import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    copyPublicDir: false,
    outDir: "dist",
    sourcemap: false,
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
          return undefined;
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
  },
});
