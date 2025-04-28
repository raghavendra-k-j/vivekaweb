import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import createDsPlugin from './plugins/ds/ds.js';


export default defineConfig({
  plugins: [
    tailwindcss(), 
    reactRouter(),
    tsconfigPaths(),
    createDsPlugin({
      sourceTokenFile: "app/ui/ds/core/tokens.ts",
      scssOutputPath: "app/ui/ds/core/_variables.scss"
    }),
  ],
  resolve: {
    alias: {
    },
  },
});
