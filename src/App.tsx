import Layout from '@/layouts/Layout';
import Landing from '@/pages/landing/Landing';
import { Route, Routes } from 'react-router';
import Modal from './components/Modal';
import Home from '@/pages/home/Home';
import ChatConnectLoadingSheet from './components/ChatConnectLoadingSheet';
import Chat from './pages/chat/Chat';
import ChatRoom from './pages/chat/ChatRoom';
import NotFound from './pages/NotFound';



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          {/* test용 */}
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Modal />
      <ChatConnectLoadingSheet />
    </>
  );
}

export default App;