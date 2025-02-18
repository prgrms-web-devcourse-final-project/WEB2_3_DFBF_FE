import LandingLayout from "@/layouts/LandingLayout";
import Home from "@/pages/home/Home";
import Landing from "@/pages/landing/Landing";
import { Route, Routes } from "react-router";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <Routes>
        {/* <Route index element={<Home />} /> */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
        </Route>
      </Routes>
      <Modal />
    </>
  );
}

export default App;
