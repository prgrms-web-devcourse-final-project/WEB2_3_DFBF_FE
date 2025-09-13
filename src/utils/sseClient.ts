import { EventSourcePolyfill } from 'event-source-polyfill';

let es: EventSource | null = null; // 하나만 유지
let savedToken: string | null = null; // 마지막에 쓴 토큰
const SSE_URL = `${import.meta.env.VITE_API_URL}/api/alert/connect`;

// 토큰으로 EventSource 가져오기
export function getSSE(token: string) {
  // 처음이면 생성
  if (!es) {
    savedToken = token;
    es = new EventSourcePolyfill(SSE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return es!;
  }

  // 토큰이 바뀌면: 끊고 새로 만들기(=재연결)
  if (savedToken !== token) {
    es.close();
    savedToken = token;
    es = new EventSourcePolyfill(SSE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  return es!;
}

// 로그아웃 등에서 끊을 때
export function closeSSE() {
  es?.close();
  es = null;
  savedToken = null;
}
