import { useEffect, useState } from 'react';

function useUserStatus(userId: string) {
  const [isChatting, setIsChatting] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const eventSource = new EventSource(
      `http://localhost:8080/api/userStatus/subscribe?userId=${userId}`,
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // 서버에서 오는 데이터가 JSON 형식이라면 파싱
        console.log('SSE 데이터 수신:', data);

        // 여기서 받은 데이터에 따라 상태 업데이트
        setIsChatting(data.isChatting); // 예제에서는 `isChatting`을 받는다고 가정
      } catch (error) {
        console.error('SSE 데이터 처리 중 오류:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE 연결 오류:', error);
      eventSource.close(); // 오류 발생 시 연결 종료
    };

    return () => {
      eventSource.close(); // 컴포넌트가 언마운트되면 연결 종료
    };
  }, [userId]);

  return { isChatting };
}

export default useUserStatus;
