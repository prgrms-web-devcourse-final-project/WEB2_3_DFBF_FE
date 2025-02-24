declare global {
  interface Window {
    YT: any; // 더 구체적인 타입 정의가 필요하면 @types/youtube 또는 직접 정의하세요.
    onYouTubeIframeAPIReady: () => void;
  }
}
export {};
