import Layout from '@/layouts/Layout';
import Landing from '@/pages/landing/Landing';
import { Route, Routes } from 'react-router';
import Modal from './components/Modal';
import ChatConnectLoadingSheet from './components/ChatConnectLoadingSheet';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
        </Route>
      </Routes>
      <Modal />
      <ChatConnectLoadingSheet />
    </>
  );
}

export default App;
