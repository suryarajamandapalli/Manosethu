import { defineConfig } from "@lovable.dev/vite-tanstack-config/dist/index.js";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: {
      port: 3000,
      host: true,
    },
  },
});
