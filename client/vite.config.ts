import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/*": path.resolve(__dirname, "src/*"),
      "@api": path.resolve(__dirname, "src/api"),
      "@views": path.resolve(__dirname, "src/views"),
      "@store": path.resolve(__dirname, "src/store"),
      "@router": path.resolve(__dirname, "src/router"),
      "@components": path.resolve(__dirname, "src/components"),
      "@atoms": path.resolve(__dirname, "src/components/atoms"),
      "@mole": path.resolve(__dirname, "src/components/molecules"),
      "@orga": path.resolve(__dirname, "src/components//organisms"),
      "@template": path.resolve(__dirname, "src/components//template"),
    },
  },
});
