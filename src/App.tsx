import Layout from '@/layouts/Layout';
import Landing from '@/pages/landing/Landing';
import { Route, Routes } from 'react-router';
import Modal from './components/Modal';
import Home from '@/pages/home/Home';
import ChatConnectLoadingSheet from './components/ChatConnectLoadingSheet';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          {/* test용 */}
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
      <Modal />
      <ChatConnectLoadingSheet />
    </>
  );
}

export default App;
