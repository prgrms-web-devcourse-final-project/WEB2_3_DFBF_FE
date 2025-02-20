import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerSW } from "virtual:pwa-register";
import "./styles/index.css";
import App from "./App.tsx";

// PWA 서비스 워커 등록
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("새로운 버전이 있습니다. 새로고침할까요?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("PWA가 오프라인에서도 사용할 준비가 되었습니다!");
  }
});

// 🔹 QueryClient 생성
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
