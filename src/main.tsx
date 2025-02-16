import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

// PWA 서비스 워커 등록
import { registerSW } from "virtual:pwa-register";

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

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
