import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "import",
          "color-functions",
          "global-builtin"
        ]
      }
    }
  },

  test: {
    environment: "jsdom",
    globals: true
  }
});
