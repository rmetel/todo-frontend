/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    },
  },
  build: {
    outDir: "todo-app",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    target: "chrome62",
  },
  server: {
    port: 3000,
    open: true,
    https: {
      key: "cert.key",
      cert: "cert.crt",
    },
  },
  test: {
    globals: true,
    environment: "jsdom", // https://zenn.dev/builder_search/articles/14d8cc0dd2e606
    setupFiles: ["./setupTests.ts"]
  }
});
