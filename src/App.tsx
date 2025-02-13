import Home from "@/pages/home/Home";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
