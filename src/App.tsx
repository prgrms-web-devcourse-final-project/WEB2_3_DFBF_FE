import { useAuthStore } from '@/store/authStore';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import Layout from '@/layouts/Layout';
import Landing from '@/pages/landing/Landing';
import Modal from '@/components/Modal';
import Home from '@/pages/home/Home';
import ChatConnectLoadingSheet from '@/components/ChatConnectLoadingSheet';
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
import { useEffect } from 'react';
import { loadYouTubeAPI } from './utils/youtubeApiLoader';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import { useYouTubeStore } from './store/youtubeStore';
import YouTubeAudioPlayer from './components/YouTubeAudioPlayer';

// TODO: 테스트용 나중에 지우기
import TestLoginModal from '@/components/testLogin/TestLoginModal';

import { useSheetStore } from './store/sheetStore';
import AnimatedLayout from '@/layouts/AnimatedLayout';

function App() {
  const location = useLocation();

  const { isAuthenticated } = useAuthStore();
  const spotifyAuth = useSpotifyAuth();
  const { isChatLoadingSheetOpen } = useSheetStore();
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatedLayout>
      <Modal />
      {isChatLoadingSheetOpen && <ChatConnectLoadingSheet />}
      <YouTubeAudioPlayer playerId="1" />
      <YouTubeAudioPlayer playerId="2" />
      <YouTubeAudioPlayer playerId="3" />
    </>
  );
}

export default App;
