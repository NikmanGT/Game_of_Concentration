import "./App.css";
import "./index.css";
import Homepage from "./Containers/Homepage/Homepage";
import MatchRoom from "./Containers/MatchRoom/MatchRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/matchRoom" element={<MatchRoom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
