import Layout from '@/layouts/Layout';
import Landing from '@/pages/landing/Landing';
import { Route, Routes } from 'react-router';
import Modal from './components/Modal';
import Home from '@/pages/home/Home';

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
    </>
  );
}

export default App;
