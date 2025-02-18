import LandingLayout from '@/layouts/LandingLayout';
import Landing from '@/pages/landing/Landing';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
          <Route path="mypage" element={<h1>마이페이지</h1>} />
          <Route path="chat" element={<h1>채팅페이지</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
