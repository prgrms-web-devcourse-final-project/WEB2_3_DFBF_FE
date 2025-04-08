import { Route, Routes, useLocation } from 'react-router';
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
import PrivateRoute from './routes/PrivateRoute';
import EditProfile from '@/pages/editprofile/EditProfile';
import BlockList from '@/pages/blocklist/BlockList';
import YouTubeAudioPlayer from './components/YouTubeAudioPlayer';

// TODO: 테스트용 나중에 지우기
// import TestLoginModal from '@/components/testLogin/TestLoginModal';

import { useSheetStore } from './store/sheetStore';
import AnimatedLayout from '@/layouts/AnimatedLayout';
import KaKaoRedirection from '@/components/KaKaoRedirection';
import { useSSE } from '@/hooks/useSSE';
import { useYotube } from '@/hooks/useYoutube';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';
import { useTokenExpired } from '@/hooks/useTokenRefresh';
import UserProfile from '@/pages/user/UserProfile';
import PublicRoute from '@/routes/PublicRoute';

function App() {
  const location = useLocation();

  const { isRequestSendingSheetOpen, isRequestReceivingSheetOpen } = useSheetStore();

  useSpotifyAuth();

  useSSE(); // SSE연결
  useTokenExpired(); // 토큰 만료 체크
  useYotube();

  return (
    <>
      {/* 테스트용 나중에 지우기 */}
      {/* <TestLoginModal /> */}
      <AnimatedLayout>
        <Routes location={location}>
          <Route path="/" element={<Layout />}>
            <Route element={<PublicRoute />}>
              <Route index element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

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
              <Route path="/user/:userId" element={<UserProfile />} />
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
