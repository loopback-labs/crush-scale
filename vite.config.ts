import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync } from "node:fs";
import { componentTagger } from "lovable-tagger";

// GitHub project Pages URL is https://<user>.github.io/<repo>/ — base must match the repo name.
const repoBase = "/crush-scale/";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  base: command === "build" ? repoBase : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "github-pages-spa-fallback",
      apply: "build",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
