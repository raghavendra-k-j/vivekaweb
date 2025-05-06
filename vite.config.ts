import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import createDsPlugin from "./plugins/ds/ds";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    createDsPlugin({
      sourceTokenFile: "./app/ui/ds/core/tokens.ts",
      cssOutputPath: "./app/ui/ds/core/_variables.css",
    }),
  ],
  resolve: {
    alias: {
    },
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  server: {
    hmr: true,
  },
  build: {
    minify: true,
    sourcemap: true,
  }
});
