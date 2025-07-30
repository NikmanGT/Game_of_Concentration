import "./App.css";
import "./index.css";
import Homepage from "./Containers/Homepage/Homepage";
import MatchRoom from "./Containers/MatchRoom/MatchRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Containers/Landing/Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/matchRoom" element={<MatchRoom />} />
          <Route path="/Homepage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
