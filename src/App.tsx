import { useAuthStore } from '@/store/authStore';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import Layout from '@/layouts/Layout';
import Landing from '@/pages/landing/Landing';
import Modal from '@/components/Modal';
import Home from '@/pages/home/Home';
import ChatConnectLoadingSheet from '@/components/ChatConnectLoadingSheet/ChatConnectLoadingSheet';
import Chat from '@/pages/chat/Chat';
import ChatRoom from '@/pages/chat/ChatRoom';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import SignUp from '@/pages/signup/SignUp';
import Post from '@/pages/post/Post';
import UserProfile from '@/pages/userprofile/UserProfile';
import PrivateRoute from './routes/PrivateRoute';
import EditProfile from '@/pages/editprofile/EditProfile';
import BlockList from '@/pages/blocklist/BlockList';
import { useEffect, useRef } from 'react';
import { loadYouTubeAPI } from './utils/youtubeApiLoader';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import { useYouTubeStore } from './store/youtubeStore';
import YouTubeAudioPlayer from './components/YouTubeAudioPlayer';

// TODO: 테스트용 나중에 지우기
import TestLoginModal from '@/components/testLogin/TestLoginModal';

import { useSheetStore } from './store/sheetStore';
import AnimatedLayout from '@/layouts/AnimatedLayout';
import KaKaoRedirection from '@/components/KaKaoRedirection';
import { EventSourcePolyfill } from 'event-source-polyfill';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const { isAuthenticated, accessToken } = useAuthStore();
  const spotifyAuth = useSpotifyAuth();
  const {
    isRequestSendingSheetOpen,
    isRequestReceivingSheetOpen,
    openSheet,
    closeSheet,
    setRequesterInfo,
    setChatConnectFail,
  } = useSheetStore();
  // soundlink 로그인한 경우에만 spotify 로그인 후 토큰 가져오기
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Spotify Auth Initialized:', spotifyAuth);
    }
  }, [isAuthenticated]);

  const { setApiReady } = useYouTubeStore();

  useEffect(() => {
    loadYouTubeAPI().then(() => {
      setApiReady();
    }); // 앱이 처음 실행될 때 API 로드
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      console.log('토큰, 로그인 문제');
      return;
    }

    const connectSSE = () => {
      console.log('🔌 SSE: 연결 시도 중...');

      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      eventSourceRef.current = new EventSourcePolyfill(
        `http://43.203.98.65:8080/api/alert/connect`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const eventSource = eventSourceRef.current;

      eventSource.addEventListener('open', () => {
        console.log('✅ SSE: 연결 성공!');
      });

      eventSource.addEventListener('alarm', (event: any) => {
        console.log('📩 SSE: 채팅 요청 수신!', JSON.parse(event.data));
        const { data } = JSON.parse(event.data);
        setRequesterInfo(data.emotionRecordId, data.nickname);
        openSheet('isRequestReceivingSheetOpen');
      });

      eventSource.addEventListener('cancel', (event: any) => {
        console.log('🚨 SSE: 채팅 취소 수신!', JSON.parse(event.data));
        closeSheet('isRequestReceivingSheetOpen');
      });

      eventSource.addEventListener('fail', (event: any) => {
        console.log('⛔ SSE: 채팅 거절 수신!', JSON.parse(event.data));
        setChatConnectFail(true);
      });

      eventSource.addEventListener('accept', (event: any) => {
        console.log('✅ SSE: 채팅방으로 이동!', JSON.parse(event.data));
        // const { chatRoomId } = JSON.parse(event.data);
        // closeSheet('isRequestSendingSheetOpen');
        // navigate(`/chatroom/${chatRoomId}`);
      });

      eventSource.addEventListener('error', (event) => {
        console.error('❌ SSE: 오류 발생!', event);
        eventSource.close();
      });
    };

    connectSSE();

    // 5초마다 연결 상태 확인
    const interval = setInterval(() => {
      if (eventSourceRef.current?.readyState === 2) {
        console.warn('⚠️ SSE: 연결이 끊어졌습니다. 다시 연결 시도...');
        eventSourceRef.current?.close();
        setTimeout(connectSSE, 1000);
      } else {
        console.log('🟢 SSE: 연결 정상 유지 중...');
      }
    }, 5000);

    // visibilitychange 이벤트로 화면이 보이면 다시 연결
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👀 화면이 다시 보입니다. SSE 재연결 시도...');
        connectSSE();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      console.log('🔴 SSE: 연결 해제');
      eventSourceRef.current?.close();
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, accessToken]);

  return (
    <>
      {/* 테스트용 나중에 지우기 */}
      <TestLoginModal />
      <AnimatedLayout>
        <Routes location={location}>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={isAuthenticated ? <Navigate to="/home" replace /> : <Landing />}
            />

            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/home" replace /> : <SignUp />}
            />

            {/* PrivateRoute 적용 */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/post" element={<Post />} />
              <Route path="/post/:postId/edit" element={<Post />} />
              <Route path="/chatroom/:chatRoomId" element={<ChatRoom />} />
              <Route path="/mypage" element={<UserProfile isMyPage={true} />} />
              <Route path="/mypage/edit" element={<EditProfile />} />
              <Route path="/mypage/blocklist" element={<BlockList />} />
              <Route path="/user/:userId" element={<UserProfile isMyPage={false} />} />
            </Route>

            <Route path="/auth/login/kakao/callback" element={<KaKaoRedirection />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatedLayout>
      <Modal />
      {isRequestSendingSheetOpen && <ChatConnectLoadingSheet type="sending" />}
      {isRequestReceivingSheetOpen && <ChatConnectLoadingSheet type="receiving" />}
      <YouTubeAudioPlayer playerId="1" />
      <YouTubeAudioPlayer playerId="2" />
      <YouTubeAudioPlayer playerId="3" />
    </>
  );
}

export default App;
