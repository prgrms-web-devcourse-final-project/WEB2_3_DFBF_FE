import LandingLayout from '@/layouts/LandingLayout';
import Landing from '@/pages/landing/Landing';
import { Route, Routes } from 'react-router';
import Modal from './components/Modal';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
        </Route>
      </Routes>
      <Modal />
    </>
  );
}

export default App;
