import { Route, Routes } from 'react-router';
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

import { useSheetStore } from './store/sheetStore';
import KaKaoRedirection from '@/components/KaKaoRedirection';
import { useSSE } from '@/hooks/useSSE';
import { useYotube } from '@/hooks/useYoutube';
import PublicRoute from '@/routes/PublicRoute';
import CardDetailModalTemp from '@/components/modalSheet/CardDetailModalTemp';
import MyPage from '@/pages/mypage/MyPage';
import UserPage from '@/pages/userpage/UserPage';

function App() {
  const { isRequestSendingSheetOpen, isRequestReceivingSheetOpen } = useSheetStore();

  useSSE(); // SSE연결
  useYotube();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PublicRoute />}>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* PrivateRoute 적용 */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />}>
              <Route path=":id" element={<CardDetailModalTemp />} />
            </Route>
            <Route path="/chat" element={<Chat />} />
            <Route path="/post" element={<Post />} />
            <Route path="/post/:postId/edit" element={<Post />} />
            <Route path="/chatroom/:chatRoomId" element={<ChatRoom />} />
            <Route path="/mypage" element={<MyPage />}>
              <Route path=":id" element={<CardDetailModalTemp />} />
            </Route>
            <Route path="/mypage/edit" element={<EditProfile />} />
            <Route path="/mypage/blocklist" element={<BlockList />} />
            <Route path="/user/:userId" element={<UserPage />}>
              <Route path=":id" element={<CardDetailModalTemp />} />
            </Route>
          </Route>

          <Route path="/auth/login/kakao/callback" element={<KaKaoRedirection />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
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
