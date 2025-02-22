import Layout from '@/layouts/Layout';
import Landing from '@/pages/landing/Landing';
import { Navigate, Route, Routes } from 'react-router';
import Modal from './components/Modal';
import Home from '@/pages/home/Home';
import ChatConnectLoadingSheet from './components/ChatConnectLoadingSheet';
import Chat from './pages/chat/Chat';
import ChatRoom from './pages/chat/ChatRoom';
import NotFound from './pages/NotFound';
import Login from '@/pages/Login';
import SignUp from '@/pages/signup/SignUp';
import Post from '@/pages/post/Post';
import UserProfile from '@/pages/userprofile.tsx/UserProfile';
import PrivateRoute from './routes/PrivateRoute';
import EditProfile from '@/pages/editprofile/EditProfile';
import { useEffect } from 'react';
import { loadYouTubeAPI } from './utils/youtubeApiLoader';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';

function App() {
  // 실제 로그인 여부를 체크하는 함수 (임시로 false, 실제 인증 로직 적용 필요)
  const isAuthenticated = true;
  // soundlink 로그인한 경우에만 spotify 로그인 후 토큰 가져오기
  if (isAuthenticated) {
    useSpotifyAuth();
  }

  useEffect(() => {
    loadYouTubeAPI(); // 앱이 처음 실행될 때 API 로드
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isAuthenticated ? <Navigate to="/home" replace /> : <Landing />} />
          {/* test용 */}
          {/* PrivateRoute 적용 */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/post" element={<Post />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<UserProfile />} />
            <Route path="/mypage/edit" element={<EditProfile />} />
            <Route path="/user/:userId" element={<UserProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Modal />
      <ChatConnectLoadingSheet />
    </>
  );
}

export default App;
