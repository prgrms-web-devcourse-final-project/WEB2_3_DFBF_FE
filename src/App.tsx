import Layout from '@/layouts/Layout';
import Landing from '@/pages/landing/Landing';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
