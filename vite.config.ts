import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // 서비스 워커 자동 업데이트
      devOptions: {
        enabled: true, // 개발 환경에서도 PWA 활성화
      },
      manifest: {
        name: "My PWA App",
        short_name: "PWA",
        description: "Vite + React + TypeScript PWA",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "./icons/apple-touch-icon-57x57.png",
            sizes: "57x57",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-60x60.png",
            sizes: "60x60",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-76x76.png",
            sizes: "76x76",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-114x114.png",
            sizes: "114x114",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "./icons/apple-touch-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  // path설정
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@apis": fileURLToPath(new URL("./src/apis", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@constants": fileURLToPath(new URL("./src/constants", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
      "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
    },
  },
});
