export const loadYouTubeAPI = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
    } else {
      // 전역 함수 onYouTubeIframeAPIReady가 호출되면 resolve
      window.onYouTubeIframeAPIReady = () => {
        resolve();
      };
    }
  });
};
